import { NextResponse } from 'next/server';

/**
 * Upload handler compatible with Vercel's read-only filesystem.
 * Converts uploaded images to base64 data URLs.
 * For production, consider using an external storage service
 * (e.g., Firebase Storage, Cloudinary, S3) instead of base64.
 */
async function handler(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { message: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { message: 'Invalid file type. Only images are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { message: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // Convert to base64 data URL (works on serverless — no filesystem needed)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    const dataUrl = `data:${file.type};base64,${base64}`;

    return NextResponse.json({
      message: 'File uploaded successfully',
      url: dataUrl,
      filename: file.name
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const POST = handler;
