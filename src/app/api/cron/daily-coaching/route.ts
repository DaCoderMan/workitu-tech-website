import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const OWNER_CHAT_ID = process.env.TELEGRAM_OWNER_CHAT_ID!;
const CRON_SECRET = process.env.CRON_SECRET || '';

// 4 DAILY CHECK-INS: 8:00, 13:00, 18:00, 20:00 Israel time
// Each has a different purpose and feeling

const morning8am = [
  "Morning ☀️ How'd you sleep? What's one thing you want to get done today?",
  "Hey, new day. How are you feeling? Energy level 1-10?",
  "Good morning! Before the day runs away - what's your priority?",
  "Rise and shine 🌅 What would make today a win?",
  "Morning! How's the family? And what's on the agenda?",
  "☀️ New day. What's on your mind?",
  "Good morning! One word to describe how you woke up feeling?",
  "Hey. Quick question before your day starts: what's the ONE thing?",
  "Morning 🙂 Tell me one thing you're looking forward to today.",
  "Good morning! What's the plan?",
];

const midday1pm = [
  "Halfway through the day! How's it going?",
  "Lunch break check-in 🍽️ What have you done today so far?",
  "Hey, midday check. Are you on track with what you planned?",
  "How's the day shaping up? Any wins, even small ones?",
  "Quick check - did you eat? Drink water? Did you do the thing?",
  "1 PM: What's been your biggest challenge today?",
  "Midday! If you could only do ONE more thing today, what?",
  "Hey! What surprised you today?",
  "Afternoon check. Honest: productive or scattered?",
  "How's the energy? Tell me one thing you accomplished.",
];

const evening6pm = [
  "Evening! Work day wrapping up. What did you get done?",
  "Hey, tell me one thing you're proud of from today.",
  "End of day: How was today overall? 1-10?",
  "Time to wind down. What was the hardest part of today?",
  "Evening 🌆 Did today go the way you wanted?",
  "Family time approaching. But first - one accomplishment?",
  "Day's almost done. What's one lesson today taught you?",
  "Evening check: How's your body feeling?",
  "Almost done. What went well? What didn't?",
  "🌆 Was today a 'moved the needle' day or 'treading water'?",
];

const night8pm = [
  "Night check-in 🌙 How are you feeling? Not work - LIFE.",
  "Hey, how's the evening? Time with Milan and Eti?",
  "Before sleep: what's one thing you're grateful for?",
  "🌙 What's the ONE most important thing for tomorrow?",
  "Evening wind-down. How's your mental state? Be real.",
  "Night. What's one thing you wish you'd done differently today?",
  "Hey, last check. On 1-10, how fulfilled do you feel?",
  "🌙 Tomorrow is a new chance. What do you want to happen?",
  "Night! Hope you had quality family time. What's on your heart?",
  "Before you unplug - anything on your mind you want to get out?",
];

const fridayMessages = [
  "Happy Friday! 🎉 How did this week ACTUALLY go? Be honest.",
  "TGIF! What worked this week? What didn't?",
  "Friday vibes 🙌 What's one thing you're proud of this week?",
  "It's Friday! Did you do what you committed to this week?",
];

function getTimeSlot(): string {
  const now = new Date();
  const hour = parseInt(now.toLocaleString('en-US', { timeZone: 'Asia/Jerusalem', hour: '2-digit', hour12: false }));
  const day = now.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'Asia/Jerusalem' });
  if (day === 'Friday' && hour < 12) return 'friday';
  if (hour < 10) return 'morning';
  if (hour < 15) return 'midday';
  if (hour < 19) return 'evening';
  return 'night';
}

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!OWNER_CHAT_ID) return NextResponse.json({ error: 'No owner' }, { status: 500 });

  const day = new Date().toLocaleDateString('en-US', { weekday: 'long', timeZone: 'Asia/Jerusalem' });
  const dayOfPlan = Math.floor((Date.now() - new Date('2026-02-19').getTime()) / 86400000) + 1;

  if (day === 'Saturday') {
    await send("Shabbat Shalom 🕊️ Rest. Family. No hustle today.");
    return NextResponse.json({ success: true, slot: 'shabbat' });
  }

  const slot = getTimeSlot();
  const pools: Record<string, string[]> = { morning: morning8am, midday: midday1pm, evening: evening6pm, night: night8pm, friday: fridayMessages };
  let msg = pick(pools[slot] || morning8am);

  if (dayOfPlan === 7) msg += "\n\nP.S. One week in. Let's review.";
  else if (dayOfPlan === 14) msg += "\n\nP.S. Halfway through the 30 days 💪";
  else if (dayOfPlan === 30) msg += "\n\n🏁 Day 30. Let's review everything.";

  await send(msg);
  return NextResponse.json({ success: true, slot, dayOfPlan });
}

async function send(text: string) {
  await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: OWNER_CHAT_ID, text, parse_mode: 'Markdown' }),
  });
}
