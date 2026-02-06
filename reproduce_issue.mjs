import { translations } from './src/lib/translations.js';

function t(key, lang = 'en') {
  console.log('Available keys in en:', Object.keys(translations['en']));
  const keys = key.split('.');
  let result = translations[lang];

  for (const k of keys) {
    if (result && typeof result === 'object') {
      result = result[k];
    } else {
      return key; // Return key if translation not found
    }
  }

  return result || key;
}

console.log('Testing English keys:');
console.log('servicesPage.title:', t('servicesPage.title', 'en'));
console.log('servicesPage.items.webDev.title:', t('servicesPage.items.webDev.title', 'en'));
console.log('servicesPage.items.webDev.features.0:', t('servicesPage.items.webDev.features.0', 'en'));

console.log('\nTesting Hebrew keys:');
console.log('servicesPage.title:', t('servicesPage.title', 'he'));
