import {CreatePageArgs, Page} from 'gatsby';
import {match} from 'path-to-regexp';
import {PageContext, PluginOptions} from '../types';

type GeneratePageParams = {
  language: string;
  path: string;
  hasTranslations: boolean;
};

function generatePage(
  page: Page<PageContext>,
  {language, path, hasTranslations}: GeneratePageParams,
  {languages, defaultLanguage, siteUrl}: PluginOptions
): Page<PageContext> {
  return {
    ...page,
    context: {
      ...page.context,
      language,
      i18n: {
        language,
        defaultLanguage,
        languages: languages || [defaultLanguage],
        hasTranslations,
        path,
        siteUrl
      }
    }
  };
}
export function onCreatePage(
  {page, actions}: CreatePageArgs<PageContext>,
  pluginOptions: PluginOptions
): void {
  //Exit if the page has already been processed.
  if (typeof page.context.i18n === 'object') {
    return;
  }

  const {languages = [], defaultLanguage} = pluginOptions;

  const {createPage, deletePage} = actions;

  const path = page.path;
  const pageLanguage = match<{lang: string}>('/:lang/(.*)')(path);
  const language = pageLanguage
    ? languages.find((lang) => lang === pageLanguage.params.lang)
    : undefined;
  const generateParams: GeneratePageParams = {
    language: language || defaultLanguage,
    path,
    hasTranslations: !!language
  };

  const newPage = generatePage(page, generateParams, pluginOptions);

  try {
    deletePage(page);
  } catch (error) {
    console.error('Failed to delete page', error);
  }
  createPage(newPage);
}
