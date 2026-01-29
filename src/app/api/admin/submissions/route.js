import { NextResponse } from 'next/server';
import { requireAuth } from '../../../../utils/auth';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json');

function getSubmissions() {
  try {
    const data = fs.readFileSync(SUBMISSIONS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function getHandler(request) {
  try {
    const submissions = getSubmissions();
    return NextResponse.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const GET = requireAuth(getHandler);
