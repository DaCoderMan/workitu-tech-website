'use client';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://workitu.tech';

export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Workitu Tech',
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    description: 'Workitu Tech creates digital experiences that inspire and perform. We craft sophisticated websites, AI-powered apps, and e-commerce platforms.',
    sameAs: [
      'https://linkedin.com/in/jonsamper',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@workitu.com',
      contactType: 'customer service',
      availableLanguage: ['English', 'Hebrew'],
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Workitu Tech',
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/portfolio?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Workitu Tech',
    url: BASE_URL,
    priceRange: '$$',
    serviceType: ['Web Development', 'AI Solutions', 'E-commerce', 'Digital Marketing'],
    areaServed: 'Worldwide',
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Web Development Services',
    provider: {
      '@type': 'Organization',
      name: 'Workitu Tech',
      url: BASE_URL,
    },
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Website Creation',
            description: 'Elegant, fast, and mobile-ready websites designed to impress and perform.',
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '320',
            priceCurrency: 'USD',
            minPrice: '320',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'E-Commerce Solutions',
            description: 'Powerful, secure online stores with payment integration and inventory management.',
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '950',
            priceCurrency: 'USD',
            minPrice: '950',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI-Powered Applications',
            description: 'Smart, scalable software powered by Generative AI.',
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '670',
            priceCurrency: 'USD',
            minPrice: '670',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Digital Marketing & Growth',
            description: 'SEO, automation, and social media strategy to grow your online presence.',
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: '270',
            priceCurrency: 'USD',
            minPrice: '270',
            unitText: 'MONTH',
          },
        },
      ],
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How long does a typical project take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most websites are delivered within 2-4 weeks. AI-powered applications typically take 4-8 weeks depending on complexity. We\'ll give you a clear timeline during our initial consultation.',
        },
      },
      {
        '@type': 'Question',
        name: 'What technologies do you use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We use modern, industry-leading technologies including Next.js, React, Node.js, Python, and OpenAI APIs. Our stack is chosen to ensure fast, scalable, and maintainable solutions.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you provide ongoing support?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! We offer ongoing maintenance and support packages to keep your website secure, updated, and running smoothly after launch.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does pricing work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer transparent, project-based pricing starting from $320 for websites. After understanding your needs, we provide a detailed quote with no hidden fees.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can you integrate AI into existing websites?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely! We can add AI-powered features like chatbots, content generation, or automation to your existing website or application.',
        },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Portfolio',
        item: `${BASE_URL}/portfolio`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Services',
        item: `${BASE_URL}/services`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Pricing',
        item: `${BASE_URL}/pricing`,
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Contact',
        item: `${BASE_URL}/contact`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
