/**
 * Seed Firestore with data from local JSON files.
 * Run: node scripts/seed-firestore.js
 *
 * Requires .env.local with FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY
 */

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const fs = require('fs');
const path = require('path');

// Load .env.local manually
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx === -1) continue;
  const key = trimmed.slice(0, eqIdx);
  let value = trimmed.slice(eqIdx + 1);
  // Strip surrounding quotes
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    value = value.slice(1, -1);
  }
  process.env[key] = value;
}

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

if (!projectId || !clientEmail || !privateKey) {
  console.error('Missing Firebase credentials in .env.local');
  process.exit(1);
}

console.log(`Connecting to Firestore project: ${projectId}`);
console.log(`Using service account: ${clientEmail}`);

const app = initializeApp({
  credential: cert({ projectId, clientEmail, privateKey }),
});

const db = getFirestore(app);

async function seedCollection(collectionName, dataFile, idField = 'id') {
  const filePath = path.join(__dirname, '..', 'src', 'data', dataFile);
  if (!fs.existsSync(filePath)) {
    console.log(`  Skipping ${collectionName}: ${dataFile} not found`);
    return;
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (Array.isArray(data)) {
    console.log(`  Seeding ${collectionName} with ${data.length} documents...`);
    for (const item of data) {
      const docId = item[idField] || item.id || String(Date.now());
      await db.collection(collectionName).doc(String(docId)).set(item);
    }
  } else {
    // Single document (like content.json)
    console.log(`  Seeding ${collectionName} as single document...`);
    await db.collection(collectionName).doc(collectionName === 'config' ? 'site-content' : collectionName).set(data);
  }
  console.log(`  Done: ${collectionName}`);
}

async function main() {
  console.log('\nSeeding Firestore...\n');

  await seedCollection('projects', 'projects.json');
  await seedCollection('config', 'content.json');

  // Check if submissions.json has data
  const submissionsPath = path.join(__dirname, '..', 'src', 'data', 'submissions.json');
  if (fs.existsSync(submissionsPath)) {
    const submissions = JSON.parse(fs.readFileSync(submissionsPath, 'utf8'));
    if (Array.isArray(submissions) && submissions.length > 0) {
      await seedCollection('submissions', 'submissions.json');
    } else {
      console.log('  Skipping submissions: empty');
    }
  }

  console.log('\nFirestore seeding complete!');
  process.exit(0);
}

main().catch((err) => {
  console.error('Seeding failed:', err.message);
  process.exit(1);
});
