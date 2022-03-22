import {
  CustomDetector,
  DetectorOptions,
} from "i18next-browser-languagedetector";

const CustomPathLanguageDetector: CustomDetector = {
  name: "customPath",
  lookup: (options: DetectorOptions) => {
    let found: string | undefined;

    if (typeof window !== "undefined") {
      const language = window.location.pathname.match(/\/([a-zA-Z-]*)/g);
      if (language instanceof Array) {
        if (typeof options.lookupFromPathIndex === "number") {
          if (typeof language[options.lookupFromPathIndex] !== "string") {
            found = undefined;
          } else {
            found = language[options.lookupFromPathIndex].replace("/", "");
          }
        } else {
          found = language[0].replace("/", "");
        }
      }
    }
    console.log("base path", found);
    return found;
  },
};

export default CustomPathLanguageDetector;
