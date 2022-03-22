import { withPrefix } from "gatsby-link";
import React from "react";
import { removePathPrefix, useI18next } from ".";
import { LANGUAGE_KEY } from "./types";
import LanguageDetector from "i18next-browser-languagedetector";

interface GatsbyWindow {
  ___replace: (to: string) => void;
}

export function redirectToLanguagePage(language: string) {
  if (typeof window !== "undefined") {
    const { location } = window;
    const { search, pathname, hash } = location;
    if (pathname.startsWith(`/${language}`)) return;

    const queryParams = search || "";
    const newUrl = withPrefix(
      `/${language}${removePathPrefix(pathname)}${queryParams}${hash}`
    );
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

  if (typeof window !== "undefined") {
    const languageDetector = new LanguageDetector();
    const language = languageDetector.detect();
    console.log("language", language);

    // const { location, localStorage } = window;
    // const storedLanguage = localStorage.getItem(LANGUAGE_KEY);
    // const detected =
    //   storedLanguage || browserLang({ languages, fallback: defaultLanguage });
    // const desired = languages.includes(detected) ? detected : defaultLanguage;
    // localStorage.setItem(LANGUAGE_KEY, desired);

    // const { search, pathname, hash } = location;
    // const queryParams = search || "";
    // const newUrl = withPrefix(
    //   `/${desired}${removePathPrefix(pathname)}${queryParams}${hash}`
    // );
    // const gatsbyWindow = window as unknown as GatsbyWindow;
    // gatsbyWindow.___replace(newUrl);
    return null;
  }
  return <h1>Language should switch on the browser</h1>;
};
