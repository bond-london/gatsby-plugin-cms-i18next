import { InitOptions } from "i18next";
import { NodeInput } from "gatsby";

export type PluginOptions = {
  languages: string[];
  defaultLanguage: string;
  siteUrl: string;
  i18nextOptions: InitOptions;
  localeJsonSourceName: string;
};

export type I18NextContext = {
  currentLanguage: string;
  defaultLanguage: string;
  languages: string[];
  siteUrl: string;
};

export type InputPageContext = {
  id: string;
  language: string;
  corePath: string;
  resourcesJson: string;
  defaultLanguage: string;
};
export type PageContext = InputPageContext & {
  i18n: I18NextContext;
};

export interface I18SitePage {
  path: string;
}

export interface I18PagesContext {
  sitePages: readonly I18SitePage[];
}

// Taken from https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-filesystem/index.d.ts
// No way to refer it without directly depending on gatsby-source-filesystem.
export interface FileSystemNode extends Record<string, unknown> {
  absolutePath: string;
  accessTime: string;
  birthTime: Date;
  changeTime: string;
  extension: string;
  modifiedTime: string;
  prettySize: string;
  relativeDirectory: string;
  relativePath: string;
  sourceInstanceName: string;

  // parsed path typings
  base: string;
  dir: string;
  ext: string;
  name: string;
  root: string;

  // stats
  atime: Date;
  atimeMs: number;
  /**
   * @deprecated Use `birthTime` instead
   */
  birthtime: Date;
  /**
   * @deprecated Use `birthTime` instead
   */
  birthtimeMs: number;
  ctime: Date;
  ctimeMs: number;
  gid: number;
  mode: number;
  mtime: Date;
  mtimeMs: number;
  size: number;
  uid: number;
}

export interface LocaleNodeInput extends NodeInput {
  language: string;
  ns: string;
  data: string;
  fileAbsolutePath: string;
}

export interface LocaleNode extends LocaleNodeInput {
  parent: string;
  children: string[];
  internal: NodeInput["internal"] & {
    owner: string;
  };
}
