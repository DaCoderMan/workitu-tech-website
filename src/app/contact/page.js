'use client';

import { useEffect, useState } from 'react';
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
    <div className="relative min-h-screen bg-gradient-to-b from-[#fffcf5] via-[#fef9ee] to-[#fffcf5]">

      {/* Header Section */}
      <section className="relative z-10 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-in">
            <span className="gradient-text">{t('contact.title')}</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-500 max-w-3xl mx-auto fade-in font-medium" style={{ animationDelay: '0.2s' }}>
            {t('contact.subtitle')}
          </p>
          <p className="text-base md:text-lg text-stone-400 max-w-4xl mx-auto mt-4 fade-in" style={{ animationDelay: '0.4s' }}>
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
              <div className="bg-white rounded-2xl p-8 border border-stone-200/80 shadow-sm">
                <h2 className="text-2xl font-semibold text-stone-800 mb-6">{t('contact.formTitle')}</h2>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <p className="text-emerald-700 font-medium">{t('contact.success')}</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 mb-2 font-medium">{t('contact.error')}</p>
                    {submitErrors.length > 0 && (
                      <ul className="list-disc list-inside text-red-600 text-sm space-y-1">
                        {submitErrors.map((err, idx) => (
                          <li key={idx}>{err}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-stone-700 mb-2">
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
                    <label htmlFor="email" className="block text-sm font-semibold text-stone-700 mb-2">
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
                    <label htmlFor="message" className="block text-sm font-semibold text-stone-700 mb-2">
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
                    className="btn-gold w-full py-3 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
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
              <div className="bg-white rounded-2xl p-8 border border-stone-200/80 shadow-sm">
                <h2 className="text-2xl font-semibold text-stone-800 mb-6">{t('contact.infoTitle')}</h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-amber-200/50">
                      <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-stone-700 mb-1">{t('contact.emailLabel')}</h3>
                      <a
                        href="mailto:contact@workitu.com"
                        className="text-amber-700 hover:text-amber-800 transition-colors font-medium"
                      >
                        contact@workitu.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-amber-200/50">
                      <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-stone-700 mb-1">{t('contact.linkedinLabel')}</h3>
                      <a
                        href="https://www.linkedin.com/in/jonsamper"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-700 hover:text-amber-800 transition-colors font-medium"
                      >
                        {t('contact.linkedinText')}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-emerald-200/50">
                      <svg className="w-6 h-6 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.112 1.523 5.84L0 24l6.336-1.499A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.373l-.36-.214-3.724.88.936-3.617-.235-.373A9.818 9.818 0 1112 21.818z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-stone-700 mb-1">WhatsApp</h3>
                      <a
                        href="https://wa.me/972587897763"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:text-emerald-700 transition-colors font-semibold"
                      >
                        Chat on WhatsApp &rarr;
                      </a>
                      <p className="text-stone-400 text-xs mt-1">{t('contact.whatsappHint')}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-amber-50/50 rounded-lg border border-amber-200/30">
                  <h3 className="text-lg font-semibold text-stone-700 mb-2">{t('contact.responseTitle')}</h3>
                  <p className="text-stone-500 text-sm leading-relaxed">
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
