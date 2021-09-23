import {
  DefaultNamespace,
  Namespace,
  TFunction,
  useTranslation,
  UseTranslationOptions
} from 'react-i18next';
import {useContext} from 'react';
import {navigate as gatsbyNavigate} from 'gatsby';
import {I18nextContext} from './i18nextContext';
import {NavigateOptions} from '@reach/router';
import {I18NextContext, LANGUAGE_KEY} from './types';
import {i18n} from 'i18next';
let __BASE_PATH__: string | undefined;
let __PATH_PREFIX__: string | undefined;

export function useI18next<N extends Namespace = DefaultNamespace>(
  ns?: Namespace,
  options?: UseTranslationOptions
): I18NextContext & {
  i18n: i18n;
  t: TFunction<N>;
  ready: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  navigate: (to: string, options?: NavigateOptions<{}>) => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  changeLanguage: (language: string, to?: string, options?: NavigateOptions<{}>) => Promise<void>;
} {
  const {i18n, t, ready} = useTranslation(ns, options);
  const context = useContext(I18nextContext);
  const {hasTranslations} = context;

  const getLanguagePath = (language: string) => {
    return `/${language}`;
  };

  const removePrefix = (pathname: string) => {
    const base = typeof __BASE_PATH__ !== `undefined` ? __BASE_PATH__ : __PATH_PREFIX__;
    if (base && pathname.indexOf(base) === 0) {
      pathname = pathname.slice(base.length);
    }
    return pathname;
  };

  const removeLocalePart = (pathname: string) => {
    if (!hasTranslations) return pathname;
    const i = pathname.indexOf(`/`, 1);
    return pathname.substring(i);
  };

  // eslint-disable-next-line @typescript-eslint/ban-types
  const navigate = (to: string, options?: NavigateOptions<{}>) => {
    const languagePath = getLanguagePath(context.language);
    const link = `${languagePath}${to}`;
    return gatsbyNavigate(link, options);
  };

  // eslint-disable-next-line @typescript-eslint/ban-types
  const changeLanguage = (language: string, to?: string, options?: NavigateOptions<{}>) => {
    const languagePath = getLanguagePath(language);
    const pathname = to || removeLocalePart(removePrefix(window.location.pathname));
    const link = `${languagePath}${pathname}${window.location.search}`;
    localStorage.setItem(LANGUAGE_KEY, language);
    return gatsbyNavigate(link, options);
  };

  return {
    ...context,
    i18n,
    t,
    ready,
    navigate,
    changeLanguage
  };
}
