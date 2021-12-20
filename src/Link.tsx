import React, { useCallback, useContext } from "react";
import { I18nextContext } from "./i18nextContext";
import { Link as GatsbyLink, GatsbyLinkProps, withPrefix } from "gatsby";
import { I18SitePage, LANGUAGE_KEY } from "./types";

type Props<TState> = Omit<GatsbyLinkProps<TState>, "ref"> & {
  language?: string;
  sitePages?: readonly I18SitePage[];
};

export function removePathPrefix(pathname: string): string {
  const pathPrefix = withPrefix("/");
  if (pathname.startsWith(pathPrefix)) {
    return pathname.replace(pathPrefix, "/");
  }
  return pathname;
}

function getLanguagePath(language: string) {
  return `/${language}`;
}

export const SmartLink: React.FC<Props<unknown>> = ({
  language,
  to,
  sitePages,
  ...rest
}) => {
  const context = useContext(I18nextContext);
  const urlLanguage = language || context.language;
  const link = `${getLanguagePath(urlLanguage)}${to}`;

  const realPage = sitePages!.find((sp) => sp.path === link);
  if (realPage) {
    return (
      <GatsbyLink {...(rest as unknown)} to={link} hrefLang={urlLanguage} />
    );
  }

  const defaultLink = `${getLanguagePath(context.defaultLanguage)}${to}`;
  const defaultPage = sitePages!.find((sp) => sp.path === defaultLink);
  if (defaultPage) {
    return (
      <GatsbyLink
        {...(rest as unknown)}
        to={defaultLink}
        hrefLang={context.defaultLanguage}
      />
    );
  }

  console.warn(
    `No path for ${to} in ${urlLanguage} or ${context.defaultLanguage}`
  );
  return <GatsbyLink {...(rest as unknown)} to={link} hrefLang={urlLanguage} />;
};

export const DumbLink: React.FC<Props<unknown>> = ({
  language,
  to,
  onClick,
  ...rest
}) => {
  const context = useContext(I18nextContext);
  const urlLanguage = language || context.language;
  const link = `${getLanguagePath(urlLanguage)}${to}`;
  const localClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
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
    <GatsbyLink
      {...(rest as unknown)}
      to={link}
      hrefLang={urlLanguage}
      onClick={localClick}
    />
  );
};

export const Link: React.FC<Props<unknown>> = (props) => {
  if (props.sitePages) {
    return <SmartLink {...props} />;
  }

  return <DumbLink {...props} />;
};
