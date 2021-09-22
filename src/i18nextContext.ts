import React from 'react';
import {I18NextContext} from './types';

const defaultLanguages = ['en'];

export const I18nextContext = React.createContext<I18NextContext>({
  language: defaultLanguages[0],
  languages: defaultLanguages,
  routed: false,
  defaultLanguage: defaultLanguages[0],
  // generateDefaultLanguagePage: false,
  // originalPath: '/',
  path: '/'
});
