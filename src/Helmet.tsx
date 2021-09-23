import React from 'react';
import {Helmet as ReactHelmet, HelmetProps} from 'react-helmet';
import {useI18next} from './useI18next';

function createUrlWithLang(
  siteUrl: string,
  path: string,
  currentLanguage: string,
  otherLanguage: string
) {
  const newPath = path.startsWith(`/${currentLanguage}`)
    ? path.replace(`/${currentLanguage}`, `/${otherLanguage}`)
    : `/${otherLanguage}${path}`;
  const url = `${siteUrl}${newPath}`;
  if (url.endsWith('/')) {
    return url;
  }
  return `${url}/`;
}
export const Helmet: React.FC<HelmetProps> = ({children, ...props}) => {
  const {languages, language, path, siteUrl = '', defaultLanguage} = useI18next();
  return (
    <ReactHelmet {...props}>
      <html lang={language} />
      <link rel="canonical" href={createUrlWithLang(siteUrl, path, language, language)} />
      {languages.map((lng) => (
        <link
          rel="alternate"
          key={lng}
          href={createUrlWithLang(siteUrl, path, language, lng)}
          hrefLang={lng}
        />
      ))}
      {/* adding a fallback page for unmatched languages */}
      <link
        rel="alternate"
        href={createUrlWithLang(siteUrl, path, language, defaultLanguage)}
        hrefLang="x-default"
      />
      {children}
    </ReactHelmet>
  );
};
