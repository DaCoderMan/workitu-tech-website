import { NextResponse } from 'next/server';
import { requireAuth } from '../../../../utils/auth';
import { getAnalyticsSummary } from '../../../../utils/analytics';
import Papa from 'papaparse';

export const dynamic = 'force-dynamic';

async function handler(request) {
  try {
    const analytics = await getAnalyticsSummary();
    
    // Convert analytics to CSV format
    const csvData = Papa.unparse([
      {
        'Total Views': analytics.totalViews,
        'Unique Visitors': analytics.uniqueVisitors,
        'Home Page Views': analytics.pageViews.home,
        'Portfolio Page Views': analytics.pageViews.portfolio,
        'Pricing Page Views': analytics.pageViews.pricing,
        'Contact Page Views': analytics.pageViews.contact,
        'Desktop Users': analytics.deviceTypes.desktop,
        'Mobile Users': analytics.deviceTypes.mobile,
        'Tablet Users': analytics.deviceTypes.tablet,
        'Last Updated': analytics.lastUpdated
      }
    ]);
    
    return new NextResponse(csvData, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="workitu-analytics-${new Date().toISOString().split('T')[0]}.csv"`
      }
    });
  } catch (error) {
    console.error('Analytics export error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const GET = requireAuth(handler);
