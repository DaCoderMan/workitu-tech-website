import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const PROJECTS_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'projects.json');

function withLatestThumbnailVersion(project) {
  if (!project?.image || typeof project.image !== 'string') {
    return project;
  }

  const isLocalProjectThumbnail = project.image.startsWith('/images/projects/');
  if (!isLocalProjectThumbnail || !project.lastUpdated) {
    return project;
  }

  const separator = project.image.includes('?') ? '&' : '?';
  return {
    ...project,
    image: `${project.image}${separator}v=${encodeURIComponent(project.lastUpdated)}`,
  };
}

// Public endpoint to fetch projects (no auth required)
export async function GET() {
  try {
    const raw = await fs.readFile(PROJECTS_FILE_PATH, 'utf8');
    const projectsData = JSON.parse(raw);
    const normalized = Array.isArray(projectsData)
      ? projectsData.map(withLatestThumbnailVersion)
      : [];

    return NextResponse.json(normalized, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
