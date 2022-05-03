/**
 * Footer component.
 * @module components/theme/Footer/Footer
 */

import React from 'react';
import { Container } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { Logo, UniversalLink, Anontools } from '@plone/volto/components';
import { SocialLinks } from 'volto-social-settings';

import Button from '@package/components/Button/Button';

import { getItemsByPath } from 'volto-dropdownmenu/utils';
import { displayBanner } from 'volto-gdpr-privacy';

const messages = defineMessages({
  copyright: {
    id: 'Copyright',
    defaultMessage: 'Copyright',
  },
  cookieSettings: {
    id: 'Cookie settings',
    defaultMessage: 'Cookie settings',
  },
  try: {
    id: 'Try',
    defaultMessage: 'Try',
  },
  privacyAndCookies: {
    id: 'Privacy and Cookies',
    defaultMessage: 'Privacy e Cookie',
  },
  legal: {
    id: 'Legal',
    defaultMessage: 'Legal',
  },
  contacts: {
    id: 'Contacts',
    defaultMessage: 'Contacts',
  },
  login: {
    id: 'Login',
    defaultMessage: 'Login',
  },
  footerInfos: {
    id: 'Footer infos',
    defaultMessage:
      'The text and illustrations in this website are licensed by the Plone Foundation under a Creative Commons Attribution-ShareAlike 4.0 International license. Plone and the Plone® logo are registered trademarks of the Plone Foundation, registered in the United States and other countries. For guidelines on the permitted uses of the Plone trademarks, see https://plone.org/foundation/logo. All other trademarks are owned by their respective owners.',
  },
});

/**
 * Component to display the footer.
 * @function Footer
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component
 */
const Footer = ({ pathanme }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userSession.token);
  const dropdownMenuNavItems = useSelector(
    (state) => state.dropdownMenuNavItems?.result,
  );

  let p = '/' + intl.locale;

  const menu = getItemsByPath(dropdownMenuNavItems, p).filter(
    (m) => !m.additionalClasses || m.additionalClasses?.indexOf('home') < 0,
  );

  return (
    <div id="footer">
      <Container>
        <div id="footer-main">
          {menu.map((m, i) => {
            const link =
              m.mode === 'dropdown' ? m.showMoreLink?.[0] : m.linkUrl?.[0];
            return (
              <div className="footer-column" key={i}>
                <h4>
                  {link ? (
                    <UniversalLink item={link}>{m.title}</UniversalLink>
                  ) : (
                    m.title
                  )}
                </h4>
                {m.navigationRoot?.length > 0 && (
                  <ul>
                    {m.navigationRoot.map((nr, ii) => (
                      <li key={i + '-' + ii}>
                        <UniversalLink item={nr}>{nr.title}</UniversalLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}

          <div className="footer-column">
            <Button
              color="outline-blue"
              size="tiny"
              as={UniversalLink}
              href="/try"
              arrow={true}
            >
              {intl.formatMessage(messages.try)}{' '}
            </Button>
            <SocialLinks />
            <ul>
              <li>
                <button
                  className="footer-gdpr-privacy-show-banner"
                  onClick={(e) => {
                    dispatch(displayBanner(true, true));
                  }}
                  title={intl.formatMessage(messages.cookieSettings)}
                >
                  {intl.formatMessage(messages.cookieSettings)}
                </button>
              </li>
              <li>
                <UniversalLink href="/privacy-and-cookies">
                  {intl.formatMessage(messages.privacyAndCookies)}
                </UniversalLink>
              </li>
              <li>
                <UniversalLink href="/legal">
                  {intl.formatMessage(messages.legal)}
                </UniversalLink>
              </li>
              <li>
                <UniversalLink href="/contacts">
                  {intl.formatMessage(messages.contacts)}
                </UniversalLink>
              </li>
              {/* <li>
                <UniversalLink href="/login">
                  {intl.formatMessage(messages.login)}
                </UniversalLink>

               
              </li> */}
            </ul>
            {!token && (
              <div className="tools">
                <Anontools />
              </div>
            )}
          </div>
        </div>
      </Container>

      <div id="footer-small-wrapper">
        <Container>
          <div id="footer-small">
            <div className="logo">
              <Logo />
            </div>
            <div className="address">
              {intl.formatMessage(messages.footerInfos)}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Footer.propTypes = {
  /**
   * i18n object
   */
};

export default Footer;
