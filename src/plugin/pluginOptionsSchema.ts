import {PluginOptionsSchemaArgs} from 'gatsby';
import {ObjectSchema} from 'gatsby-plugin-utils';

export function pluginOptionsSchema(args: PluginOptionsSchemaArgs): ObjectSchema {
  const {Joi} = args;
  return Joi.object({
    languages: Joi.array().description('Languages available'),
    defaultLanguage: Joi.string().description('The default language').required(),
    siteUrl: Joi.string().description('The URL for the site').required(),
    i18nextOptions: Joi.any().description('Options for i18next'),
    localeJsonSourceName: Joi.string().description(
      'Name of the locales source for local translations'
    )
  });
}
