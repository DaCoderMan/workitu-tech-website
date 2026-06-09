const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://workitu.com';

export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Workitu Tech',
    url: 'https://www.workitu.com',
    logo: 'https://www.workitu.com/images/logo.png',
    description: 'AI automation and web development consultancy for professionals in Israel. Custom WhatsApp bots, AI agents, and web apps. Trilingual: Portuguese, Hebrew & English.',
    email: 'contact@workitu.com',
    areaServed: [
      { '@type': 'Country', name: 'Israel' },
      { '@type': 'Country', name: 'Brazil' },
    ],
    knowsLanguage: ['en', 'pt', 'he'],
    sameAs: [
      'https://www.linkedin.com/in/jonsamper',
      'https://github.com/DaCoderMan',
      'https://www.instagram.com/jonathanperlin2',
      'https://www.facebook.com/jonathan.s.perlin',
    ],
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

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Yonatan Sam Perlin',
    jobTitle: 'Founder & CEO, AI Automation Consultant',
    worksFor: { '@type': 'Organization', name: 'Workitu Tech' },
    alumniOf: 'Banco do Brasil — Enterprise Fintech',
    knowsAbout: ['AI automation', 'n8n', 'React', 'Node.js', 'Fintech'],
    url: 'https://www.workitu.com/about',
    sameAs: ['https://www.linkedin.com/in/jonsamper'],
  };

  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Workitu Tech',
    url: BASE_URL,
    email: 'contact@workitu.com',
    priceRange: '$$',
    serviceType: [
      'AI WhatsApp Bot Development',
      'AI Agents & Workflow Automation',
      'Custom Web Application Development',
      'n8n Automation',
      'Tech Mentoring & Programming Classes',
      'Digital Marketing',
      'AI Chatbots for Business',
    ],
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 32.0853,
        longitude: 34.7818,
      },
      geoRadius: '100000',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Workitu Tech Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI WhatsApp Bot',
            description: 'Custom AI WhatsApp bot ready in 7 days',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tech Mentoring',
            description: 'Personalized programming and tech mentoring',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Digital Marketing',
            description: 'SEO, social media, and digital strategy',
          },
        },
      ],
    },
  };

  const cibSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Conexao Israel Brasil',
    url: 'https://conexaoisraelbrasil.org',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description:
      'AI assistant for Brazilians living in Israel — bureaucracy navigation, financial simulators, and professional directory. Built by Workitu Tech.',
    offers: {
      '@type': 'Offer',
      price: '9.99',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Organization',
      name: 'Workitu Tech',
    },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cibSchema) }}
      />
    </>
  );
}
