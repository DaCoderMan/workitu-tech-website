import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const OWNER_CHAT_ID = process.env.TELEGRAM_OWNER_CHAT_ID!;
const CRON_SECRET = process.env.CRON_SECRET || '';

// Daily morning coaching message - triggered by Vercel Cron
// Runs at 8:00 AM Israel time (5:00 UTC)
export async function GET(req: NextRequest) {
  // Verify cron secret (Vercel sends this)
  const authHeader = req.headers.get('authorization');
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!OWNER_CHAT_ID) {
    return NextResponse.json({ error: 'No owner chat ID configured' }, { status: 500 });
  }

  const now = new Date();
  const day = Math.floor((now.getTime() - new Date('2026-02-19').getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const week = Math.min(4, Math.ceil(day / 7));
  const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'Asia/Jerusalem' });

  let message = '';

  if (day < 1) {
    message = `🌅 Good morning Yonatan!\n\nYour 30-day plan starts on Feb 19. Get ready!`;
  } else if (day > 30) {
    message = `🎉 Day ${day} - You've completed the 30-day plan!\n\nTime for review: How many clients did you land? What worked? What's next?`;
  } else {
    // Weekly themed messages
    const weekMessages: Record<number, string> = {
      1: `🌅 *Good morning! Day ${day}/30 - Week 1: Foundation*\n\n${dayOfWeek}'s focus:\n`,
      2: `🌅 *Good morning! Day ${day}/30 - Week 2: Selling*\n\n${dayOfWeek}'s focus:\n`,
      3: `🌅 *Good morning! Day ${day}/30 - Week 3: Closing*\n\n${dayOfWeek}'s focus:\n`,
      4: `🌅 *Good morning! Day ${day}/30 - Week 4: Delivering*\n\n${dayOfWeek}'s focus:\n`,
    };

    message = weekMessages[week] || weekMessages[4];

    // Day-specific tasks
    if (day === 1) {
      message += `✅ Archive all 66k emails - declare email bankruptcy\n✅ List all SaaS subscriptions, cancel unnecessary ones\n✅ The 30-day freeze on new projects starts NOW`;
    } else if (day <= 3) {
      message += `✅ Add case studies to workitu.com portfolio\n✅ Set up Calendly/Cal.com booking link\n✅ Make sure contact form works`;
    } else if (day <= 5) {
      message += `✅ Define your lead service: AI-Powered Web Apps ($670+)\n✅ Write a 1-page proposal template\n✅ Create your professional email signature`;
    } else if (day <= 7) {
      message += `✅ Find 20 potential clients (Israeli small businesses)\n✅ Join 3 tech/freelance groups\n✅ Draft your cold outreach message`;
    } else if (week === 2) {
      message += `✅ Send 5 outreach messages today\n✅ Follow up on yesterday's messages\n✅ Create 1 LinkedIn post or content piece\n\n📊 How many total messages have you sent this week?`;
    } else if (week === 3) {
      message += `✅ Follow up on all open conversations\n✅ Do discovery calls if any are booked\n✅ Send proposals within 24hrs of calls\n\n💰 Any leads warming up?`;
    } else {
      message += `✅ Focus on client delivery (if you have one)\n✅ Continue outreach - don't stop\n✅ Ask for testimonials from any completed work\n\n🏆 The finish line is close!`;
    }

    // Friday = weekly review
    if (dayOfWeek === 'Friday') {
      message += `\n\n📊 *FRIDAY REVIEW*\nTime to count:\n- Outreach messages sent this week: ?\n- Responses received: ?\n- Calls/meetings: ?\n- Proposals sent: ?\n- Revenue: ?\n\nBe honest with yourself.`;
    }

    message += `\n\nReply with what you plan to DO today (not think about - DO).`;
  }

  try {
    const resp = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: OWNER_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    const result = await resp.json();
    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
