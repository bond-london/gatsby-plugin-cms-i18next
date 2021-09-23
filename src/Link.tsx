import React, {useCallback, useContext} from 'react';
import {I18nextContext} from './i18nextContext';
import {Link as GatsbyLink, GatsbyLinkProps, withPrefix} from 'gatsby';
import {LANGUAGE_KEY} from './types';

type Props<TState> = GatsbyLinkProps<TState> & {language?: string};

export function removePathPrefix(pathname: string): string {
  const pathPrefix = withPrefix('/');
  if (pathname.startsWith(pathPrefix)) {
    return pathname.replace(pathPrefix, '/');
  }
  return pathname;
}

export const Link: React.FC<Props<unknown>> = ({language, to, onClick, ...rest}) => {
  const context = useContext(I18nextContext);
  const urlLanguage = language || context.language;
  const getLanguagePath = (language: string) => {
    return `/${language}`;
  };
  const link = `${getLanguagePath(urlLanguage)}${to}`;
  const localClick = useCallback(
    (e) => {
      if (language) {
        localStorage.setItem(LANGUAGE_KEY, language);
      }
      if (onClick) {
        onClick(e);
      }
    },
    [language, onClick]
  );

  return (
    <GatsbyLink {...(rest as unknown)} to={link} hrefLang={urlLanguage} onClick={localClick} />
  );
};
