import { NextResponse } from 'next/server';
import { validateContactForm, sanitizeInput } from '../../../utils/validation';
import { rateLimit } from '../../../utils/rateLimit';
import { notifyContactFormSubmission } from '../../../utils/telegram';
import { captureException } from '../../../utils/sentry';
import { saveSubmission } from '../../../lib/firestore-data';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    // Rate limiting
    const clientIP = request.headers.get('x-forwarded-for') ||
                     request.headers.get('x-real-ip') ||
                     'unknown';
    const rateLimitResult = rateLimit(`contact:${clientIP}`);

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const formData = await request.json();
    
    // Sanitize input
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      message: sanitizeInput(formData.message)
    };
    
    // Validate form
    const validation = validateContactForm(sanitizedData);
    if (!validation.isValid) {
      // Return detailed validation errors so the client can display them
      return NextResponse.json(
        { message: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }
    
    // Save to Firestore
    const submission = {
      id: Date.now().toString(),
      ...sanitizedData,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    };

    try {
      await saveSubmission(submission);
    } catch (dbError) {
      console.error('Failed to save submission:', dbError);
      // Continue — don't fail the request if DB write fails
    }
    
    // Send Telegram notification (if configured)
    try {
      await notifyContactFormSubmission(sanitizedData);
    } catch (telegramError) {
      console.error('Telegram notification failed:', telegramError);
      captureException(telegramError, { context: 'telegram_notification' });
      // Don't fail the request if Telegram fails
    }

    // Send email notification and auto-responder (if configured)
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: parseInt(process.env.SMTP_PORT) || 587,
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });

        // Send notification email to admin
        const adminMailOptions = {
          from: process.env.SMTP_USER,
          to: 'contact@workitu.com',
          subject: `New Contact Form Submission from ${sanitizedData.name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${sanitizedData.name}</p>
            <p><strong>Email:</strong> ${sanitizedData.email}</p>
            <p><strong>Message:</strong></p>
            <p>${sanitizedData.message.replace(/\n/g, '<br>')}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          `
        };

        await transporter.sendMail(adminMailOptions);

        // Send auto-responder email to user (if enabled)
        if (process.env.AUTO_RESPONDER_ENABLED === 'true') {
          const autoResponderOptions = {
            from: process.env.AUTO_RESPONDER_FROM || process.env.SMTP_USER,
            to: sanitizedData.email,
            subject: process.env.AUTO_RESPONDER_SUBJECT || 'Thank you for contacting Workitu Tech!',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #f59e0b;">Thank you for reaching out!</h2>
                <p>Hi ${sanitizedData.name},</p>
                <p>We've received your message and appreciate you taking the time to contact us.</p>
                <p>Our team at Workitu Tech typically responds within 24 hours. We'll review your inquiry and get back to you as soon as possible.</p>
                <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0;">
                  <p style="margin: 0;"><strong>Your Message:</strong></p>
                  <p style="margin: 10px 0 0 0;">${sanitizedData.message.replace(/\n/g, '<br>')}</p>
                </div>
                <p>If you have any urgent questions, feel free to reply directly to this email.</p>
                <p>Best regards,<br>
                <strong>The Workitu Tech Team</strong></p>
                <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;">
                <p style="font-size: 12px; color: #666;">
                  Workitu Tech - Where Imagination Meets Innovation<br>
                  <a href="https://workitu.tech" style="color: #f59e0b;">workitu.tech</a>
                </p>
              </div>
            `
          };

          await transporter.sendMail(autoResponderOptions);
        }
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        captureException(emailError, { context: 'email_notification' });
        // Don't fail the request if email fails
      }
    }
    
    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    captureException(error, { context: 'contact_form_submission' });
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
