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
import {
  config as faConfig,
  dom as faDom,
  library,
} from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import * as IconsRegular from '@fortawesome/free-regular-svg-icons';
import { CustomCSS } from '@package/components';
import { SiteBlocks } from '@package/config/Blocks';
import { SiteWidgets } from '@package/config/Widgets';
import { SiteViews } from '@package/config/Views';
import applyRichTextConfig from '@package/config/RichTextEditor/config';
import applyAccordionConfig from '@package/config/Accordion/config';
import '@plone/volto/config';

faConfig.autoAddCss = false;
const iconList = Object.keys(Icons.fas).map((icon) => Icons[icon]);
const iconListRegular = Object.keys(IconsRegular.far).map(
  (icon) => IconsRegular[icon],
);

library.add(...iconList, ...iconListRegular);

export default function applyConfig(config) {
  config = applyRichTextConfig(config);
  config = applyAccordionConfig(config);

  config.settings = {
    ...config.settings,
    isMultilingual: false,
    supportedLanguages: ['en'],
    defaultLanguage: 'en',
    showTags: false,
    matomoSiteId: '9',
    matomoUrlBase: 'https://stats.ploneconf.org/',
    appExtras: [
      ...config.settings.appExtras,
      {
        match: '',
        component: () => <style type="text/css">{faDom.css()}</style>, //load fontawesom dom css
      },
      { match: '', component: CustomCSS },
    ],
  };

  config.blocks.blocksConfig.__grid = {
    ...config.blocks.blocksConfig.__grid,
    gridAllowedBlocks: ['teaser', 'image', 'slate', 'html'],
  };

  config.settings['volto-gdpr-privacy'].defaultPanelConfig = {
    ...config.settings['volto-gdpr-privacy'].defaultPanelConfig,
    last_updated: '2022-12-10T00:07:00+00:00',
    text: {
      en: {
        title: 'Privacy settings',
        description: 'Please update your preferred privacy settings below.',
      },
    },
    technical: {
      text: {
        en: {
          title: 'Required cookies',
          description:
            'This website uses cookies for visitor analytics and login functionality. No personal identifiable information is collected or exchanged with third parties.',
        },
      },
      choices: [
        {
          config_key: 'MATOMO',
          text: {
            en: {
              title: 'Anonymous analytics with Matomo',
              description:
                'We host and use our own instance of Matomo, an open source application for anonymous visitor analytics.',
            },
          },
        },
      ],
    },
    profiling: {
      text: {
        en: {
          title: 'Third party integrations',
          description:
            'To show rich content from other websites we use integrations from third parties. These might set cookies and collect personal data that can be used for profiling purposes across websites. You can disable individual services below.',
        },
      },
      choices:
        config.settings['volto-gdpr-privacy'].defaultPanelConfig.profiling
          .choices,
    },
  };

  SiteBlocks(config); //blocks configuration for Plone.org
  SiteWidgets(config); //widgets configuration for Plone.org
  SiteViews(config); //views configuration for Plone.org

  return config;
}
