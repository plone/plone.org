/**
 * Add your config changes here.
 * @module config
 * @example
 * export default function applyConfig(config) {
 *   config.settings = {
 *     ...config.settings,
 *     port: 4300,
 *     listBlockTypes: {
 *       ...config.settings.listBlockTypes,
 *       'my-list-item',
 *    }
 * }
 */
 import { VulnerabilityView, HotfixView } from './components';
// All your imports required for the config here BEFORE this line
import '@plone/volto/config';

export default function applyConfig(config) {
  config.settings = {
    ...config.settings,
    isMultilingual: false,
    supportedLanguages: ['en'],
    defaultLanguage: 'en',
  };
  config.views = {
    ...config.views,
    contentTypesViews: {
      ...config.views.contentTypesViews,
      hotfix: HotfixView,
      vulnerability: VulnerabilityView,
    },
  };
  return config;
}
