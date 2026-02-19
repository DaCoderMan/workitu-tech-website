/**
 * Firestore-backed data layer for serverless compatibility.
 * Replaces filesystem JSON storage (which fails on Vercel's read-only runtime).
 *
 * Falls back to local JSON files when Firebase is not configured (local dev).
 */

import { getDb } from './firebase-admin';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isFirebaseConfigured(): boolean {
  return !!(
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
  );
}

// ---------------------------------------------------------------------------
// SUBMISSIONS (contact form)
// ---------------------------------------------------------------------------

export interface Submission {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  ip: string;
}

export async function saveSubmission(submission: Submission): Promise<void> {
  if (!isFirebaseConfigured()) {
    console.warn('[firestore-data] Firebase not configured – submission not persisted');
    return;
  }
  const db = getDb();
  await db.collection('submissions').doc(submission.id).set(submission);
}

export async function getSubmissions(): Promise<Submission[]> {
  if (!isFirebaseConfigured()) return [];
  try {
    const db = getDb();
    const snap = await db.collection('submissions').orderBy('timestamp', 'desc').get();
    return snap.docs.map((d) => d.data() as Submission);
  } catch (err) {
    console.error('[firestore-data] Error fetching submissions:', (err as Error).message);
    return [];
  }
}

// ---------------------------------------------------------------------------
// PROJECTS
// ---------------------------------------------------------------------------

export interface Project {
  id: string;
  title: string;
  title_he?: string;
  description: string;
  description_he?: string;
  image: string;
  link: string;
  category: string;
  dateAdded: string;
  featured: boolean;
  isWebsite?: boolean;
  websiteUrl?: string;
  isVideo?: boolean;
  videoId?: string;
  lastUpdated?: string;
}

const PROJECTS_COLLECTION = 'projects';

async function readLocalJson<T>(relativePath: string, fallback: T): Promise<T> {
  try {
    const fs = await import('fs');
    const path = await import('path');
    const file = path.join(process.cwd(), ...relativePath.split('/'));
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return fallback;
  }
}

export async function getProjects(): Promise<Project[]> {
  if (!isFirebaseConfigured()) {
    return readLocalJson<Project[]>('src/data/projects.json', []);
  }
  try {
    const db = getDb();
    const snap = await db.collection(PROJECTS_COLLECTION).orderBy('dateAdded', 'desc').get();
    if (snap.empty) {
      // First run: seed from bundled JSON
      const data = await readLocalJson<Project[]>('src/data/projects.json', []);
      for (const p of data) {
        await db.collection(PROJECTS_COLLECTION).doc(p.id).set(p);
      }
      return data;
    }
    return snap.docs.map((d) => d.data() as Project);
  } catch (err) {
    console.error('[firestore-data] Error fetching projects, falling back to local:', (err as Error).message);
    return readLocalJson<Project[]>('src/data/projects.json', []);
  }
}

export async function saveProject(project: Project): Promise<void> {
  if (!isFirebaseConfigured()) {
    console.warn('[firestore-data] Firebase not configured – project not persisted');
    return;
  }
  const db = getDb();
  await db.collection(PROJECTS_COLLECTION).doc(project.id).set(project, { merge: true });
}

export async function deleteProject(id: string): Promise<boolean> {
  if (!isFirebaseConfigured()) return false;
  const db = getDb();
  const doc = await db.collection(PROJECTS_COLLECTION).doc(id).get();
  if (!doc.exists) return false;
  await db.collection(PROJECTS_COLLECTION).doc(id).delete();
  return true;
}

// ---------------------------------------------------------------------------
// CONTENT (page content)
// ---------------------------------------------------------------------------

export interface SiteContent {
  [page: string]: Record<string, any>;
}

const CONTENT_DOC = 'site-content';
const CONTENT_COLLECTION = 'config';

export async function getContent(): Promise<SiteContent> {
  const defaultContent: SiteContent = {
    home: {
      title: 'Workitu Tech \u2013 Where Imagination Meets Innovation',
      subtitle: 'Workitu Tech creates digital experiences that inspire and perform.',
      description: 'We craft sophisticated websites, AI-powered apps, and e-commerce platforms that help your ideas shine online.',
      mission: '\u2728 Gen AI works for you and me \u2014 turning creativity into code, and vision into reality. Our mission is simple: deliver world-class technology at a fair price, built with care, passion, and precision.',
      services: 'From sleek web design to smart automation, from marketing strategy to digital growth \u2014 Workitu Tech is your partner in building the future.',
      tagline: "Because the web isn\u2019t just where you exist \u2014 \uD83C\uDF0D It\u2019s where your story begins.",
    },
    pricing: {
      title: '\uD83D\uDCB0 Fair Prices. Real Value. Infinite Possibilities.',
      subtitle: 'At Workitu Tech, we believe great technology should be accessible to everyone.',
      description: 'We offer transparent, flexible pricing \u2014 built around your goals, not just your budget.',
      services: [],
      promise: '\uD83D\uDCA1 Our promise: fair pricing, honest communication, and results that last.',
    },
    contact: {
      title: "Let\u2019s Build Something Amazing Together",
      subtitle: 'Ready to turn your vision into reality?',
      description: "Get in touch with us to discuss your project, ask questions, or just say hello. We\u2019re here to help you succeed.",
      email: 'contact@workitu.com',
      linkedin: 'https://www.linkedin.com/in/jonsamper',
    },
  };

  if (!isFirebaseConfigured()) {
    return readLocalJson<SiteContent>('src/data/content.json', defaultContent);
  }

  try {
    const db = getDb();
    const doc = await db.collection(CONTENT_COLLECTION).doc(CONTENT_DOC).get();
    if (!doc.exists) {
      // Seed from bundled JSON or default
      const content = await readLocalJson<SiteContent>('src/data/content.json', defaultContent);
      await db.collection(CONTENT_COLLECTION).doc(CONTENT_DOC).set(content);
      return content;
    }
    return doc.data() as SiteContent;
  } catch (err) {
    console.error('[firestore-data] Error fetching content, falling back to local:', (err as Error).message);
    return readLocalJson<SiteContent>('src/data/content.json', defaultContent);
  }
}

export async function saveContent(content: SiteContent): Promise<void> {
  if (!isFirebaseConfigured()) {
    console.warn('[firestore-data] Firebase not configured – content not persisted');
    return;
  }
  const db = getDb();
  await db.collection(CONTENT_COLLECTION).doc(CONTENT_DOC).set(content);
}

// ---------------------------------------------------------------------------
// ANALYTICS
// ---------------------------------------------------------------------------

export interface AnalyticsData {
  totalViews: number;
  uniqueVisitors: number;
  pageViews: Record<string, number>;
  projectClicks: Record<string, number>;
  deviceTypes: Record<string, number>;
  referrers: Record<string, number>;
  dailyStats: Record<string, { views: number; uniqueVisitors: number }>;
  lastUpdated: string;
}

const ANALYTICS_DOC = 'site-analytics';

function defaultAnalytics(): AnalyticsData {
  return {
    totalViews: 0,
    uniqueVisitors: 0,
    pageViews: { home: 0, portfolio: 0, pricing: 0, contact: 0 },
    projectClicks: {},
    deviceTypes: { desktop: 0, mobile: 0, tablet: 0 },
    referrers: {},
    dailyStats: {},
    lastUpdated: new Date().toISOString(),
  };
}

export async function getAnalytics(): Promise<AnalyticsData> {
  if (!isFirebaseConfigured()) return defaultAnalytics();
  try {
    const db = getDb();
    const doc = await db.collection(CONTENT_COLLECTION).doc(ANALYTICS_DOC).get();
    if (!doc.exists) return defaultAnalytics();
    return doc.data() as AnalyticsData;
  } catch (err) {
    console.error('[firestore-data] Error fetching analytics:', (err as Error).message);
    return defaultAnalytics();
  }
}

export async function saveAnalytics(data: AnalyticsData): Promise<void> {
  if (!isFirebaseConfigured()) return;
  data.lastUpdated = new Date().toISOString();
  const db = getDb();
  await db.collection(CONTENT_COLLECTION).doc(ANALYTICS_DOC).set(data);
}

// ---------------------------------------------------------------------------
// RESET TOKENS
// ---------------------------------------------------------------------------

export interface ResetToken {
  email: string;
  token: string;
  expiry: number;
  createdAt: string;
}

const RESET_TOKENS_COLLECTION = 'reset-tokens';

export async function saveResetToken(data: ResetToken): Promise<void> {
  if (!isFirebaseConfigured()) {
    console.warn('[firestore-data] Firebase not configured – reset token not persisted');
    return;
  }
  const db = getDb();
  await db.collection(RESET_TOKENS_COLLECTION).doc(data.token).set(data);
}

export async function getResetToken(token: string): Promise<ResetToken | null> {
  if (!isFirebaseConfigured()) return null;
  const db = getDb();
  const doc = await db.collection(RESET_TOKENS_COLLECTION).doc(token).get();
  if (!doc.exists) return null;
  return doc.data() as ResetToken;
}

export async function deleteResetToken(token: string): Promise<void> {
  if (!isFirebaseConfigured()) return;
  const db = getDb();
  await db.collection(RESET_TOKENS_COLLECTION).doc(token).delete();
}
