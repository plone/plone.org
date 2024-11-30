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
import MembershipControlPanel from './components/Controlpanels/MembershipControlPanel';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import * as IconsRegular from '@fortawesome/free-regular-svg-icons';
import { CustomCSS } from 'volto-plone-org/components';
import { SiteBlocks } from 'volto-plone-org/config/Blocks';
import { SiteWidgets } from 'volto-plone-org/config/Widgets';
import { SiteViews } from 'volto-plone-org/config/Views';
import applyAccordionConfig from 'volto-plone-org/config/Accordion/config';
import groupSVG from '@plone/volto/icons/group.svg';

faConfig.autoAddCss = false;
const iconList = Object.keys(Icons.fas).map((icon) => Icons[icon]);
const iconListRegular = Object.keys(IconsRegular.far).map(
  (icon) => IconsRegular[icon],
);

library.add(...iconList, ...iconListRegular);

const additionalExpressMiddlewareServerConfig =
  typeof __SERVER__ !== 'undefined' && __SERVER__
    ? require('./express-middleware').default
    : false;

export default function applyConfig(config) {
  config = applyAccordionConfig(config);

  config.addonRoutes = [
    ...(config.addonRoutes || []),
    {
      path: '/controlpanel/membership',
      component: MembershipControlPanel,
    },
  ];

  config.settings = {
    ...config.settings,
    isMultilingual: false,
    supportedLanguages: ['en'],
    defaultLanguage: 'en',
    showTags: false,
    matomoSiteId: '9',
    matomoUrlBase: 'https://stats.plone.org/',
    controlpanels: [
      ...config.settings.controlpanels,
      {
        '@id': '/membership',
        group: 'Plone Foundation',
        title: 'Membership',
      },
    ],
    controlPanelsIcons: {
      ...config.settings.controlPanelsIcons,
      membership: groupSVG,
    },
    nonContentRoutes: [
      ...config.settings.nonContentRoutes,
      '/controlpanel/membership',
    ],
    appExtras: [
      ...config.settings.appExtras,
      {
        match: '',
        component: () => <style type="text/css">{faDom.css()}</style>, //load fontawesom dom css
      },
      { match: '', component: CustomCSS },
    ],
    serverConfig: {
      ...config.settings.serverConfig,
      extractScripts: {
        ...config.settings.serverConfig.extractScripts,
        errorPages: true,
      },
    },
  };

  if (additionalExpressMiddlewareServerConfig) {
    config.settings.expressMiddleware = [
      ...config.settings.expressMiddleware,
      ...additionalExpressMiddlewareServerConfig,
    ];
  }

  config.blocks.blocksConfig.__grid = {
    ...config.blocks.blocksConfig.__grid,
    gridAllowedBlocks: ['teaser', 'image', 'slate', 'html'],
  };

  config.settings['volto-gdpr-privacy'].defaultPanelConfig = {
    ...config.settings['volto-gdpr-privacy'].defaultPanelConfig,
    last_updated: '2022-12-10T00:07:00+00:00',
    text: {
      en: {
        title: 'This site uses cookies',
        description:
          'For this website we use cookies for anonymous analytics gathering and show external content. You can also enable third parties independently.',
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
        config.settings?.['volto-gdpr-privacy']?.defaultPanelConfig?.profiling
          .choices,
    },
  };

  SiteBlocks(config); //blocks configuration for Plone.org
  SiteWidgets(config); //widgets configuration for Plone.org
  SiteViews(config); //views configuration for Plone.org

  return config;
}
