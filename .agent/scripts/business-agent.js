const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths
const DATA_DIR = path.join(__dirname, '../../src/data');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json');
const ANALYTICS_FILE = path.join(DATA_DIR, 'analytics.json');
const PORTFOLIO_SCRIPT = path.join(__dirname, 'portfolio-manager.js');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m'
};

function log(message, type = 'info') {
  const color = {
    info: colors.cyan,
    success: colors.green,
    error: colors.red,
    header: colors.bright + colors.yellow
  }[type] || colors.reset;
  
  console.log(`${color}${message}${colors.reset}`);
}

async function runBusinessAgent() {
  log('\n🤖 Business Objectives Agent Initialized...', 'header');

  // --- Rule 1: Get New Clients ---
  log('\n🔍 Checking for New Clients...', 'header');
  if (fs.existsSync(SUBMISSIONS_FILE)) {
    try {
      const submissions = JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, 'utf8'));
      const today = new Date().toISOString().split('T')[0];
      const newClients = submissions.filter(s => s.timestamp.startsWith(today));
      
      log(`   Total Leads Found: ${submissions.length}`);
      if (newClients.length > 0) {
        log(`   🎉 New Clients Today: ${newClients.length}`, 'success');
        newClients.forEach(client => {
          log(`      - ${client.name} (${client.email}): "${client.message.substring(0, 50)}..."`);
        });
      } else {
        log('   No new clients today.', 'info');
      }
    } catch (error) {
      log(`   Error reading submissions: ${error.message}`, 'error');
    }
  } else {
    log('   No submissions database found yet.', 'info');
  }

  // --- Rule 3 & 4: Metrics & Data ---
  log('\n📊 Analyzing User Metrics & Data...', 'header');
  if (fs.existsSync(ANALYTICS_FILE)) {
    try {
      const analytics = JSON.parse(fs.readFileSync(ANALYTICS_FILE, 'utf8'));
      
      const { totalViews, uniqueVisitors, pageViews, projectClicks, topPages } = analytics;
      
      log(`   Total Views: ${totalViews}`, 'success');
      log(`   Unique Visitors: ${uniqueVisitors}`, 'success');
      
      log('   Page Views:');
      Object.entries(pageViews).forEach(([page, count]) => {
        log(`      - ${page}: ${count}`);
      });
      
      const topProjectId = Object.entries(projectClicks).sort(([,a], [,b]) => b - a)[0];
      log(`   Top Project ID: ${topProjectId ? topProjectId[0] : 'None'}`);
      
    } catch (error) {
      log(`   Error reading analytics: ${error.message}`, 'error');
    }
  } else {
    log('   No analytics data found yet.', 'info');
  }

  // --- Rule 2: Display Latest Portfolio ---
  log('\n🖼️  Updating Portfolio Display...', 'header');
  try {
    log('   Running Portfolio Manager...', 'info');
    execSync(`node "${PORTFOLIO_SCRIPT}"`, { stdio: 'inherit' });
    log('   Portfolio update sequence completed.', 'success');
  } catch (error) {
    log(`   Failed to run portfolio manager: ${error.message}`, 'error');
  }

  log('\n✅ Business Objectives Verification Complete.', 'header');
}

runBusinessAgent();
