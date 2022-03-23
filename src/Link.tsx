import React, { useContext } from "react";
import { I18nextContext } from "./i18nextContext";
import { Link as GatsbyLink, GatsbyLinkProps, withPrefix } from "gatsby";

type Props<TState> = Omit<GatsbyLinkProps<TState>, "ref">;

export function removePathPrefix(pathname: string): string {
  const pathPrefix = withPrefix("/");
  if (pathname.startsWith(pathPrefix)) {
    return pathname.replace(pathPrefix, "/");
  }
  return pathname;
}

export const Link: React.FC<Props<unknown>> = (props) => {
  const { to, ...rest } = props;
  const { currentLanguage } = useContext(I18nextContext);
  const realPath = `/${currentLanguage}${to}`;
  return <GatsbyLink {...rest} to={realPath} hrefLang={currentLanguage} />;
};
