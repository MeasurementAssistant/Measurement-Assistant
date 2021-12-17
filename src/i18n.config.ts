const i18n = require('i18n');
import path from 'path';

export const configureI18n = (isGlobal: boolean) => {
  const i18nObj = {};

  i18n.configure({
    register: isGlobal ? global : i18nObj,
    locales: ['en', 'de', 'es', 'fr', 'it', 'pl', 'pt', 'ru', 'uk'],
    directory: path.resolve(__dirname, path.join(process.cwd(), 'locales')),
    defaultLocale: 'en',
    queryParameter: 'lang',
    objectNotation: true,
    updateFiles: false
  });

  return [i18n, i18nObj];
};
