console.log('STARTING SCRIPT');
import { translations } from './src/lib/translations.js';
console.log('IMPORTED TRANSLATIONS');

function t(key, lang = 'en') {
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

try {
  console.log('Testing English keys:');
  const enTitle = t('servicesPage.title', 'en');
  console.log(`servicesPage.title (en): "${enTitle}"`);
  
  const heTitle = t('servicesPage.title', 'he');
  console.log(`servicesPage.title (he): "${heTitle}"`);

  if (enTitle === 'Our Services' && heTitle === 'השירותים שלנו') {
      console.log('SUCCESS: Translations seem correct.');
  } else {
      console.log('FAILURE: Translations do not match expected values.');
  }

} catch (err) {
  console.error('ERROR:', err);
}
console.log('ENDING SCRIPT');
