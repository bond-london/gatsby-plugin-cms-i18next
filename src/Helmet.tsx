import React from "react";
import { Helmet as ReactHelmet, HelmetProps } from "react-helmet";
import { useI18next } from "./useI18next";

function createUrlWithLang(
  siteUrl: string,
  corePath: string,
  otherLanguage: string
) {
  const newPath = `/${otherLanguage}${corePath}`;
  const url = `${siteUrl}${newPath}`;
  if (url.endsWith("/")) {
    return url;
  }
  return `${url}/`;
}
export const Helmet: React.FC<HelmetProps & { corePath: string }> = ({
  children,
  corePath,
  ...props
}) => {
  const { languages, currentLanguage, defaultLanguage, siteUrl } = useI18next();
  return (
    <ReactHelmet {...props}>
      <html lang={currentLanguage} />
      <link
        rel="canonical"
        href={createUrlWithLang(siteUrl, corePath, currentLanguage)}
      />
      {languages.map((lng) => (
        <link
          rel="alternate"
          key={lng}
          href={createUrlWithLang(siteUrl, corePath, lng)}
          hrefLang={lng}
        />
      ))}
      {/* adding a fallback page for unmatched languages */}
      <link
        rel="alternate"
        href={createUrlWithLang(siteUrl, corePath, defaultLanguage)}
        hrefLang="x-default"
      />
      {children}
    </ReactHelmet>
  );
};
