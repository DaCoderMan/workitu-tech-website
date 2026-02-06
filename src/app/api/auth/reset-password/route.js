import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const RESET_TOKENS_FILE = path.join(DATA_DIR, 'reset-tokens.json');

export async function POST(request) {
  try {
    const { token, newPassword } = await request.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { message: 'Token and new password are required' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (newPassword.length < 8) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Check if reset tokens file exists
    if (!fs.existsSync(RESET_TOKENS_FILE)) {
      return NextResponse.json(
        { message: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    // Read and validate token
    const resetTokens = JSON.parse(fs.readFileSync(RESET_TOKENS_FILE, 'utf8'));
    const resetData = resetTokens.find(t => t.token === token);

    if (!resetData) {
      return NextResponse.json(
        { message: 'Invalid or expired reset token' },
        { status: 400 }
      );
    }

    // Check if token is expired
    if (Date.now() > resetData.expiry) {
      return NextResponse.json(
        { message: 'Reset token has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // In a real application, you would update the user's password in the database
    // For this implementation, we'll return the hashed password for manual update
    console.log('\n========================================');
    console.log('PASSWORD RESET SUCCESSFUL');
    console.log('========================================');
    console.log('Email:', resetData.email);
    console.log('New Password Hash:', hashedPassword);
    console.log('\nPlease update your .env.local file with:');
    console.log(`ADMIN_PASSWORD_HASH=${hashedPassword}`);
    console.log('========================================\n');

    // Delete the used token
    fs.writeFileSync(RESET_TOKENS_FILE, JSON.stringify([], null, 2));

    return NextResponse.json(
      {
        message: 'Password reset successful. Please contact the system administrator to complete the process.',
        passwordHash: hashedPassword
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
