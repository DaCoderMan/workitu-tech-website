import { NextResponse } from 'next/server';
import projectsData from '../../../data/projects.json';

// Public endpoint to fetch projects (no auth required)
export async function GET() {
  try {
    return NextResponse.json(projectsData);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
