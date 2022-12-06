/**
 * Footer component.
 * @module components/theme/Footer/Footer
 */

import React from 'react';
import { Container, List, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Logo } from '@plone/volto/components';
import { defineMessages, injectIntl } from 'react-intl';

const messages = defineMessages({
  copyright: {
    id: 'Copyright',
    defaultMessage: 'Copyright',
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
const Footer = ({ intl }) => {
  return (
    <div id="footer">
      <Container>
        <div id="footer-main">
          <Grid textAlign="left" columns={4}>
            <Grid.Column>
              <List>
                <List.Header>
                  <Link to="/about-plone">About Plone</Link>
                </List.Header>
                <List.Content>
                  <List.Item>
                    <Link to="/try-plone">Try Plone</Link>
                  </List.Item>
                  <List.Item>
                    <Link to="/downloads">Download Plone</Link>
                  </List.Item>
                  <List.Item>
                    <a href="https://docs.plone.org">Documentation</a>
                  </List.Item>
                  <List.Item>
                    <a href="https://docs.plone.org">Training</a>
                  </List.Item>
                  <List.Item>
                    <Link to="/security">Security</Link>
                  </List.Item>
                  <List.Item>
                    <Link to="/roadmap">Roadmap</Link>
                  </List.Item>
                  <List.Item>
                    <a href="https://github.com/plone">Github</a>
                  </List.Item>
                </List.Content>
              </List>
            </Grid.Column>
            <Grid.Column>
              <List>
                <List.Header>
                  <Link to="/community">Community</Link>
                </List.Header>
                <List.Content>
                  <List.Item>
                    <a href="https://community.plone.org/">Forum</a>
                  </List.Item>
                  <List.Item>
                    <Link to="/commnity/chat">Chat</Link>
                  </List.Item>
                  <List.Item>
                    <Link to="/contribute">Contribute code</Link>
                  </List.Item>
                  <List.Item>
                    <a href="https://github.com/plone">Report an issue</a>
                  </List.Item>
                  <List.Item>
                    <Link to="/news">News and events</Link>
                  </List.Item>
                  <List.Item>
                    <a href="https://2021.ploneconf.org/">Conference</a>
                  </List.Item>
                </List.Content>
              </List>
            </Grid.Column>
            <Grid.Column>
              <List>
                <List.Header>
                  <Link to="/foundation">Foundation</Link>
                </List.Header>
                <List.Content>
                  <List.Item>
                    <Link to="/foundation/join">Join the foundation</Link>
                  </List.Item>
                  <List.Item>
                    <Link to="/foundation/board">Board</Link>
                  </List.Item>
                  <List.Item>
                    <Link to="/foundation/donate">Donate</Link>
                  </List.Item>
                  <List.Item>
                    <Link to="/foundation/sponsors">Sponsors</Link>
                  </List.Item>
                  <List.Item>
                    <Link to="/foundation/coc">Code of conduct</Link>
                  </List.Item>
                  <List.Item>
                    <Link to="/foundation/members">Foundation members</Link>
                  </List.Item>
                </List.Content>
              </List>
            </Grid.Column>
            <Grid.Column>
              <List inverted>
                <List.Header>
                  <Link to="/follow">Follow us</Link>
                </List.Header>
                <List.Content>
                  <List.Item>
                    <a href="https://plone.teemill.com/">Shop</a>
                  </List.Item>
                  <List.Item>
                    <a href="https://plone.social/@plone" rel="me">
                      Mastodon
                    </a>
                  </List.Item>
                  <List.Item>
                    <a href="https://twitter.com/plone">Twitter</a>
                  </List.Item>
                  <List.Item>
                    <a href="https://www.instagram.com/plonecms/">Instagram</a>
                  </List.Item>
                  <List.Item>
                    <a href="https://www.youtube.com/@plonecms">YouTube</a>
                  </List.Item>
                  <List.Item>
                    <a href="https://www.linkedin.com/company/plone-foundation/">
                      Linkedin
                    </a>
                  </List.Item>
                  <List.Item>
                    <a href="https://www.facebook.com/plonecms">Facebook</a>
                  </List.Item>
                </List.Content>
              </List>
            </Grid.Column>
          </Grid>
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

export default injectIntl(Footer);
