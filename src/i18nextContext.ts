import React from 'react';
import {I18NextContext} from './types';

const defaultLanguage = 'en';

export const I18nextContext = React.createContext<I18NextContext>({
  language: defaultLanguage,
  languages: [defaultLanguage],
  // routed: false,
  defaultLanguage,
  // generateDefaultLanguagePage: false,
  // originalPath: '/',
  path: '/',
  hasTranslations: false,
  siteUrl: 'http://localhost:8000'
});
