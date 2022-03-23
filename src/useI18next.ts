import {
  DefaultNamespace,
  KeyPrefix,
  Namespace,
  TFunction,
  useTranslation,
  UseTranslationOptions,
} from "react-i18next";
import { useContext } from "react";
import { I18nextContext } from "./i18nextContext";
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
} {
  const { i18n, t, ready } = useTranslation(ns, options);
  const context = useContext(I18nextContext);

  return {
    ...context,
    i18n,
    t,
    ready,
  };
}
