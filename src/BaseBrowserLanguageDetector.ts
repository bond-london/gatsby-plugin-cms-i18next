import { CustomDetector } from "i18next-browser-languagedetector";

function languageToBase(language: string): string {
  if (language.length > 2) {
    return language.substring(0, 2);
  }
  return language;
}

const BaseNavigatorLanguageDetector: CustomDetector = {
  name: "baseNavigator",
  lookup: () => {
    const found = [];

    if (typeof navigator !== "undefined") {
      if (navigator.languages) {
        // chrome only; not an array, so can't use .push.apply instead of iterating
        for (let i = 0; i < navigator.languages.length; i++) {
          found.push(navigator.languages[i]);
        }
      }
      if (navigator.language) {
        found.push(navigator.language);
      }
    }

    const result = found.length > 0 ? found.map(languageToBase) : undefined;
    console.log("base navigator", result);
    return result;
  },
};

export default BaseNavigatorLanguageDetector;
