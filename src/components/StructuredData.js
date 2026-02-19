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
      'https://twitter.com/workitutech',
      'https://linkedin.com/company/workitu-tech',
      'https://github.com/workitu-tech',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@workitu.com',
      contactType: 'customer service',
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
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 32.0853,
        longitude: 34.7818,
      },
      geoRadius: '50000',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  );
}
