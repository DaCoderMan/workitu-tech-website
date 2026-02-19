/**
 * Analytics utility — Firestore-backed for serverless compatibility.
 * No filesystem operations at module import time.
 */

import { getAnalytics as fetchAnalytics, saveAnalytics as persistAnalytics } from '../lib/firestore-data';

export async function getAnalytics() {
  return await fetchAnalytics();
}

export async function saveAnalytics(analytics) {
  await persistAnalytics(analytics);
  return true;
}

export async function trackPageView(page, userAgent, referrer) {
  const analytics = await getAnalytics();

  analytics.totalViews += 1;

  if (analytics.pageViews[page] !== undefined) {
    analytics.pageViews[page] += 1;
  }

  const deviceType = getDeviceType(userAgent);
  if (analytics.deviceTypes[deviceType] !== undefined) {
    analytics.deviceTypes[deviceType] += 1;
  }

  if (referrer && referrer !== '') {
    try {
      const domain = new URL(referrer).hostname;
      analytics.referrers[domain] = (analytics.referrers[domain] || 0) + 1;
    } catch { /* invalid URL */ }
  }

  const today = new Date().toISOString().split('T')[0];
  if (!analytics.dailyStats[today]) {
    analytics.dailyStats[today] = { views: 0, uniqueVisitors: 0 };
  }
  analytics.dailyStats[today].views += 1;

  await saveAnalytics(analytics);
  return analytics;
}

export async function trackProjectClick(projectId) {
  const analytics = await getAnalytics();

  if (!analytics.projectClicks[projectId]) {
    analytics.projectClicks[projectId] = 0;
  }
  analytics.projectClicks[projectId] += 1;

  await saveAnalytics(analytics);
  return analytics;
}

export async function trackUniqueVisitor() {
  const analytics = await getAnalytics();
  analytics.uniqueVisitors += 1;

  const today = new Date().toISOString().split('T')[0];
  if (!analytics.dailyStats[today]) {
    analytics.dailyStats[today] = { views: 0, uniqueVisitors: 0 };
  }
  analytics.dailyStats[today].uniqueVisitors += 1;

  await saveAnalytics(analytics);
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

export async function getAnalyticsSummary() {
  const analytics = await getAnalytics();

  const topPages = Object.entries(analytics.pageViews)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 4);

  const topProjects = Object.entries(analytics.projectClicks)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const recentDays = Object.entries(analytics.dailyStats)
    .sort(([a], [b]) => new Date(b) - new Date(a))
    .slice(0, 7);

  return {
    ...analytics,
    topPages,
    topProjects,
    recentDays,
  };
}
