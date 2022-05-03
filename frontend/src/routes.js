/**
 * Routes.
 * @module routes
 */

import { App } from '@plone/volto/components';
import { defaultRoutes, multilingualRoutes } from '@plone/volto/routes';
import { PasswordReset, RequestPasswordReset } from '@plone/volto/components';

import config from '@plone/volto/registry';

/**
 * Routes array.
 * @array
 * @returns {array} Routes.
 */
const routes = [
  {
    path: '/',
    component: App, // Change this if you want a different component
    routes: [
      // Plone scrive `passwordreset` nel testo delle email,
      // ma Volto nativamente si aspetterebbe `password-reset` :/
      {
        path: `/(${config.settings?.supportedLanguages.join(
          '|',
        )})/passwordreset`,
        component: RequestPasswordReset,
        exact: true,
      },
      {
        path: `/(${config.settings?.supportedLanguages.join(
          '|',
        )})/passwordreset/:token`,
        component: PasswordReset,
        exact: true,
      },
      {
        path: '/passwordreset',
        component: RequestPasswordReset,
        exact: true,
      },
      {
        path: '/passwordreset/:token',
        component: PasswordReset,
        exact: true,
      },
      ...(config.addonRoutes || []),
      ...((config.settings?.isMultilingual && multilingualRoutes) || []),
      ...defaultRoutes,
    ],
  },
];

export default routes;
