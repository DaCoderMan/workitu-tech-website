import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const ANALYTICS_FILE = path.join(DATA_DIR, 'analytics.json');

function getDefaultAnalytics() {
  return {
    totalViews: 0,
    uniqueVisitors: 0,
    pageViews: { home: 0, portfolio: 0, pricing: 0, contact: 0 },
    projectClicks: {},
    deviceTypes: { desktop: 0, mobile: 0, tablet: 0 },
    referrers: {},
    dailyStats: {},
    lastUpdated: new Date().toISOString()
  };
}

function ensureAnalyticsFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(ANALYTICS_FILE)) {
      fs.writeFileSync(
        ANALYTICS_FILE,
        JSON.stringify(getDefaultAnalytics(), null, 2)
      );
    }
  } catch (error) {
    console.error('Error ensuring analytics file:', error);
  }
}

function readAnalytics() {
  ensureAnalyticsFile();
  try {
    const data = fs.readFileSync(ANALYTICS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading analytics.json:', error);
    return getDefaultAnalytics();
  }
}

function writeAnalytics(data) {
  try {
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing analytics.json:', error);
  }
}

// Persisted analytics storage (keeps in-memory copy for speed)
let analyticsData = readAnalytics();

export function getAnalytics() {
  return { ...analyticsData };
}

export function saveAnalytics(analytics) {
  try {
    analytics.lastUpdated = new Date().toISOString();
    analyticsData = { ...analytics };
    writeAnalytics(analyticsData);
    return true;
  } catch (error) {
    console.error('Error saving analytics:', error);
    return false;
  }
}

export function trackPageView(page, userAgent, referrer) {
  const analytics = getAnalytics();
  
  // Increment total views
  analytics.totalViews += 1;
  
  // Track page views
  if (analytics.pageViews[page]) {
    analytics.pageViews[page] += 1;
  }
  
  // Track device type
  const deviceType = getDeviceType(userAgent);
  if (analytics.deviceTypes[deviceType]) {
    analytics.deviceTypes[deviceType] += 1;
  }
  
  // Track referrer
  if (referrer && referrer !== '') {
    const domain = new URL(referrer).hostname;
    analytics.referrers[domain] = (analytics.referrers[domain] || 0) + 1;
  }
  
  // Track daily stats
  const today = new Date().toISOString().split('T')[0];
  if (!analytics.dailyStats[today]) {
    analytics.dailyStats[today] = { views: 0, uniqueVisitors: 0 };
  }
  analytics.dailyStats[today].views += 1;
  
  saveAnalytics(analytics);
  return analytics;
}

export function trackProjectClick(projectId) {
  const analytics = getAnalytics();
  
  if (!analytics.projectClicks[projectId]) {
    analytics.projectClicks[projectId] = 0;
  }
  analytics.projectClicks[projectId] += 1;
  
  saveAnalytics(analytics);
  return analytics;
}

export function trackUniqueVisitor() {
  const analytics = getAnalytics();
  analytics.uniqueVisitors += 1;
  
  // Track daily unique visitors
  const today = new Date().toISOString().split('T')[0];
  if (!analytics.dailyStats[today]) {
    analytics.dailyStats[today] = { views: 0, uniqueVisitors: 0 };
  }
  analytics.dailyStats[today].uniqueVisitors += 1;
  
  saveAnalytics(analytics);
  return analytics;
}

function getDeviceType(userAgent) {
  if (!userAgent) return 'desktop';
  
  const ua = userAgent.toLowerCase();
  if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
    return 'mobile';
  } else if (ua.includes('tablet') || ua.includes('ipad')) {
    return 'tablet';
  }
  return 'desktop';
}

export function getAnalyticsSummary() {
  const analytics = getAnalytics();
  
  // Get top pages
  const topPages = Object.entries(analytics.pageViews)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 4);
  
  // Get top projects
  const topProjects = Object.entries(analytics.projectClicks)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);
  
  // Get recent daily stats
  const recentDays = Object.entries(analytics.dailyStats)
    .sort(([a], [b]) => new Date(b) - new Date(a))
    .slice(0, 7);
  
  return {
    ...analytics,
    topPages,
    topProjects,
    recentDays
  };
}
