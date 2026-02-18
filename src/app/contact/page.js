'use client';

import { useEffect, useState } from 'react';
import VideoBackground from '../../components/animations/VideoBackground';
import ScrollReveal from '../../components/animations/ScrollReveal';
import { useSafeT } from '../../lib/useLanguage';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitErrors, setSubmitErrors] = useState([]);
  const t = useSafeT();

  useEffect(() => {
    // Track page view
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'page_view',
        page: 'contact',
        timestamp: new Date().toISOString()
      })
    }).catch(() => {});
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitErrors([]);

    // Basic client-side validation to match API rules
    const errors = [];
    if (!formData.name || formData.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.push('Please provide a valid email address');
    }
    if (!formData.message || formData.message.trim().length < 10) {
      errors.push('Message must be at least 10 characters long');
    }

    if (errors.length > 0) {
      setSubmitStatus('error');
      setSubmitErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitErrors([]);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
        if (Array.isArray(result.errors) && result.errors.length > 0) {
          setSubmitErrors(result.errors);
        } else if (result.message) {
          setSubmitErrors([result.message]);
        } else {
          setSubmitErrors(['There was an error sending your message. Please try again.']);
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setSubmitErrors(['There was an error sending your message. Please try again later.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <VideoBackground imageSrc="/images/bg-contact.svg" />

      {/* Header Section */}
      <section className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-in">
            <span className="gradient-text">{t('contact.title')}</span>
          </h1>
          <p className="text-lg md:text-xl text-gold-300/80 max-w-3xl mx-auto fade-in" style={{ animationDelay: '0.2s' }}>
            {t('contact.subtitle')}
          </p>
          <p className="text-base md:text-lg text-gold-400/70 max-w-4xl mx-auto mt-4 fade-in" style={{ animationDelay: '0.4s' }}>
            {t('contact.description')}
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <ScrollReveal>
      <section className="relative z-10 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="glass rounded-2xl p-8">
                <h2 className="text-2xl font-semibold text-gold-300 mb-6">{t('contact.formTitle')}</h2>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p className="text-green-400">{t('contact.success')}</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-red-400 mb-2">{t('contact.error')}</p>
                    {submitErrors.length > 0 && (
                      <ul className="list-disc list-inside text-red-300 text-sm space-y-1">
                        {submitErrors.map((err, idx) => (
                          <li key={idx}>{err}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gold-300 mb-2">
                      {t('contact.name')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="input-gold w-full px-4 py-3 rounded-lg"
                      placeholder={t('contact.namePlaceholder')}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gold-300 mb-2">
                      {t('contact.email')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="input-gold w-full px-4 py-3 rounded-lg"
                      placeholder={t('contact.emailPlaceholder')}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gold-300 mb-2">
                      {t('contact.message')} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="input-gold w-full px-4 py-3 rounded-lg resize-none"
                      placeholder={t('contact.messagePlaceholder')}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-gold w-full py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <div className="loading-spinner mr-2 rtl:ml-2 rtl:mr-0"></div>
                        {t('contact.sending')}
                      </span>
                    ) : (
                      t('contact.send')
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <div className="glass rounded-2xl p-8">
                <h2 className="text-2xl font-semibold text-gold-300 mb-6">{t('contact.infoTitle')}</h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <div className="w-12 h-12 bg-gold-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gold-300 mb-1">{t('contact.emailLabel')}</h3>
                      <a
                        href="mailto:contact@workitu.com"
                        className="text-gold-400 hover:text-gold-300 transition-colors"
                      >
                        contact@workitu.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <div className="w-12 h-12 bg-gold-400/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gold-300 mb-1">{t('contact.linkedinLabel')}</h3>
                      <a
                        href="https://www.linkedin.com/in/jonsamper"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold-400 hover:text-gold-300 transition-colors"
                      >
                        {t('contact.linkedinText')}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gold-400/5 rounded-lg">
                  <h3 className="text-lg font-medium text-gold-300 mb-2">{t('contact.responseTitle')}</h3>
                  <p className="text-gold-400/70 text-sm">
                    {t('contact.responseText')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>
    </div>
  );
}
