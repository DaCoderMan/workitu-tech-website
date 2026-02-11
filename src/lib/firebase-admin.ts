import { initializeApp, getApps, cert, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

let db: Firestore;

function getFirebaseAdmin(): App {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (projectId && clientEmail && privateKey) {
    return initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
    });
  }

  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return initializeApp();
  }

  throw new Error(
    'Firebase Admin SDK not configured. Set FIREBASE_PROJECT_ID, ' +
    'FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY, or set ' +
    'GOOGLE_APPLICATION_CREDENTIALS to a service account JSON path.'
  );
}

export function getDb(): Firestore {
  if (!db) {
    const app = getFirebaseAdmin();
    db = getFirestore(app);
  }
  return db;
}
