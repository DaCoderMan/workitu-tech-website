import { NextResponse } from 'next/server';
import { validateContactForm, sanitizeInput } from '../../../utils/validation';
import { rateLimit } from '../../../utils/rateLimit';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json');

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
      return NextResponse.json(
        { message: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }
    
    // Save to submissions file
    const submission = {
      id: Date.now().toString(),
      ...sanitizedData,
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    };
    
    let submissions = [];
    try {
      const data = fs.readFileSync(SUBMISSIONS_FILE, 'utf8');
      submissions = JSON.parse(data);
    } catch (error) {
      // File doesn't exist, start with empty array
    }
    
    submissions.push(submission);
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
    
    // Send email (if configured)
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
        
        const mailOptions = {
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
        
        await transporter.sendMail(mailOptions);
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the request if email fails
      }
    }
    
    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
