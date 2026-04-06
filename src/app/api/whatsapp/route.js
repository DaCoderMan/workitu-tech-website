import { NextResponse } from 'next/server';

// ========== CONFIGURATION ==========
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'contact@workitu.com';
const OWNER_WHATSAPP = process.env.OWNER_WHATSAPP || '+972587897763';

// ========== ANTI-ABUSE ==========
const rateLimitMap = new Map(); // phone -> { count, firstMessage, lastMessage }
const MAX_MESSAGES_PER_MINUTE = 8;
const MAX_MESSAGES_PER_HOUR = 40;
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
const SUSPICIOUS_PATTERNS = [
  /https?:\/\//i, // links
  /\b(buy|sell|crypto|bitcoin|forex|click here|free money)\b/i,
];

function isRateLimited(phone) {
  const now = Date.now();
  let entry = rateLimitMap.get(phone);

  if (!entry) {
    entry = { count: 1, minuteCount: 1, firstMessage: now, lastMinute: now, lastMessage: now };
    rateLimitMap.set(phone, entry);
    return false;
  }

  // Reset minute counter
  if (now - entry.lastMinute > 60000) {
    entry.minuteCount = 0;
    entry.lastMinute = now;
  }

  entry.count++;
  entry.minuteCount++;
  entry.lastMessage = now;

  if (entry.minuteCount > MAX_MESSAGES_PER_MINUTE) return true;
  if (entry.count > MAX_MESSAGES_PER_HOUR && now - entry.firstMessage < 3600000) return true;

  return false;
}

function isSuspicious(message) {
  return SUSPICIOUS_PATTERNS.some(p => p.test(message));
}

// ========== CONVERSATION STATE ==========
const sessions = new Map(); // phone -> { step, data, lastActivity, humanMode }

const QUESTIONS = [
  { key: 'name', ask: { en: "Welcome to Workitu Tech! 🐝 I'm Bee, your AI assistant. What's your name?", pt: "Bem-vindo à Workitu Tech! 🐝 Sou a Bee, sua assistente de IA. Qual é o seu nome?", he: "ברוכים הבאים ל-Workitu Tech! 🐝 אני Bee, העוזרת הדיגיטלית שלך. מה שמך?" } },
  { key: 'service', ask: { en: "Nice to meet you, {name}! What are you interested in?\n\n1️⃣ AI WhatsApp Bot\n2️⃣ Tech Mentoring / Lessons\n3️⃣ Online Marketing\n4️⃣ Custom Digital Product\n5️⃣ Something else", pt: "Prazer em conhecê-lo, {name}! No que você tem interesse?\n\n1️⃣ Bot WhatsApp com IA\n2️⃣ Mentoria Tech / Aulas\n3️⃣ Marketing Online\n4️⃣ Produto Digital Personalizado\n5️⃣ Outro", he: "נעים להכיר, {name}! במה אתה מעוניין?\n\n1️⃣ בוט WhatsApp עם AI\n2️⃣ מנטורינג טכנולוגי / שיעורים\n3️⃣ שיווק דיגיטלי\n4️⃣ מוצר דיגיטלי מותאם\n5️⃣ משהו אחר" } },
  { key: 'business', ask: { en: "Tell me a bit about your business or what you do. This helps us understand how to best help you.", pt: "Conte-me um pouco sobre seu negócio ou o que você faz. Isso nos ajuda a entender como melhor ajudá-lo.", he: "ספר לי קצת על העסק שלך או מה אתה עושה. זה עוזר לנו להבין איך לעזור לך." } },
  { key: 'challenge', ask: { en: "What's the biggest challenge you're facing right now that technology could help with?", pt: "Qual é o maior desafio que você enfrenta agora que a tecnologia poderia ajudar?", he: "מה האתגר הגדול ביותר שאתה מתמודד איתו עכשיו שטכנולוגיה יכולה לעזור בו?" } },
  { key: 'email', ask: { en: "Great! What's the best email to reach you? We'll send you a summary and follow up.", pt: "Ótimo! Qual é o melhor e-mail para entrar em contato? Enviaremos um resumo e faremos follow-up.", he: "מצוין! מה המייל הכי טוב ליצור איתך קשר? נשלח לך סיכום ונעקוב." } },
];

const SERVICE_MAP = {
  '1': 'AI WhatsApp Bot', '2': 'Tech Mentoring', '3': 'Online Marketing',
  '4': 'Custom Digital Product', '5': 'Other'
};

function getSession(phone) {
  let session = sessions.get(phone);
  if (!session || Date.now() - (session.lastActivity || 0) > SESSION_TIMEOUT_MS) {
    session = { step: 0, data: {}, lastActivity: Date.now(), humanMode: false, lang: 'en' };
    sessions.set(phone, session);
  }
  session.lastActivity = Date.now();
  return session;
}

function detectLanguage(text) {
  const ptWords = /\b(olá|oi|bom dia|boa tarde|boa noite|obrigado|por favor|como|está|quero|preciso|negócio|ajuda)\b/i;
  const heWords = /[\u0590-\u05FF]/;
  if (heWords.test(text)) return 'he';
  if (ptWords.test(text)) return 'pt';
  return 'en';
}

// ========== DEEPSEEK AI ==========
async function askDeepSeek(userMessage, context) {
  const systemPrompt = `You are Bee, the friendly AI assistant for Workitu Tech — a company that builds AI automation, WhatsApp bots, websites, and digital products for professionals in Israel.

Your job: Help potential clients understand what Workitu Tech offers and collect their information so the team can follow up.

Context about this client so far:
${JSON.stringify(context, null, 2)}

Rules:
- Be warm, professional, and concise (max 2-3 sentences)
- If they ask about pricing, say "Starting from ₪800 for WhatsApp bots, ₪150/hr for mentoring. Every project gets a free diagnosis first!"
- If they ask technical questions, give brief helpful answers
- Always steer back to collecting their info or scheduling a consultation
- Respond in the same language the user writes in
- Never make up information about Workitu Tech services
- Never share personal data about the owner`;

  try {
    const res = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      console.error('DeepSeek API error:', res.status);
      return null;
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content || null;
  } catch (err) {
    console.error('DeepSeek error:', err);
    return null;
  }
}

// ========== SEND WHATSAPP VIA TWILIO ==========
async function sendWhatsApp(to, body) {
  const url = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
  const params = new URLSearchParams({
    From: `whatsapp:${TWILIO_WHATSAPP_NUMBER}`,
    To: to.startsWith('whatsapp:') ? to : `whatsapp:${to}`,
    Body: body,
  });

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('Twilio send error:', err);
  }
}

// ========== SEND LEAD TO EMAIL ==========
async function sendLeadEmail(leadData) {
  try {
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER || CONTACT_EMAIL,
      to: CONTACT_EMAIL,
      subject: `🐝 New WhatsApp Lead: ${leadData.name || 'Unknown'}`,
      html: `
        <h2>New Lead from WhatsApp Bot</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${leadData.name || '-'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #ddd">${leadData.phone || '-'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Service</td><td style="padding:8px;border:1px solid #ddd">${leadData.service || '-'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Business</td><td style="padding:8px;border:1px solid #ddd">${leadData.business || '-'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Challenge</td><td style="padding:8px;border:1px solid #ddd">${leadData.challenge || '-'}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${leadData.email || '-'}</td></tr>
        </table>
        <p style="margin-top:16px;color:#666">Sent via Workitu Tech WhatsApp Bot</p>
      `,
    });
  } catch (err) {
    console.error('Email send error:', err);
  }
}

// ========== FORWARD TO OWNER ==========
async function forwardToOwner(phone, message) {
  await sendWhatsApp(
    OWNER_WHATSAPP,
    `📩 Message from ${phone}:\n\n${message}\n\n(Reply here — bot is paused for this user)`
  );
}

// ========== TWILIO WEBHOOK HANDLER ==========
export async function POST(request) {
  try {
    const contentType = request.headers.get('content-type') || '';

    let body, from, incomingMsg;

    if (contentType.includes('application/x-www-form-urlencoded')) {
      // Twilio webhook sends form-encoded
      const formData = await request.formData();
      body = Object.fromEntries(formData);
      from = body.From || '';
      incomingMsg = (body.Body || '').trim();
    } else {
      // JSON fallback (for testing)
      body = await request.json();
      from = body.From || body.from || '';
      incomingMsg = (body.Body || body.message || '').trim();
    }

    if (!from || !incomingMsg) {
      return NextResponse.json({ error: 'Missing From or Body' }, { status: 400 });
    }

    const phone = from.replace('whatsapp:', '');

    // Anti-abuse checks
    if (isRateLimited(phone)) {
      return new Response(
        '<Response><Message>You\'re sending too many messages. Please wait a moment and try again.</Message></Response>',
        { headers: { 'Content-Type': 'text/xml' } }
      );
    }

    if (isSuspicious(incomingMsg)) {
      return new Response(
        '<Response><Message>I can only help with Workitu Tech services. How can I assist you today?</Message></Response>',
        { headers: { 'Content-Type': 'text/xml' } }
      );
    }

    const session = getSession(phone);

    // Check for HUMAN mode trigger
    if (incomingMsg.toLowerCase() === 'human') {
      session.humanMode = true;
      await sendWhatsApp(from, "I'm connecting you with Yonatan now. He'll reply shortly! 🙌");
      await forwardToOwner(phone, '[User requested to speak with a human]');
      return new Response('<Response></Response>', { headers: { 'Content-Type': 'text/xml' } });
    }

    // If in human mode, forward messages
    if (session.humanMode) {
      await forwardToOwner(phone, incomingMsg);
      return new Response('<Response></Response>', { headers: { 'Content-Type': 'text/xml' } });
    }

    // Check for "bot" to return to bot mode
    if (incomingMsg.toLowerCase() === 'bot') {
      session.humanMode = false;
      session.step = 0;
      session.data = {};
      const msg = "I'm Bee, back at your service! 🐝 What's your name?";
      await sendWhatsApp(from, msg);
      return new Response('<Response></Response>', { headers: { 'Content-Type': 'text/xml' } });
    }

    // Detect language on first message
    if (session.step === 0) {
      session.lang = detectLanguage(incomingMsg);
    }

    const lang = session.lang;

    // Pre-made questions flow
    if (session.step < QUESTIONS.length) {
      const currentQ = QUESTIONS[session.step];

      // Save the answer (except for step 0 which is the greeting trigger)
      if (session.step === 0) {
        // First message — send greeting question
        const greeting = QUESTIONS[0].ask[lang] || QUESTIONS[0].ask.en;
        await sendWhatsApp(from, greeting);
        session.step = 0.5; // waiting for name
        return new Response('<Response></Response>', { headers: { 'Content-Type': 'text/xml' } });
      }

      if (session.step === 0.5) {
        // Got the name
        session.data.name = incomingMsg;
        session.data.phone = phone;
        session.step = 1;
        const nextQ = QUESTIONS[1].ask[lang] || QUESTIONS[1].ask.en;
        await sendWhatsApp(from, nextQ.replace('{name}', session.data.name));
        return new Response('<Response></Response>', { headers: { 'Content-Type': 'text/xml' } });
      }

      // Process answers for steps 1+
      const stepIndex = Math.floor(session.step);
      const q = QUESTIONS[stepIndex];

      if (q.key === 'service') {
        session.data.service = SERVICE_MAP[incomingMsg] || incomingMsg;
      } else {
        session.data[q.key] = incomingMsg;
      }

      session.step = stepIndex + 1;

      // If we've collected all answers
      if (session.step >= QUESTIONS.length) {
        // Final thank you
        const thanks = {
          en: `Thank you, ${session.data.name}! 🎉 Here's a summary of what you told us:\n\n📋 Service: ${session.data.service}\n💼 Business: ${session.data.business}\n🎯 Challenge: ${session.data.challenge}\n📧 Email: ${session.data.email}\n\nWe'll review this and get back to you within 24 hours. If you want to chat with Yonatan directly, just type "HUMAN".`,
          pt: `Obrigado, ${session.data.name}! 🎉 Aqui está o resumo:\n\n📋 Serviço: ${session.data.service}\n💼 Negócio: ${session.data.business}\n🎯 Desafio: ${session.data.challenge}\n📧 Email: ${session.data.email}\n\nVamos analisar e retornar em até 24 horas. Se quiser falar com o Yonatan diretamente, digite "HUMAN".`,
          he: `תודה, ${session.data.name}! 🎉 הנה סיכום:\n\n📋 שירות: ${session.data.service}\n💼 עסק: ${session.data.business}\n🎯 אתגר: ${session.data.challenge}\n📧 מייל: ${session.data.email}\n\nנבדוק ונחזור אליך תוך 24 שעות. אם אתה רוצה לדבר עם יונתן ישירות, הקלד "HUMAN".`,
        };

        await sendWhatsApp(from, thanks[lang] || thanks.en);

        // Send lead to email and notify owner
        await sendLeadEmail(session.data);
        await forwardToOwner(phone, `New lead completed questionnaire:\n${JSON.stringify(session.data, null, 2)}`);

        // Reset for AI chat mode
        session.step = 'ai';
        return new Response('<Response></Response>', { headers: { 'Content-Type': 'text/xml' } });
      }

      // Ask next question
      const nextQ = QUESTIONS[session.step];
      const askText = (nextQ.ask[lang] || nextQ.ask.en).replace('{name}', session.data.name || '');
      await sendWhatsApp(from, askText);
      return new Response('<Response></Response>', { headers: { 'Content-Type': 'text/xml' } });
    }

    // AI mode — after questionnaire or if step is 'ai'
    const aiResponse = await askDeepSeek(incomingMsg, session.data);
    const reply = aiResponse || "I'm having trouble thinking right now. Type HUMAN to speak directly with Yonatan, or try again in a moment.";
    await sendWhatsApp(from, reply);

    return new Response('<Response></Response>', { headers: { 'Content-Type': 'text/xml' } });

  } catch (error) {
    console.error('WhatsApp webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Twilio sends GET for webhook verification
export async function GET() {
  return NextResponse.json({ status: 'Workitu WhatsApp Bot is running' });
}
