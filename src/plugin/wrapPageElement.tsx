import React, { ReactNode } from "react";
import { WrapPageElementBrowserArgs } from "gatsby";
import {
  I18NextContext,
  PageContext,
  PluginOptions,
  LocaleNode,
} from "../types";
import i18next, { i18n as I18n } from "i18next";
import { I18nextProvider } from "react-i18next";
import { I18nextContext } from "../i18nextContext";
import outdent from "outdent";

function withI18next(i18n: I18n, context: I18NextContext) {
  // eslint-disable-next-line react/display-name
  return (children: ReactNode) => (
    <I18nextProvider i18n={i18n}>
      <I18nextContext.Provider value={context}>
        {children}
      </I18nextContext.Provider>
    </I18nextProvider>
  );
}

interface LocalesInformation {
  _locales: {
    edges: Array<{ node: LocaleNode }>;
  };
}

export const wrapPageElement = (
  {
    element,
    props,
  }: WrapPageElementBrowserArgs<LocalesInformation, PageContext>,
  { i18nextOptions = {} }: PluginOptions
): JSX.Element | null | undefined => {
  if (!props) return;
  const { data, pageContext } = props;
  const inputI18n = pageContext.i18n;
  if (!inputI18n) {
    throw new Error("Page has no i18n");
  }
  const {
    hasTranslations,
    language,
    languages,
    path,
    defaultLanguage,
    siteUrl,
  } = inputI18n;

  const i18n = i18next.createInstance();
  if (hasTranslations) {
    const localeNodes = data?._locales?.edges || [];

    if (
      languages.length > 1 &&
      localeNodes.length === 0 &&
      process.env.NODE_ENV === "development"
    ) {
      console.error(
        outdent`
      No translations were found in "_locales" key for "${path}". 
      You need to add a graphql query to every page like this:
      
      export const query = graphql\`
        query($language: String!) {
          _locales: allLocale(language: {eq: $language}}) {
            edges {
              node {
                ns
                data
                language
              }
            }
          }
        }
      \`;
      `
      );
    }

    const namespaces = localeNodes.map(({ node }) => node.ns);

    // We want to set default namespace to a page namespace if it exists
    // and use other namespaces as fallback
    // this way you dont need to specify namespaces in pages
    let defaultNS = i18nextOptions.defaultNS || "translation";
    defaultNS = namespaces.find((ns) => ns !== defaultNS) || defaultNS;
    const fallbackNS = namespaces.filter((ns) => ns !== defaultNS);

    i18n
      .init({
        ...i18nextOptions,
        lng: language,
        fallbackLng: defaultLanguage,
        defaultNS,
        fallbackNS,
        react: {
          useSuspense: false,
        },
      })
      .then(() => {
        // Do nothing
      })
      .catch((error) => console.warn(`failed to initialise i18n`, error));

    localeNodes.forEach(({ node }) => {
      const parsedData = JSON.parse(node.data) as unknown;
      i18n.addResourceBundle(node.language, node.ns, parsedData);
    });

    if (i18n.language !== language) {
      i18n
        .changeLanguage(language)
        .then()
        .catch((error) =>
          console.warn(
            `Failed to change language from ${i18n.language} to ${language}`,
            error
          )
        );
    }
  } else {
    i18n
      .init({
        ...i18nextOptions,
        lng: language,
        fallbackLng: defaultLanguage,
        react: {
          useSuspense: false,
        },
      })
      .then(() => {
        //console.log('initialised i18n');
      })
      .catch((error) => console.warn(`failed to initialise i18n`, error));
  }

  const context: I18NextContext = {
    hasTranslations,
    language,
    languages,
    siteUrl,
    path,
    defaultLanguage,
  };

  return withI18next(i18n, context)(element);
};
