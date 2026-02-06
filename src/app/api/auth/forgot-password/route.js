import { NextResponse } from 'next/server';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { rateLimit } from '../../../../utils/rateLimit';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const RESET_TOKENS_FILE = path.join(DATA_DIR, 'reset-tokens.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export async function POST(request) {
  try {
    // Rate limiting
    const clientIP = request.headers.get('x-forwarded-for') ||
                     request.headers.get('x-real-ip') ||
                     'unknown';
    const rateLimitResult = rateLimit(`forgot-password:${clientIP}`);

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const { email } = await request.json();

    // Verify this is the admin email
    if (email !== process.env.ADMIN_EMAIL) {
      // Don't reveal if the email exists or not
      return NextResponse.json(
        { message: 'If an account exists with this email, you will receive a password reset link.' },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    // Save reset token
    const resetData = {
      email,
      token: resetToken,
      expiry: resetTokenExpiry,
      createdAt: new Date().toISOString()
    };

    fs.writeFileSync(RESET_TOKENS_FILE, JSON.stringify([resetData], null, 2));

    // Send reset email
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransporter({
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: parseInt(process.env.SMTP_PORT) || 587,
          secure: false,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });

        const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/admin/reset-password?token=${resetToken}`;

        const mailOptions = {
          from: process.env.SMTP_USER,
          to: email,
          subject: 'Password Reset Request - Workitu Tech Admin',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #f59e0b;">Password Reset Request</h2>
              <p>You requested a password reset for your Workitu Tech admin account.</p>
              <p>Click the button below to reset your password:</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" style="background-color: #f59e0b; color: #000; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                  Reset Password
                </a>
              </div>
              <p>Or copy and paste this link into your browser:</p>
              <p style="background-color: #f5f5f5; padding: 10px; word-break: break-all;">
                ${resetUrl}
              </p>
              <p><strong>This link will expire in 1 hour.</strong></p>
              <p>If you didn't request this, please ignore this email and your password will remain unchanged.</p>
              <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;">
              <p style="font-size: 12px; color: #666;">
                Workitu Tech - Admin Panel<br>
                <a href="https://workitu.tech" style="color: #f59e0b;">workitu.tech</a>
              </p>
            </div>
          `
        };

        await transporter.sendMail(mailOptions);
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        return NextResponse.json(
          { message: 'Failed to send reset email. Please try again later.' },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { message: 'Email service not configured' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'If an account exists with this email, you will receive a password reset link.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
