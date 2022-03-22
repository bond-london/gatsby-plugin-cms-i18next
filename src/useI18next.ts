import {
  DefaultNamespace,
  KeyPrefix,
  Namespace,
  TFunction,
  useTranslation,
  UseTranslationOptions,
} from "react-i18next";
import { useContext } from "react";
import { navigate as gatsbyNavigate } from "gatsby";
import { I18nextContext } from "./i18nextContext";
import { NavigateOptions } from "@reach/router";
import { I18NextContext } from "./types";
import { i18n } from "i18next";

export function useI18next<
  N extends Namespace = DefaultNamespace,
  TKPrefix extends KeyPrefix<N> = undefined
>(
  ns?: Namespace,
  options?: UseTranslationOptions<TKPrefix>
): I18NextContext & {
  i18n: i18n;
  t: TFunction<N>;
  ready: boolean;
  navigate: (to: string, options?: NavigateOptions<TKPrefix>) => Promise<void>;
} {
  const { i18n, t, ready } = useTranslation(ns, options);
  const context = useContext(I18nextContext);

  const getLanguagePath = (language: string) => {
    return `/${language}`;
  };

  const navigate = (to: string, options?: NavigateOptions<TKPrefix>) => {
    const languagePath = getLanguagePath(context.language);
    const link = `${languagePath}${to}`;
    // eslint-disable-next-line @typescript-eslint/ban-types
    return gatsbyNavigate(link, options as NavigateOptions<{}>);
  };

  return {
    ...context,
    i18n,
    t,
    ready,
    navigate,
  };
}
