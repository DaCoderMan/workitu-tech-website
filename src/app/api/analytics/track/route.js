import { NextResponse } from 'next/server';
import { trackPageView, trackProjectClick, trackUniqueVisitor, getAnalytics } from '../../../../utils/analytics';

export async function POST(request) {
  try {
    const { event, page, projectId, userAgent, referrer } = await request.json();
    
    switch (event) {
      case 'page_view':
        await trackPageView(page, userAgent, referrer);
        break;
      case 'project_click':
        if (projectId) {
          await trackProjectClick(projectId);
        }
        break;
      case 'unique_visitor':
        await trackUniqueVisitor();
        break;
      default:
        return NextResponse.json(
          { message: 'Invalid event type' },
          { status: 400 }
        );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics tracking error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const analytics = await getAnalytics();
    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Analytics fetch error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
