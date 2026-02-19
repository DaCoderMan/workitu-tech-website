import { NextResponse } from 'next/server';
import { requireAuth } from '../../../../utils/auth';
import { getSubmissions } from '../../../../lib/firestore-data';

export const dynamic = 'force-dynamic';

async function getHandler(request) {
  try {
    const submissions = await getSubmissions();
    return NextResponse.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const GET = getHandler;
