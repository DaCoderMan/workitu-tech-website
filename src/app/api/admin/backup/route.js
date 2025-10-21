import { NextResponse } from 'next/server';
import { requireAuth } from '../../../../utils/auth';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');

async function handler(request) {
  try {
    const backup = {
      timestamp: new Date().toISOString(),
      projects: [],
      content: {},
      analytics: {},
      submissions: []
    };
    
    // Read all data files
    const files = ['projects.json', 'content.json', 'analytics.json', 'submissions.json'];
    
    for (const file of files) {
      const filePath = path.join(DATA_DIR, file);
      try {
        const data = fs.readFileSync(filePath, 'utf8');
        const key = file.replace('.json', '');
        backup[key] = JSON.parse(data);
      } catch (error) {
        console.error(`Error reading ${file}:`, error);
        backup[file.replace('.json', '')] = file === 'projects.json' ? [] : {};
      }
    }
    
    const backupJson = JSON.stringify(backup, null, 2);
    
    return new NextResponse(backupJson, {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="workitu-backup-${new Date().toISOString().split('T')[0]}.json"`
      }
    });
  } catch (error) {
    console.error('Backup error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const GET = requireAuth(handler);
