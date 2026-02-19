import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const SETUP_SECRET = process.env.TELEGRAM_SETUP_SECRET || 'workitu-setup-2026';

// This route sets up the Telegram webhook
// Call it once after deployment: GET /api/telegram/setup?secret=workitu-setup-2026
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('secret');

  if (secret !== SETUP_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get the base URL from the request
  const host = req.headers.get('host');
  const protocol = host?.includes('localhost') ? 'http' : 'https';
  const webhookUrl = `${protocol}://${host}/api/telegram`;

  try {
    // Set the webhook
    const setResp = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/setWebhook`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: webhookUrl,
          allowed_updates: ['message'],
        }),
      }
    );
    const setResult = await setResp.json();

    // Get webhook info to verify
    const infoResp = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/getWebhookInfo`
    );
    const infoResult = await infoResp.json();

    return NextResponse.json({
      webhook_set: setResult,
      webhook_info: infoResult,
      webhook_url: webhookUrl,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
