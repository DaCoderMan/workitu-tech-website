import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;
const OWNER_CHAT_ID = process.env.TELEGRAM_OWNER_CHAT_ID || '';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';

// ============================================================
// COACHING KNOWLEDGE BASE - Yonatan's Full Context
// ============================================================
const COACHING_SYSTEM_PROMPT = `You are Yonatan's personal AI business coach bot. You are direct, honest, and care about his success. You know everything about his situation:

## WHO IS YONATAN
- Yonatan Sam Perlin, developer based in Israel (Oleh Hadash)
- Company: Workitu Tech (workitu.com)
- Email: contact@workitu.com
- Has a child (Milan) and partner (Eti)

## HIS CORE PROBLEM: EXTREME PROJECT SCATTER
- 151 GitHub repositories, 180+ local project folders
- 29 of those folders are Workitu variations alone
- 10+ versions of the same expense/finance app
- 66,391 unread emails
- Zero paying clients ever
- He starts projects constantly but never finishes and ships them

## HIS SITUATION
- Income: Disability payments from Bituach Leumi (enough to cover expenses)
- Health: Bipolar (treated, stable), spine recovery (L5-S1)
- Has investments but no earned income
- Paying for Cloudflare, Vercel, Supabase, ClickUp with no revenue
- HR4ALL with Silvia Baskin was a personal collaboration, not a paid client. She ended it.

## HIS 30-DAY PLAN (Started Feb 19, 2026)
He chose Option B: Workitu Consulting - selling dev services to businesses.

### Week 1 (Feb 19-25): Fix Foundation
- Email bankruptcy (archive 66k emails, set up filters)
- Fix workitu.com: add portfolio case studies, testimonials section, booking link
- Define niche: AI-Powered Web Apps ($670+)
- Build outreach list of 20 potential clients

### Week 2 (Feb 26 - Mar 4): Start Selling
- Send 5 cold outreach messages per day
- Post on LinkedIn 3x/week
- Join Israeli tech/freelance groups

### Week 3 (Mar 5-11): Close Deals
- Discovery calls, send proposals within 24hrs
- Follow up within 48hrs

### Week 4 (Mar 12-18): Deliver
- Ship on time, over-communicate
- Get testimonial, ask for referrals

## YOUR RULES AS COACH
1. Be SHORT and direct. No long essays. Telegram messages should be concise.
2. Always ask "what did you DO today?" not "what are you thinking about?"
3. If he mentions a NEW project idea, gently redirect: "That's interesting, but what about your outreach today?"
4. Celebrate action, not planning. Sending 1 message > writing 10 plans.
5. Track his daily metrics: outreach sent, responses, calls, proposals
6. If he hasn't checked in, nudge him
7. Use emojis sparingly but warmly
8. If he reports progress, be genuinely enthusiastic
9. If he's stuck, give ONE specific next step
10. Never let him add a new project during the 30-day freeze
11. Speak in English unless he writes in Hebrew, then respond in Hebrew

## DAILY QUESTIONS TO ASK
- How many outreach messages did you send today?
- Did you get any responses?
- What's blocking you right now?
- What's your ONE task for tomorrow?

Remember: Your job is to keep him focused on Workitu consulting, not let him drift into building new apps.`;

// ============================================================
// CONVERSATION MEMORY (in-memory, resets on cold start)
// ============================================================
interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const conversations = new Map<string, Message[]>();
const MAX_HISTORY = 30;

function getConversation(chatId: string): Message[] {
  if (!conversations.has(chatId)) {
    conversations.set(chatId, []);
  }
  return conversations.get(chatId)!;
}

function addMessage(chatId: string, role: 'user' | 'assistant', content: string) {
  const conv = getConversation(chatId);
  conv.push({ role, content });
  if (conv.length > MAX_HISTORY) {
    conv.splice(0, conv.length - MAX_HISTORY);
  }
}

// ============================================================
// TELEGRAM HELPERS
// ============================================================
async function sendTelegramMessage(chatId: string | number, text: string) {
  const resp = await fetch(`${TELEGRAM_API}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
    }),
  });
  return resp.json();
}

// ============================================================
// AI RESPONSE (DeepSeek or fallback)
// ============================================================
async function getAIResponse(chatId: string, userMessage: string): Promise<string> {
  const history = getConversation(chatId);

  // Add date context
  const now = new Date();
  const dayOfPlan = Math.floor((now.getTime() - new Date('2026-02-19').getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const weekOfPlan = Math.min(4, Math.ceil(dayOfPlan / 7));

  const dateContext = `[Today is ${now.toISOString().split('T')[0]}. Day ${dayOfPlan} of the 30-day plan. Week ${weekOfPlan}.]`;

  if (DEEPSEEK_API_KEY) {
    try {
      const messages = [
        { role: 'system', content: COACHING_SYSTEM_PROMPT + '\n\n' + dateContext },
        ...history.map(m => ({ role: m.role, content: m.content })),
        { role: 'user', content: userMessage },
      ];

      const resp = await fetch('https://api.deepseek.com/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages,
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      const data = await resp.json();
      if (data.choices?.[0]?.message?.content) {
        return data.choices[0].message.content;
      }
    } catch (e) {
      console.error('DeepSeek error:', e);
    }
  }

  // Fallback: rule-based responses
  return getFallbackResponse(userMessage, dayOfPlan, weekOfPlan);
}

function getFallbackResponse(msg: string, day: number, week: number): string {
  const lower = msg.toLowerCase();

  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower === '/start') {
    return `Hey Yonatan! 👋 Day ${day} of your 30-day Workitu plan.\n\nQuick check-in:\n1. How many outreach messages did you send today?\n2. Any responses or calls?\n3. What's your ONE focus for today?`;
  }

  if (lower.includes('new idea') || lower.includes('new project') || lower.includes('new app') || lower.includes('new repo')) {
    return `🛑 30-day freeze is active! No new projects.\n\nI know the idea feels exciting, but remember: you have 151 repos and zero paying clients. Write the idea down in a note and come back to it AFTER you land your first consulting client.\n\nNow - how many outreach messages did you send today?`;
  }

  if (lower.includes('stuck') || lower.includes('don\'t know') || lower.includes('confused')) {
    if (week === 1) {
      return `Week 1 focus: Fix your foundation.\n\nHere's your ONE next step:\n→ Open workitu.com, pick ONE of your projects (like expensi or health-dashboard), and write a 3-sentence case study for it on the portfolio page.\n\nThat's it. Just one. Go.`;
    } else {
      return `When you're stuck, do the smallest possible action:\n\n→ Open LinkedIn right now\n→ Find ONE person who runs a small business\n→ Send them a message: "Hey, I build AI-powered websites. Can I help with anything?"\n\nOne message. That's all. Go.`;
    }
  }

  if (lower.includes('outreach') || lower.includes('message') || lower.includes('sent')) {
    return `Great that you're thinking about outreach! 💪\n\nHow many messages did you actually SEND today? Give me a number.`;
  }

  if (lower.includes('progress') || lower.includes('update') || lower.includes('done') || lower.includes('/status')) {
    return `📊 Day ${day}/30 Status Check\n\nTell me:\n1. Outreach messages sent today: ?\n2. Total responses this week: ?\n3. Calls booked: ?\n4. Proposals sent: ?\n5. Revenue: ?\n\nBe honest - the numbers don't lie.`;
  }

  return `Day ${day} of 30. Week ${week}.\n\nThree questions:\n1. What did you DO today (not plan, not think about - DO)?\n2. How many outreach messages did you send?\n3. What's your ONE task for tomorrow?\n\nKeep it simple. Action > planning.`;
}

// ============================================================
// COMMAND HANDLERS
// ============================================================
function handleCommand(command: string, chatId: string): string | null {
  switch (command) {
    case '/start':
      return `🎯 *Workitu Coach Bot Active*\n\nHey Yonatan! I'm your accountability partner for the 30-day Workitu consulting launch.\n\nI know your full situation - the 151 repos, the 29 Workitu folders, the zero clients. We're fixing that.\n\n*Commands:*\n/status - Check your progress\n/plan - See today's tasks\n/week - See this week's goals\n/rules - The 30-day rules\n/help - All commands\n\nLet's get to work. What did you DO today?`;

    case '/plan': {
      const now = new Date();
      const day = Math.floor((now.getTime() - new Date('2026-02-19').getTime()) / (1000 * 60 * 60 * 24)) + 1;
      const week = Math.min(4, Math.ceil(day / 7));

      const plans: Record<number, string> = {
        1: `📋 *Week 1: Fix Foundation*\n\n• Archive 66k emails, set up filters\n• Add portfolio case studies to workitu.com\n• Set up Calendly booking link\n• Define your niche offer (AI Web Apps, $670+)\n• Build list of 20 potential clients\n• Draft cold outreach message`,
        2: `📋 *Week 2: Start Selling*\n\n• Send 5 outreach messages per day\n• Post on LinkedIn 3x this week\n• Join Israeli tech/freelance groups\n• Follow up on all previous messages\n• Create 1 piece of content daily`,
        3: `📋 *Week 3: Close Deals*\n\n• Do discovery calls\n• Send proposals within 24hrs\n• Follow up within 48hrs\n• Negotiate and close first deal`,
        4: `📋 *Week 4: Deliver*\n\n• Ship client work on time\n• Over-communicate (daily updates)\n• Get testimonial\n• Ask for referrals`,
      };
      return plans[week] || plans[4];
    }

    case '/rules':
      return `🚫 *30-Day Rules (Non-Negotiable)*\n\n1. ZERO new projects or repos\n2. All coding = Workitu client work or portfolio\n3. Check email once/day, filtered only\n4. Track: outreach sent, responses, calls, proposals\n5. Weekly review every Friday\n\n_The goal: 1 paying client in 30 days._`;

    case '/status':
      return null; // Handled by AI

    case '/help':
      return `*Available Commands:*\n\n/start - Welcome message\n/status - Progress check-in\n/plan - This week's tasks\n/week - Weekly goals\n/rules - 30-day rules\n/help - This message\n\nOr just talk to me! Tell me what you did today, ask for advice, or check in.`;

    case '/week':
      return null; // Let AI handle with context

    default:
      return null;
  }
}

// ============================================================
// WEBHOOK HANDLER
// ============================================================
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body?.message;

    if (!message?.text || !message?.chat?.id) {
      return NextResponse.json({ ok: true });
    }

    const chatId = String(message.chat.id);
    const text = message.text.trim();
    const isOwner = !OWNER_CHAT_ID || chatId === OWNER_CHAT_ID;

    // Security: Only respond to owner
    if (!isOwner && OWNER_CHAT_ID) {
      await sendTelegramMessage(chatId, 'This bot is private. Contact @workitu for services.');
      return NextResponse.json({ ok: true });
    }

    // Check for commands
    const commandResponse = handleCommand(text.split(' ')[0].toLowerCase(), chatId);
    if (commandResponse) {
      addMessage(chatId, 'user', text);
      addMessage(chatId, 'assistant', commandResponse);
      await sendTelegramMessage(chatId, commandResponse);
      return NextResponse.json({ ok: true });
    }

    // AI-powered response
    addMessage(chatId, 'user', text);
    const response = await getAIResponse(chatId, text);
    addMessage(chatId, 'assistant', response);
    await sendTelegramMessage(chatId, response);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Telegram webhook error:', error);
    return NextResponse.json({ ok: true });
  }
}

// GET handler for webhook verification
export async function GET() {
  return NextResponse.json({ status: 'Workitu Coach Bot is running' });
}
