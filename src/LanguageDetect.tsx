import browserLang from 'browser-lang';
import {withPrefix} from 'gatsby-link';
import React from 'react';
import {removePathPrefix, useI18next} from '.';
import {LANGUAGE_KEY} from './types';

interface GatsbyWindow {
  __replace: (to: string) => void;
}
export const LanguageDetect: React.FC = () => {
  const {defaultLanguage, languages, hasTranslations} = useI18next();
  if (hasTranslations) {
    throw new Error('Cannot detect language on a translated page');
  }

  if (typeof window !== 'undefined') {
    const {location, localStorage} = window;
    const storedLanguage = localStorage.getItem(LANGUAGE_KEY);
    const detected = storedLanguage || browserLang({languages, fallback: defaultLanguage});
    const desired = languages.includes(detected) ? detected : defaultLanguage;
    localStorage.setItem(LANGUAGE_KEY, desired);

    const {search, pathname, hash} = location;
    const queryParams = search || '';
    const newUrl = withPrefix(`/${desired}${removePathPrefix(pathname)}${queryParams}${hash}`);
    const gatsbyWindow = window as unknown as GatsbyWindow;
    gatsbyWindow.__replace(newUrl);
    return null;
  }
  return <h1>Language should switch on the browser</h1>;
};
