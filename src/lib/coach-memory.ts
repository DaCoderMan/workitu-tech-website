// Coach Memory System - Persistent learning about Yonatan
// Stores conversation history, learned facts, mood patterns, and progress tracking

const MONGO_URI = process.env.MONGO_URI || '';

interface ConversationEntry {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface LearnedFact {
  category: string; // 'preference', 'life_event', 'health', 'family', 'mood_pattern', 'business', 'goal', 'fear', 'strength'
  fact: string;
  learnedAt: Date;
  source: string; // what message led to learning this
}

interface MoodEntry {
  mood: string;
  energy: number; // 1-10
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
  moodHistory: MoodEntry[];
  progressLog: ProgressEntry[];
  lastInteraction: Date;
  totalSessions: number;
  updatedAt: Date;
}

// ============================================================
// MongoDB helpers using native driver via fetch to Atlas Data API
// We use a simple approach: store/retrieve from MongoDB Atlas
// ============================================================

let mongoClientPromise: Promise<any> | null = null;

async function getMongoClient() {
  if (!MONGO_URI) return null;

  try {
    // Dynamic import to avoid issues if mongodb package isn't installed
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
  return db.collection<CoachMemory>('coach-memory');
}

// ============================================================
// Public API
// ============================================================

export async function loadMemory(chatId: string): Promise<CoachMemory | null> {
  try {
    const col = await getCollection();
    if (!col) return null;
    const doc = await col.findOne({ chatId });
    return doc || null;
  } catch (e) {
    console.error('Failed to load memory:', e);
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

    const entry: ConversationEntry = {
      role,
      content,
      timestamp: new Date(),
    };

    await col.updateOne(
      { chatId },
      {
        $push: {
          conversations: {
            $each: [entry],
            $slice: -200, // Keep last 200 messages
          },
        },
        $set: { lastInteraction: new Date(), updatedAt: new Date() },
        $inc: { totalSessions: role === 'user' ? 1 : 0 },
        $setOnInsert: {
          chatId,
          learnedFacts: [],
          moodHistory: [],
          progressLog: [],
        },
      },
      { upsert: true }
    );
  } catch (e) {
    console.error('Failed to save conversation:', e);
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
            $each: [{
              category,
              fact,
              learnedAt: new Date(),
              source,
            }],
            $slice: -100, // Keep last 100 facts
          },
        },
        $set: { updatedAt: new Date() },
      },
      { upsert: true }
    );
  } catch (e) {
    console.error('Failed to learn fact:', e);
  }
}

export async function logMood(
  chatId: string,
  mood: string,
  energy: number,
  context?: string
): Promise<void> {
  try {
    const col = await getCollection();
    if (!col) return;

    await col.updateOne(
      { chatId },
      {
        $push: {
          moodHistory: {
            $each: [{
              mood,
              energy,
              timestamp: new Date(),
              context,
            }],
            $slice: -60, // Keep last 60 mood entries (2 months of daily)
          },
        },
        $set: { updatedAt: new Date() },
      },
      { upsert: true }
    );
  } catch (e) {
    console.error('Failed to log mood:', e);
  }
}

export async function logProgress(
  chatId: string,
  metric: string,
  value: number | string,
  note?: string
): Promise<void> {
  try {
    const col = await getCollection();
    if (!col) return;

    await col.updateOne(
      { chatId },
      {
        $push: {
          progressLog: {
            $each: [{
              metric,
              value,
              timestamp: new Date(),
              note,
            }],
            $slice: -200,
          },
        },
        $set: { updatedAt: new Date() },
      },
      { upsert: true }
    );
  } catch (e) {
    console.error('Failed to log progress:', e);
  }
}

/**
 * Build a context string from memory for the AI prompt
 * This is what makes the bot actually remember and learn
 */
export async function buildMemoryContext(chatId: string): Promise<string> {
  const memory = await loadMemory(chatId);
  if (!memory) return '[No persistent memory yet - this is a fresh start]';

  const parts: string[] = [];

  // Learned facts
  if (memory.learnedFacts?.length > 0) {
    parts.push('## Things I\'ve learned about Yonatan from our conversations:');
    const grouped = new Map<string, string[]>();
    for (const fact of memory.learnedFacts) {
      const existing = grouped.get(fact.category) || [];
      existing.push(fact.fact);
      grouped.set(fact.category, existing);
    }
    for (const [category, facts] of grouped) {
      parts.push(`**${category}**: ${facts.join('; ')}`);
    }
  }

  // Recent mood pattern
  if (memory.moodHistory?.length > 0) {
    const recent = memory.moodHistory.slice(-7);
    const avgEnergy = recent.reduce((sum, m) => sum + m.energy, 0) / recent.length;
    const moods = recent.map(m => m.mood).join(', ');
    parts.push(`\n## Recent mood pattern (last ${recent.length} check-ins):`);
    parts.push(`Moods: ${moods}`);
    parts.push(`Average energy: ${avgEnergy.toFixed(1)}/10`);
  }

  // Progress metrics
  if (memory.progressLog?.length > 0) {
    const recent = memory.progressLog.slice(-10);
    parts.push('\n## Recent progress:');
    for (const entry of recent) {
      const date = new Date(entry.timestamp).toLocaleDateString();
      parts.push(`- ${date}: ${entry.metric} = ${entry.value}${entry.note ? ` (${entry.note})` : ''}`);
    }
  }

  // Recent conversation topics (last 10 messages for context)
  if (memory.conversations?.length > 0) {
    const recent = memory.conversations.slice(-10);
    parts.push('\n## Our recent conversation:');
    for (const msg of recent) {
      const prefix = msg.role === 'user' ? 'Yonatan' : 'Coach';
      parts.push(`${prefix}: ${msg.content.slice(0, 150)}${msg.content.length > 150 ? '...' : ''}`);
    }
  }

  parts.push(`\nTotal sessions: ${memory.totalSessions || 0}`);
  parts.push(`Last talked: ${memory.lastInteraction ? new Date(memory.lastInteraction).toLocaleDateString() : 'never'}`);

  return parts.join('\n');
}

/**
 * Extract things to learn from a user message
 * The AI will do the heavy lifting, but we can catch obvious patterns
 */
export function extractLearningSignals(message: string): { category: string; fact: string }[] {
  const signals: { category: string; fact: string }[] = [];
  const lower = message.toLowerCase();

  // Mood/energy signals
  if (lower.match(/feeling (great|good|amazing|awesome|fantastic)/)) {
    signals.push({ category: 'mood_pattern', fact: 'Was feeling great/positive' });
  }
  if (lower.match(/feeling (bad|down|sad|depressed|low|terrible)/)) {
    signals.push({ category: 'mood_pattern', fact: 'Was feeling down/low' });
  }
  if (lower.match(/tired|exhausted|no energy|burnt out|burnout/)) {
    signals.push({ category: 'health', fact: 'Reported being tired/exhausted' });
  }

  // Progress signals
  if (lower.match(/sent (\d+) message|(\d+) outreach/)) {
    const match = lower.match(/(\d+)/);
    if (match) signals.push({ category: 'business', fact: `Sent ${match[1]} outreach messages` });
  }
  if (lower.match(/got a (response|reply|call|meeting|lead)/)) {
    signals.push({ category: 'business', fact: 'Got a response/lead from outreach' });
  }
  if (lower.match(/signed|client|deal|paid|payment|invoice/)) {
    signals.push({ category: 'business', fact: 'Mentioned client/deal/payment activity' });
  }

  // Life events
  if (lower.match(/milan.*(sick|school|birthday|first|walking|talking)/)) {
    signals.push({ category: 'family', fact: 'Mentioned Milan milestone/event' });
  }
  if (lower.match(/eti.*(happy|upset|birthday|anniversary)/)) {
    signals.push({ category: 'family', fact: 'Mentioned Eti milestone/event' });
  }

  // Health
  if (lower.match(/back pain|spine|doctor|appointment|medication|meds/)) {
    signals.push({ category: 'health', fact: 'Discussed health/medical issue' });
  }

  return signals;
}
