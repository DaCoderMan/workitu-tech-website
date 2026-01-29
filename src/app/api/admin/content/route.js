import { NextResponse } from 'next/server';
import { requireAuth } from '../../../../utils/auth';
import { validateContent, sanitizeInput } from '../../../../utils/validation';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const CONTENT_FILE = path.join(DATA_DIR, 'content.json');

function getContent() {
  try {
    const data = fs.readFileSync(CONTENT_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return {
      home: {
        title: 'Workitu Tech – Where Imagination Meets Innovation',
        subtitle: 'Workitu Tech creates digital experiences that inspire and perform.',
        description: 'We craft sophisticated websites, AI-powered apps, and e-commerce platforms that help your ideas shine online.',
        mission: '✨ Gen AI works for you and I — turning creativity into code, and vision into reality. Our mission is simple: deliver world-class technology at a fair price, built with care, passion, and precision.',
        services: 'From sleek web design to smart automation, from marketing strategy to digital growth — Workitu Tech is your partner in building the future.',
        tagline: 'Because the web isn\'t just where you exist — 🌍 It\'s where your story begins.'
      },
      pricing: {
        title: '💰 Fair Prices. Real Value. Infinite Possibilities.',
        subtitle: 'At Workitu Tech, we believe great technology should be accessible to everyone.',
        description: 'We offer transparent, flexible pricing — built around your goals, not just your budget. Every project is crafted with precision, creativity, and heart — because your success is our code.',
        services: [],
        promise: '💡 Our promise: fair pricing, honest communication, and results that last.'
      },
      contact: {
        title: 'Let\'s Build Something Amazing Together',
        subtitle: 'Ready to turn your vision into reality?',
        description: 'Get in touch with us to discuss your project, ask questions, or just say hello. We\'re here to help you succeed.',
        email: 'contact@workitu.com',
        linkedin: 'https://www.linkedin.com/in/jonsamper'
      }
    };
  }
}

function saveContent(content) {
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2));
}

async function getHandler(request) {
  try {
    const content = getContent();
    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function putHandler(request) {
  try {
    const { page, data } = await request.json();
    
    if (!page || !data) {
      return NextResponse.json(
        { message: 'Page and data are required' },
        { status: 400 }
      );
    }
    
    const content = getContent();
    
    // Sanitize the data
    const sanitizedData = {};
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        sanitizedData[key] = sanitizeInput(value);
      } else if (Array.isArray(value)) {
        sanitizedData[key] = value.map(item => {
          if (typeof item === 'object' && item !== null) {
            const sanitizedItem = {};
            for (const [itemKey, itemValue] of Object.entries(item)) {
              sanitizedItem[itemKey] = typeof itemValue === 'string' ? sanitizeInput(itemValue) : itemValue;
            }
            return sanitizedItem;
          }
          return item;
        });
      } else {
        sanitizedData[key] = value;
      }
    }
    
    // Validate content if it has required fields
    if (sanitizedData.title || sanitizedData.description) {
      const validation = validateContent(sanitizedData);
      if (!validation.isValid) {
        return NextResponse.json(
          { message: 'Validation failed', errors: validation.errors },
          { status: 400 }
        );
      }
    }
    
    content[page] = { ...content[page], ...sanitizedData };
    saveContent(content);
    
    return NextResponse.json(content[page]);
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Public GET for site content; mutations require authentication
export const GET = getHandler;
export const PUT = requireAuth(putHandler);
