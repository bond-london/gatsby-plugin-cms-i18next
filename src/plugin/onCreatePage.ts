import {CreatePageArgs, Page} from 'gatsby';
import {match} from 'path-to-regexp';
import {PageContext, PageOptions, PluginOptions} from '../types';

type GeneratePageParams = {
  language: string;
  path?: string;
  originalPath?: string;
  routed?: boolean;
  pageOptions?: PageOptions;
};

function generatePage(
  page: Page<PageContext>,
  {language, routed = false, pageOptions}: GeneratePageParams,
  {languages, defaultLanguage}: PluginOptions
): Page<PageContext> {
  return {
    ...page,
    context: {
      ...page.context,
      language,
      i18n: {
        language,
        defaultLanguage,
        languages: pageOptions?.languages || languages,
        routed,
        path: page.path
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

  const {pages = [], languages = []} = pluginOptions;

  const {createPage, deletePage} = actions;

  const pageOptions = pages.find((opt) => match(opt.matchPath)(page.path));
  const pageLanguage = match<{lang: string}>(pageOptions?.matchPath || '/:lang/(.*)')(page.path);
  if (!pageLanguage) {
    return;
  }
  const language = languages.find((lang) => lang === pageLanguage.params.lang);
  if (!language) {
    return;
  }

  const newPage = generatePage(page, {language, routed: true, pageOptions}, pluginOptions);

  try {
    deletePage(page);
  } catch (error) {
    console.error('Failed to delete page', error);
  }
  createPage(newPage);
}
