import { NextResponse } from 'next/server';
import { requireAuth } from '../../../../utils/auth';
import { validateContent, sanitizeInput } from '../../../../utils/validation';
import { getContent as fetchContent, saveContent as persistContent } from '../../../../lib/firestore-data';

async function getHandler(request) {
  try {
    const content = await fetchContent();
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
    
    const content = await fetchContent();

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
    await persistContent(content);
    
    return NextResponse.json(content[page]);
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const GET = getHandler;
export const PUT = putHandler;
