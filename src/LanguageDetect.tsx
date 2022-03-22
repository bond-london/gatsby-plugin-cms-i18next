import { withPrefix } from "gatsby-link";
import React from "react";
import { removePathPrefix, useI18next } from ".";

interface GatsbyWindow {
  ___replace: (to: string) => void;
}

export function redirectToLanguagePage(
  language: string,
  fromLanguage?: string
) {
  if (typeof window !== "undefined") {
    const { location } = window;
    const { search, pathname, hash } = location;
    const unprefixedPathname = removePathPrefix(pathname);
    if (unprefixedPathname.startsWith(`/${language}`)) return;

    const noLanguagePathname =
      fromLanguage && unprefixedPathname.startsWith(`/${fromLanguage}`)
        ? unprefixedPathname.substring(fromLanguage.length + 1)
        : unprefixedPathname;
    const newLanguagePathname = `/${language}${noLanguagePathname}`;

    const queryParams = search || "";
    const newUrl = withPrefix(`${newLanguagePathname}${queryParams}${hash}`);
    const gatsbyWindow = window as unknown as GatsbyWindow;
    gatsbyWindow.___replace(newUrl);
  }
}
export const LanguageDetect: React.FC = () => {
  const { defaultLanguage, languages, hasTranslations } = useI18next();
  console.log({ defaultLanguage, languages, hasTranslations });
  if (hasTranslations) {
    throw new Error("Cannot detect language on a translated page");
  }

  return <h1>Language should switch on the browser</h1>;
};
