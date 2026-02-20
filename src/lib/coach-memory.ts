// Scorpio Memory System - Persistent, agentic memory for Yonatan
// Fixes: cold-start amnesia, commitment tracking, richer context

const MONGO_URI = process.env.MONGO_URI || '';

export interface ConversationEntry {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface LearnedFact {
  category: string;
  fact: string;
  learnedAt: Date;
  source: string;
}

interface Commitment {
  text: string;        // What they committed to
  madeAt: Date;        // When they said it
  followedUpAt?: Date; // When we checked
  fulfilled?: boolean; // Did they do it?
}

interface MoodEntry {
  mood: string;
  energy: number;
  timestamp: Date;
  context?: string;
}

interface ProgressEntry {
  metric: string;
  value: number | string;
  timestamp: Date;
  note?: string;
}

interface CoachMemory {
  chatId: string;
  conversations: ConversationEntry[];
  learnedFacts: LearnedFact[];
  commitments: Commitment[];
  moodHistory: MoodEntry[];
  progressLog: ProgressEntry[];
  lastInteraction: Date;
  totalMessages: number;
  updatedAt: Date;
}

// ============================================================
// MongoDB connection
// ============================================================

let mongoClientPromise: Promise<any> | null = null;

async function getMongoClient() {
  if (!MONGO_URI) return null;
  try {
    const { MongoClient } = await import('mongodb');
    if (!mongoClientPromise) {
      const client = new MongoClient(MONGO_URI);
      mongoClientPromise = client.connect();
    }
    return mongoClientPromise;
  } catch {
    return null;
  }
}

async function getCollection() {
  const client = await getMongoClient();
  if (!client) return null;
  const db = client.db('workitu-coach');
  return db.collection('coach-memory');
}

// ============================================================
// Core memory operations
// ============================================================

export async function loadMemory(chatId: string): Promise<CoachMemory | null> {
  try {
    const col = await getCollection();
    if (!col) return null;
    return await col.findOne({ chatId }) as CoachMemory | null;
  } catch (e) {
    console.error('loadMemory error:', e);
    return null;
  }
}

export async function saveConversation(
  chatId: string,
  role: 'user' | 'assistant',
  content: string
): Promise<void> {
  try {
    const col = await getCollection();
    if (!col) return;

    const entry: ConversationEntry = { role, content, timestamp: new Date() };

    await col.updateOne(
      { chatId },
      {
        $push: {
          conversations: { $each: [entry], $slice: -300 }, // Keep last 300 messages
        },
        $set: { lastInteraction: new Date(), updatedAt: new Date() },
        $inc: { totalMessages: 1 },
        $setOnInsert: {
          chatId,
          learnedFacts: [],
          commitments: [],
          moodHistory: [],
          progressLog: [],
        },
      },
      { upsert: true }
    );
  } catch (e) {
    console.error('saveConversation error:', e);
  }
}

export async function learnFact(
  chatId: string,
  category: string,
  fact: string,
  source: string
): Promise<void> {
  try {
    const col = await getCollection();
    if (!col) return;
    await col.updateOne(
      { chatId },
      {
        $push: {
          learnedFacts: {
            $each: [{ category, fact, learnedAt: new Date(), source }],
            $slice: -150,
          },
        },
        $set: { updatedAt: new Date() },
      },
      { upsert: true }
    );
  } catch (e) {
    console.error('learnFact error:', e);
  }
}

export async function saveCommitment(chatId: string, text: string): Promise<void> {
  try {
    const col = await getCollection();
    if (!col) return;
    await col.updateOne(
      { chatId },
      {
        $push: {
          commitments: {
            $each: [{ text, madeAt: new Date() }],
            $slice: -20, // Keep last 20 commitments
          },
        },
        $set: { updatedAt: new Date() },
      },
      { upsert: true }
    );
  } catch (e) {
    console.error('saveCommitment error:', e);
  }
}

export async function getUnfollowedCommitments(chatId: string): Promise<Commitment[]> {
  try {
    const memory = await loadMemory(chatId);
    if (!memory?.commitments) return [];
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return memory.commitments.filter(
      c => !c.followedUpAt && new Date(c.madeAt) < oneDayAgo
    );
  } catch {
    return [];
  }
}

export async function markCommitmentFollowedUp(chatId: string, commitmentText: string): Promise<void> {
  try {
    const col = await getCollection();
    if (!col) return;
    await col.updateOne(
      { chatId, 'commitments.text': commitmentText },
      { $set: { 'commitments.$.followedUpAt': new Date() } }
    );
  } catch (e) {
    console.error('markCommitmentFollowedUp error:', e);
  }
}

export async function logMood(chatId: string, mood: string, energy: number, context?: string): Promise<void> {
  try {
    const col = await getCollection();
    if (!col) return;
    await col.updateOne(
      { chatId },
      {
        $push: {
          moodHistory: {
            $each: [{ mood, energy, timestamp: new Date(), context }],
            $slice: -90,
          },
        },
        $set: { updatedAt: new Date() },
      },
      { upsert: true }
    );
  } catch (e) {
    console.error('logMood error:', e);
  }
}

export async function logProgress(chatId: string, metric: string, value: number | string, note?: string): Promise<void> {
  try {
    const col = await getCollection();
    if (!col) return;
    await col.updateOne(
      { chatId },
      {
        $push: {
          progressLog: {
            $each: [{ metric, value, timestamp: new Date(), note }],
            $slice: -200,
          },
        },
        $set: { updatedAt: new Date() },
      },
      { upsert: true }
    );
  } catch (e) {
    console.error('logProgress error:', e);
  }
}

// ============================================================
// Load full conversation history for cold-start recovery
// This is the fix for the repetition/amnesia problem
// ============================================================

export async function loadConversationHistory(chatId: string, limit = 40): Promise<ConversationEntry[]> {
  try {
    const memory = await loadMemory(chatId);
    if (!memory?.conversations) return [];
    return memory.conversations.slice(-limit);
  } catch {
    return [];
  }
}

// ============================================================
// Build AI context from memory
// ============================================================

export async function buildMemoryContext(chatId: string): Promise<string> {
  const memory = await loadMemory(chatId);
  if (!memory) return '[No memory yet — first conversation]';

  const parts: string[] = [];

  // Total history stats
  const totalMsgs = memory.totalMessages || 0;
  const lastTalked = memory.lastInteraction
    ? new Date(memory.lastInteraction).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
    : 'never';
  parts.push(`[We've exchanged ${totalMsgs} messages total. Last talked: ${lastTalked}]`);

  // Pending commitments (most important — drives follow-up)
  const pendingCommitments = memory.commitments?.filter(c => !c.followedUpAt) || [];
  if (pendingCommitments.length > 0) {
    parts.push('\n⚠️ PENDING COMMITMENTS (he said he would do these — CHECK on them):');
    for (const c of pendingCommitments.slice(-5)) {
      const when = new Date(c.madeAt).toLocaleDateString();
      parts.push(`- "${c.text}" (committed on ${when})`);
    }
  }

  // Learned facts grouped by category
  if (memory.learnedFacts?.length > 0) {
    parts.push('\n📚 What I know about Yonatan (learned from conversations):');
    const grouped: Record<string, string[]> = {};
    for (const fact of memory.learnedFacts) {
      if (!grouped[fact.category]) grouped[fact.category] = [];
      grouped[fact.category].push(fact.fact);
    }
    for (const cat of Object.keys(grouped)) {
      // Only show most recent 3 per category to avoid bloat
      const recent = grouped[cat].slice(-3);
      parts.push(`  ${cat}: ${recent.join(' | ')}`);
    }
  }

  // Recent mood pattern
  if (memory.moodHistory?.length > 0) {
    const recent = memory.moodHistory.slice(-5);
    const moods = recent.map(m => m.mood).join(', ');
    const avgEnergy = (recent.reduce((s, m) => s + m.energy, 0) / recent.length).toFixed(1);
    parts.push(`\n😶 Recent mood: ${moods} (avg energy ${avgEnergy}/10)`);
  }

  // Recent progress
  if (memory.progressLog?.length > 0) {
    const recent = memory.progressLog.slice(-5);
    parts.push('\n📈 Recent progress:');
    for (const e of recent) {
      parts.push(`  - ${e.metric}: ${e.value}${e.note ? ` (${e.note})` : ''}`);
    }
  }

  // Last 20 messages for full conversation continuity
  if (memory.conversations?.length > 0) {
    const recent = memory.conversations.slice(-20);
    parts.push('\n💬 Our recent conversation (use this to NOT repeat yourself):');
    for (const msg of recent) {
      const who = msg.role === 'user' ? 'Yonatan' : 'Scorpio';
      parts.push(`${who}: ${msg.content.slice(0, 200)}${msg.content.length > 200 ? '...' : ''}`);
    }
  }

  return parts.join('\n');
}

// ============================================================
// Detect commitments in user messages
// Patterns: "I will...", "I'll...", "Tomorrow I...", "Going to...", "I'm going to..."
// ============================================================

export function detectCommitments(message: string): string[] {
  const commitments: string[] = [];
  const sentences = message.split(/[.!?]/);

  for (const sentence of sentences) {
    const s = sentence.trim();
    if (!s) continue;
    if (s.match(/i('ll| will| am going to| gonna| plan to| promise to| commit to)/i)) {
      // Filter out very short/vague ones
      if (s.length > 15 && s.length < 200) {
        commitments.push(s);
      }
    }
    if (s.match(/^(tomorrow|today|tonight|this week|by friday).*(i|i'll|will|going to)/i)) {
      if (s.length > 15) commitments.push(s);
    }
  }

  return commitments;
}

// ============================================================
// Extract learning signals from user messages
// ============================================================

export function extractLearningSignals(message: string): { category: string; fact: string }[] {
  const signals: { category: string; fact: string }[] = [];
  const lower = message.toLowerCase();

  if (lower.match(/feeling (great|good|amazing|awesome|fantastic|happy)/)) {
    signals.push({ category: 'mood_pattern', fact: `Reported feeling positive: "${message.slice(0, 60)}"` });
  }
  if (lower.match(/feeling (bad|down|sad|depressed|low|terrible|rough)/)) {
    signals.push({ category: 'mood_pattern', fact: `Reported feeling low: "${message.slice(0, 60)}"` });
  }
  if (lower.match(/tired|exhausted|no energy|burnt out/)) {
    signals.push({ category: 'health', fact: 'Reported being tired/exhausted' });
  }
  if (lower.match(/sent (\d+) message|(\d+) outreach|(\d+) leads/)) {
    const match = lower.match(/(\d+)/);
    if (match) signals.push({ category: 'business', fact: `Sent ${match[1]} outreach messages` });
  }
  if (lower.match(/got a (response|reply|call|meeting|lead|client)/)) {
    signals.push({ category: 'business', fact: 'Got a response/lead from outreach' });
  }
  if (lower.match(/signed|new client|deal|paid|payment|invoice/)) {
    signals.push({ category: 'business', fact: 'Mentioned client/deal/payment activity' });
  }
  if (lower.match(/milan.*(sick|school|birthday|walked|talked|first)/)) {
    signals.push({ category: 'family', fact: `Milan milestone: "${message.slice(0, 80)}"` });
  }
  if (lower.match(/back pain|spine|doctor|medication|meds|episode/)) {
    signals.push({ category: 'health', fact: `Health mention: "${message.slice(0, 80)}"` });
  }
  if (lower.match(/i (hate|love|prefer|always|never|usually)/)) {
    signals.push({ category: 'preference', fact: `Preference stated: "${message.slice(0, 80)}"` });
  }

  return signals;
}
