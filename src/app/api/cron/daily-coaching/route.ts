import { NextRequest, NextResponse } from 'next/server';
import { loadMemory, getUnfollowedCommitments } from '@/lib/coach-memory';

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const OWNER_CHAT_ID = process.env.TELEGRAM_OWNER_CHAT_ID!;
const CRON_SECRET = process.env.CRON_SECRET || '';
const GOOGLE_AI_API_KEY = process.env.GOOGLE_AI_API_KEY || '';

// ============================================================
// LEADS — rotate through real Israeli business types
// Scorpio suggests a category + where to find them
// ============================================================

const leadCategories = [
  {
    type: "Brazilian restaurants in Israel",
    where: "Facebook group 'Brasileiros em Israel' + Google Maps search 'מסעדה ברזילאית'",
    angle: "They serve your community. You speak their language. Easy warm intro.",
    search: "Brasileiros em Israel restaurant website",
  },
  {
    type: "Local accountants and lawyers in your city",
    where: "Google Maps → search 'רואה חשבון' or 'עורך דין' + filter by no website",
    angle: "Professional services NEED credibility online. High LTV clients.",
    search: "Israel accountant lawyer no website",
  },
  {
    type: "Olim-owned small businesses",
    where: "Facebook group 'Anglo Israel Business Network' + 'Nefesh B'Nefesh community'",
    angle: "English-speaking, tech-comfortable, need digital presence, trust other olim.",
    search: "Anglo Israel business network Facebook",
  },
  {
    type: "Brazilian beauty salons and clinics",
    where: "Facebook group 'Brasileiros em Israel' — search for 'salão', 'estética', 'clínica'",
    angle: "Tons of Brazilian-owned beauty businesses in Israel. They want Portuguese-speaking help.",
    search: "salão beleza israelis brasileiros",
  },
  {
    type: "English-speaking tutors and coaches",
    where: "Facebook groups 'Anglo Israel' + 'English teachers Israel' + LinkedIn",
    angle: "Solo entrepreneurs who need booking pages, testimonials, simple websites.",
    search: "English tutor Israel no website",
  },
  {
    type: "Local gyms and personal trainers",
    where: "Google Maps → 'חדר כושר' in your area — check which ones have weak or no websites",
    angle: "High competition means they NEED to stand out. Monthly retainer potential.",
    search: "gym personal trainer Israel website",
  },
  {
    type: "Israeli startups needing a landing page",
    where: "LinkedIn → filter Israel + Startup + 'looking for web developer' posts",
    angle: "Quick wins — MVPs, landing pages, pitch decks. Good hourly rates.",
    search: "Israel startup landing page developer needed",
  },
  {
    type: "Event planners and wedding vendors",
    where: "Instagram #חתונהישראל + Facebook 'Wedding planning Israel'",
    angle: "Image-heavy, social-first businesses that need proper websites for trust.",
    search: "Israel wedding planner no website",
  },
];

// ============================================================
// TECH NEWS — Gemini fetches real news if available,
// fallback to curated topics
// ============================================================

const fallbackNews = [
  "Next.js 15 introduced React 19 support — time to upgrade any client projects before they ask why.",
  "Israel's tech sector is hiring despite global slowdown — good time to position Workitu for local contracts.",
  "AI website builders (Wix AI, Framer AI) are growing — your edge is custom code + actual client relationship.",
  "Monthly retainer pricing is trending up in freelance web dev — ₪800-2000/month is the new standard in Israel.",
  "WhatsApp Business API is booming for Israeli SMBs — offer it as an add-on service.",
  "Google's algorithm update is penalizing slow sites — good cold outreach angle: 'Your site scored X on PageSpeed'.",
  "Vercel just launched AI features in v0.dev — you could use this to prototype for clients 5x faster.",
  "LinkedIn Israel is the #1 B2B channel for freelancers right now — your profile needs a post this week.",
  "Brazilian community in Israel is growing — Federação das Associações Israelenses-Brasileiras has 40k+ members.",
  "No-code tools have a ceiling — complex clients always come back to developers. Your skill has a moat.",
];

async function getNewsItem(): Promise<string> {
  if (!GOOGLE_AI_API_KEY) return fallbackNews[Math.floor(Math.random() * fallbackNews.length)];

  try {
    // Use Gemini with Google Search grounding for real news
    const resp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GOOGLE_AI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            role: 'user',
            parts: [{ text: `You are briefing a freelance web developer in Israel (Next.js, React, Tailwind) who is trying to get his first client.

Give him ONE specific, actionable piece of news or insight from the last 48 hours about: Israel tech, web dev tools, freelance market, or AI tools for developers.

Format: One sentence of news/insight + one sentence of WHY it matters to him specifically.
Keep it under 60 words total. Be direct and specific, not generic.` }]
          }],
          tools: [{ google_search: {} }],
          generationConfig: { maxOutputTokens: 100, temperature: 0.7 },
        }),
      }
    );
    const data = await resp.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (text && text.length > 20) return text.trim();
  } catch (e) {
    console.error('News fetch error:', e);
  }

  return fallbackNews[Math.floor(Math.random() * fallbackNews.length)];
}

// ============================================================
// DAILY TASKS — escalate over 30-day plan
// ============================================================

function getDailyTasks(dayOfPlan: number): string {
  if (dayOfPlan <= 3) {
    const tasks = [
      "1. Open workitu.com as a stranger. Write 3 confusing things.\n2. Fix the most obvious one.\n3. Screenshot before/after.",
      "1. List 10 business types in Israel that need a website.\n2. Pick your top 3.\n3. Find 1 real example of each on Google Maps.",
      "1. Join 1 Facebook group (Brazilian community or Anglo Israel business).\n2. Read 10 posts, don't post.\n3. Screenshot 2 businesses that might need a website.",
    ];
    return tasks[Math.min(dayOfPlan - 1, 2)];
  }
  if (dayOfPlan <= 7) {
    const tasks = [
      "1. Write your first outreach message (draft only, don't send).\n2. Read it out loud.\n3. Show it to me.",
      "1. Find 5 businesses with no website or a bad one.\n2. Save their contact info.\n3. Pick your #1 prospect.",
      "1. Send 1 real outreach message. Press send.\n2. Write down how it felt.\n3. Tell me.",
      "1. Send 3 outreach messages.\n2. Follow up on any from yesterday.\n3. Report the count.",
    ];
    return tasks[Math.floor(Math.random() * tasks.length)];
  }
  // Day 8+: grind mode
  const tasks = [
    "1. Send 5 outreach messages.\n2. Follow up on no-replies (3+ days old).\n3. Report count.",
    "1. Post 1 thing on LinkedIn about your work.\n2. Send 5 outreach messages.\n3. Note 1 objection you got or fear.",
    "1. Find 3 Brazilian-owned businesses in Israel.\n2. Message 2 of them in Portuguese.\n3. Report back.",
    "1. Send 5 outreach messages.\n2. Try a completely different opening line.\n3. Compare response rates.",
    "1. Ask 1 person in your network for a referral.\n2. Send 5 outreach messages.\n3. Log total sent this week.",
  ];
  return tasks[Math.floor(Math.random() * tasks.length)];
}

// ============================================================
// COMMITMENT FOLLOW-UP
// ============================================================

async function getCommitmentFollowUp(chatId: string): Promise<string> {
  try {
    const unfollowed = await getUnfollowedCommitments(chatId);
    if (unfollowed.length === 0) return '';
    // Pick the most recent unfollowed commitment
    const latest = unfollowed[unfollowed.length - 1];
    return `\n\n⚡ *Yesterday you said:* "${latest.text.slice(0, 100)}"\nDid you do it?`;
  } catch {
    return '';
  }
}

// ============================================================
// SEND TO TELEGRAM
// ============================================================

async function send(text: string) {
  await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: OWNER_CHAT_ID, text, parse_mode: 'Markdown' }),
  });
}

// ============================================================
// MAIN CRON HANDLER
// Runs once daily at 5 AM UTC = 8 AM Israel time
// ============================================================

export async function GET(req: NextRequest) {
  // Auth
  const authHeader = req.headers.get('authorization');
  const urlSecret = req.nextUrl.searchParams.get('secret');
  if (CRON_SECRET) {
    if (authHeader !== `Bearer ${CRON_SECRET}` && urlSecret !== CRON_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  if (!OWNER_CHAT_ID) return NextResponse.json({ error: 'No owner chat ID set' }, { status: 500 });

  const day = new Date().toLocaleDateString('en-US', { weekday: 'long', timeZone: 'Asia/Jerusalem' });
  const dayOfPlan = Math.floor((Date.now() - new Date('2026-02-19').getTime()) / 86400000) + 1;

  // Saturday: Shabbat message only
  if (day === 'Saturday') {
    await send("Shabbat Shalom 🕊️ Rest. Family. No hustle today. I'll see you tomorrow.");
    return NextResponse.json({ ok: true, type: 'shabbat' });
  }

  // Allow forcing a slot from external cron
  const slot = req.nextUrl.searchParams.get('slot');
  if (slot === 'midday') {
    await send("Midday check ☀️ How's the day going? Did you send anything yet?");
    return NextResponse.json({ ok: true, type: 'midday' });
  }
  if (slot === 'evening') {
    const commitmentNote = await getCommitmentFollowUp(OWNER_CHAT_ID);
    await send(`Evening wrap-up 🌆 What actually got done today? Be honest.${commitmentNote}`);
    return NextResponse.json({ ok: true, type: 'evening' });
  }

  // MORNING BRIEFING — the main event
  // Fetch news and lead in parallel
  const [newsItem, commitmentNote] = await Promise.all([
    getNewsItem(),
    getCommitmentFollowUp(OWNER_CHAT_ID),
  ]);

  const leadIndex = dayOfPlan % leadCategories.length;
  const lead = leadCategories[leadIndex];
  const tasks = getDailyTasks(dayOfPlan);

  const dateStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'short', day: 'numeric', timeZone: 'Asia/Jerusalem'
  });

  const message = `☀️ *Good morning — Day ${dayOfPlan}/30*
${dateStr}

📋 *Today's tasks:*
${tasks}

🎯 *Lead of the day — ${lead.type}:*
Where: ${lead.where}
Why you: ${lead.angle}

📡 *Worth knowing:*
${newsItem}${commitmentNote}

You got this. Talk to me when you're up.`;

  await send(message);
  return NextResponse.json({ ok: true, type: 'morning', dayOfPlan });
}
