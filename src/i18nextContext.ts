import React from "react";
import { I18NextContext } from "./types";

const defaultLanguage = "en";

export const I18nextContext = React.createContext<I18NextContext>({
  languages: [defaultLanguage],
  siteUrl: "http://localhost:8000",
  currentLanguage: defaultLanguage,
  defaultLanguage,
});
