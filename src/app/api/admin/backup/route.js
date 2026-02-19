import { NextResponse } from 'next/server';
import { requireAuth } from '../../../../utils/auth';
import { getProjects, getContent, getAnalytics, getSubmissions } from '../../../../lib/firestore-data';

export const dynamic = 'force-dynamic';

async function handler(request) {
  try {
    const [projects, content, analytics, submissions] = await Promise.all([
      getProjects(),
      getContent(),
      getAnalytics(),
      getSubmissions(),
    ]);

    const backup = {
      timestamp: new Date().toISOString(),
      projects,
      content,
      analytics,
      submissions,
    };

    const backupJson = JSON.stringify(backup, null, 2);

    return new NextResponse(backupJson, {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="workitu-backup-${new Date().toISOString().split('T')[0]}.json"`,
      },
    });
  } catch (error) {
    console.error('Backup error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const GET = handler;
