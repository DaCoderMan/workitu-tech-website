'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || typeof window.gtag === 'undefined') return;

    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');

    // Track page views
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }, [pathname, searchParams]);

  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}

export function GoogleTagManager() {
  if (!GTM_ID) return null;

  return (
    <>
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
}

// Track custom events
export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window.gtag === 'undefined') return;

  window.gtag('event', eventName, eventParams);
};

// Track conversions
export const trackConversion = (conversionLabel, value = 1) => {
  if (typeof window.gtag === 'undefined' || !GA_MEASUREMENT_ID) return;

  window.gtag('event', 'conversion', {
    send_to: `${GA_MEASUREMENT_ID}/${conversionLabel}`,
    value: value,
    currency: 'USD',
  });
};

// Track contact form submissions
export const trackContactFormSubmission = (formData) => {
  trackEvent('contact_form_submit', {
    event_category: 'engagement',
    event_label: 'Contact Form',
    value: formData.email || 'unknown',
  });

  trackConversion('contact_form', 1);
};

// Track portfolio project clicks
export const trackProjectClick = (projectId, projectTitle) => {
  trackEvent('project_click', {
    event_category: 'engagement',
    event_label: projectTitle,
    project_id: projectId,
  });
};

// Track pricing CTA clicks
export const trackPricingCTAClick = (serviceType) => {
  trackEvent('pricing_cta_click', {
    event_category: 'engagement',
    event_label: serviceType,
  });
};

// Track external link clicks
export const trackExternalLinkClick = (url, label) => {
  trackEvent('external_link_click', {
    event_category: 'outbound',
    event_label: label || url,
    link_url: url,
  });
};
