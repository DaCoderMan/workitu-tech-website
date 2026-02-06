'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LegalPage() {
  const [activeTab, setActiveTab] = useState('privacy');

  const tabs = [
    { id: 'privacy', label: 'Privacy Policy' },
    { id: 'terms', label: 'Terms of Service' },
    { id: 'cookies', label: 'Cookie Policy' },
    { id: 'gdpr', label: 'GDPR & Data Rights' },
  ];

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gold-400 mb-4">
            Legal Information
          </h1>
          <p className="text-gold-300 text-lg">
            Your privacy and security are important to us
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gold-500/20 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-gold-500/20 text-gold-400 border-b-2 border-gold-400'
                  : 'text-gold-300 hover:text-gold-400 hover:bg-gold-500/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-black/50 border border-gold-500/20 rounded-lg p-8">
          {activeTab === 'privacy' && <PrivacyPolicy />}
          {activeTab === 'terms' && <TermsOfService />}
          {activeTab === 'cookies' && <CookiePolicy />}
          {activeTab === 'gdpr' && <GDPRRights />}
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-gold-300 hover:text-gold-400 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function PrivacyPolicy() {
  return (
    <div className="prose prose-invert max-w-none text-gold-300">
      <h2 className="text-3xl font-bold text-gold-400 mb-6">Privacy Policy</h2>
      <p className="text-sm text-gold-400 mb-6">Last Updated: February 2026</p>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-3">1. Introduction</h3>
        <p className="mb-4">
          Workitu Tech ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website workitu.tech.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-3">2. Information We Collect</h3>
        <h4 className="text-lg font-medium text-gold-400 mt-4 mb-2">2.1 Information You Provide</h4>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Contact information (name, email address)</li>
          <li>Messages and inquiries submitted through our contact form</li>
          <li>Any other information you choose to provide</li>
        </ul>

        <h4 className="text-lg font-medium text-gold-400 mt-4 mb-2">2.2 Automatically Collected Information</h4>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>IP address and device information</li>
          <li>Browser type and version</li>
          <li>Pages visited and time spent on pages</li>
          <li>Referral source</li>
          <li>Analytics data (via Google Analytics)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-3">3. How We Use Your Information</h3>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>To respond to your inquiries and provide customer support</li>
          <li>To send you information about our services</li>
          <li>To improve our website and services</li>
          <li>To analyze usage patterns and trends</li>
          <li>To comply with legal obligations</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-3">4. Data Sharing and Disclosure</h3>
        <p className="mb-4">
          We do not sell, trade, or rent your personal information to third parties. We may share your information with:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Service Providers:</strong> Third-party services that help us operate our website (e.g., hosting, analytics)</li>
          <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
          <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-3">5. Data Security</h3>
        <p className="mb-4">
          We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-3">6. Data Retention</h3>
        <p className="mb-4">
          We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Contact form submissions: Up to 365 days</li>
          <li>Analytics data: Up to 730 days</li>
          <li>Admin logs: Up to 90 days</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-3">7. Your Rights</h3>
        <p className="mb-4">You have the right to:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Access your personal data</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to processing of your data</li>
          <li>Request data portability</li>
          <li>Withdraw consent at any time</li>
        </ul>
        <p className="mt-4">
          To exercise these rights, contact us at <a href="mailto:contact@workitu.com" className="text-gold-400 hover:text-gold-300">contact@workitu.com</a>
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-3">8. Contact Us</h3>
        <p>
          For any questions about this Privacy Policy, please contact us:<br />
          Email: <a href="mailto:contact@workitu.com" className="text-gold-400 hover:text-gold-300">contact@workitu.com</a><br />
          Website: <a href="https://workitu.tech" className="text-gold-400 hover:text-gold-300">workitu.tech</a>
        </p>
      </section>
    </div>
  );
}

function TermsOfService() {
  return (
    <div className="prose prose-invert max-w-none text-gold-300">
      <h2 className="text-3xl font-bold text-gold-400 mb-6">Terms of Service</h2>
      <p className="text-sm text-gold-400 mb-6">Last Updated: February 2026</p>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-3">1. Acceptance of Terms</h3>
        <p className="mb-4">
          By accessing and using the Workitu Tech website, you accept and agree to be bound by these Terms of Service and all applicable laws and regulations.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-3">2. Services</h3>
        <p className="mb-4">
          Workitu Tech provides web development, AI solutions, e-commerce platforms, and digital marketing services. The specific scope, deliverables, timeline, and pricing for each project will be outlined in a separate service agreement.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-3">3. User Responsibilities</h3>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Provide accurate and complete information</li>
          <li>Maintain the confidentiality of any account credentials</li>
          <li>Not use our services for any illegal or unauthorized purpose</li>
          <li>Not interfere with or disrupt our services</li>
          <li>Not attempt to gain unauthorized access to our systems</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-3">4. Intellectual Property</h3>
        <p className="mb-4">
          All content, features, and functionality on our website are owned by Workitu Tech and are protected by international copyright, trademark, and other intellectual property laws.
        </p>
        <p className="mb-4">
          For project deliverables, intellectual property rights will be specified in the individual service agreement.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-3">5. Limitation of Liability</h3>
        <p className="mb-4">
          Workitu Tech shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our website or services.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-3">6. Termination</h3>
        <p className="mb-4">
          We reserve the right to terminate or suspend access to our services immediately, without prior notice, for any reason, including breach of these Terms.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-3">7. Changes to Terms</h3>
        <p className="mb-4">
          We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the website.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-3">8. Governing Law</h3>
        <p className="mb-4">
          These Terms shall be governed by and construed in accordance with applicable international laws and regulations.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-3">9. Contact</h3>
        <p>
          For questions about these Terms, contact us at <a href="mailto:contact@workitu.com" className="text-gold-400 hover:text-gold-300">contact@workitu.com</a>
        </p>
      </section>
    </div>
  );
}

function CookiePolicy() {
  return (
    <div className="prose prose-invert max-w-none text-gold-300">
      <h2 className="text-3xl font-bold text-gold-400 mb-6">Cookie Policy</h2>
      <p className="text-sm text-gold-400 mb-6">Last Updated: February 2026</p>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-3">1. What Are Cookies?</h3>
        <p className="mb-4">
          Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-3">2. Types of Cookies We Use</h3>

        <h4 className="text-lg font-medium text-gold-400 mt-4 mb-2">2.1 Essential Cookies</h4>
        <p className="mb-4">
          These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
        </p>

        <h4 className="text-lg font-medium text-gold-400 mt-4 mb-2">2.2 Analytics Cookies</h4>
        <p className="mb-4">
          We use Google Analytics to understand how visitors interact with our website. These cookies collect information about:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Pages visited</li>
          <li>Time spent on pages</li>
          <li>Browser and device information</li>
          <li>Geographic location (city/country level)</li>
        </ul>

        <h4 className="text-lg font-medium text-gold-400 mt-4 mb-2">2.3 Functional Cookies</h4>
        <p className="mb-4">
          These cookies remember your preferences, such as language selection, to provide a more personalized experience.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-3">3. Third-Party Cookies</h3>
        <p className="mb-4">We use the following third-party services that may set cookies:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Google Analytics:</strong> For website analytics</li>
          <li><strong>Google Tag Manager:</strong> For managing marketing tags</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-3">4. Managing Cookies</h3>
        <p className="mb-4">
          You can control and manage cookies in several ways:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Browser settings: Most browsers allow you to refuse cookies or delete cookies</li>
          <li>Opt-out tools: Use Google Analytics opt-out browser add-on</li>
          <li>Privacy settings: Adjust your browser's privacy settings</li>
        </ul>
        <p className="mt-4">
          Note: Blocking or deleting cookies may impact your experience on our website.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-3">5. Cookie Consent</h3>
        <p className="mb-4">
          By using our website, you consent to the use of cookies as described in this policy. We will notify you about the use of cookies through a banner when you first visit our site.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-3">6. Updates to This Policy</h3>
        <p className="mb-4">
          We may update this Cookie Policy from time to time. The latest version will always be available on this page with the "Last Updated" date.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-3">7. Contact Us</h3>
        <p>
          For questions about our use of cookies, contact us at <a href="mailto:contact@workitu.com" className="text-gold-400 hover:text-gold-300">contact@workitu.com</a>
        </p>
      </section>
    </div>
  );
}

function GDPRRights() {
  return (
    <div className="prose prose-invert max-w-none text-gold-300">
      <h2 className="text-3xl font-bold text-gold-400 mb-6">GDPR & Data Rights</h2>
      <p className="text-sm text-gold-400 mb-6">Last Updated: February 2026</p>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-3">1. Your Rights Under GDPR</h3>
        <p className="mb-4">
          Under the General Data Protection Regulation (GDPR), you have the following rights regarding your personal data:
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-3">2. Right to Access</h3>
        <p className="mb-4">
          You have the right to request a copy of all personal data we hold about you. We will provide this information in a structured, commonly used, and machine-readable format.
        </p>
        <p className="mb-4">
          <strong>How to exercise:</strong> Email us at <a href="mailto:contact@workitu.com" className="text-gold-400 hover:text-gold-300">contact@workitu.com</a> with the subject "Data Access Request"
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-3">3. Right to Rectification</h3>
        <p className="mb-4">
          You have the right to request correction of any inaccurate or incomplete personal data we hold about you.
        </p>
        <p className="mb-4">
          <strong>How to exercise:</strong> Email us with the corrections needed
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-3">4. Right to Erasure ("Right to be Forgotten")</h3>
        <p className="mb-4">
          You have the right to request deletion of your personal data when:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>The data is no longer necessary for the purpose it was collected</li>
          <li>You withdraw consent and there is no other legal ground for processing</li>
          <li>You object to the processing and there are no overriding legitimate grounds</li>
          <li>The data has been unlawfully processed</li>
        </ul>
        <p className="mt-4">
          <strong>How to exercise:</strong> Email us at <a href="mailto:contact@workitu.com" className="text-gold-400 hover:text-gold-300">contact@workitu.com</a> with the subject "Data Deletion Request"
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-3">5. Right to Restriction of Processing</h3>
        <p className="mb-4">
          You have the right to request that we restrict processing of your personal data in certain circumstances.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-3">6. Right to Data Portability</h3>
        <p className="mb-4">
          You have the right to receive your personal data in a structured, commonly used format and transmit it to another controller.
        </p>
        <p className="mb-4">
          <strong>How to exercise:</strong> Email us at <a href="mailto:contact@workitu.com" className="text-gold-400 hover:text-gold-300">contact@workitu.com</a> with the subject "Data Export Request"
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-3">7. Right to Object</h3>
        <p className="mb-4">
          You have the right to object to processing of your personal data for direct marketing purposes or when processing is based on legitimate interests.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-3">8. Right to Withdraw Consent</h3>
        <p className="mb-4">
          Where processing is based on consent, you have the right to withdraw that consent at any time.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-3">9. Right to Lodge a Complaint</h3>
        <p className="mb-4">
          You have the right to lodge a complaint with a supervisory authority if you believe we have not complied with GDPR requirements.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-3">10. How We Handle Your Requests</h3>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Response Time:</strong> We will respond to your request within 30 days</li>
          <li><strong>Verification:</strong> We may need to verify your identity before processing your request</li>
          <li><strong>Free of Charge:</strong> Requests are generally free, but we may charge a reasonable fee for excessive or repetitive requests</li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gold-400 mb-3">11. Contact Our Data Protection Officer</h3>
        <p className="mb-4">
          For any questions about your data rights or to exercise any of your rights, please contact us:
        </p>
        <p>
          Email: <a href="mailto:contact@workitu.com" className="text-gold-400 hover:text-gold-300">contact@workitu.com</a><br />
          Subject Line: "GDPR Data Rights Request"<br />
          Website: <a href="https://workitu.tech" className="text-gold-400 hover:text-gold-300">workitu.tech</a>
        </p>
      </section>
    </div>
  );
}
