/**
 * Footer component.
 * @module components/theme/Footer/Footer
 */

import React from 'react';
import { Container, List, Segment, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';

const messages = defineMessages({
  copyright: {
    id: 'Copyright',
    defaultMessage: 'Copyright',
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
    <Segment
      role="contentinfo"
      vertical
      padded
      inverted
      color="grey"
      textAlign="center"
      id="footer"
    >
      <Container>
        <Grid textAlign="left" columns={4}>
          <Grid.Column>
            <List inverted>
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
            <List inverted>
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
            <List inverted>
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
                  <a href="https://twitter.com/plone">Twitter</a>
                </List.Item>
                <List.Item>
                  <a href="https://www.instagram.com/plonecms/">Instagram</a>
                </List.Item>
                <List.Item>
                  <a href="https://www.youtube.com/c/PloneCMS">YouTube</a>
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
        <Segment basic inverted color="grey" className="discreet">
          <FormattedMessage
            id="The {plonecms} is {copyright} 2000-{current_year} by the {plonefoundation} and friends."
            defaultMessage="The {plonecms} is {copyright} 2000-{current_year} by the {plonefoundation} and friends."
            values={{
              plonecms: (
                <FormattedMessage
                  id="Plone{reg} Open Source CMS/WCM"
                  defaultMessage="Plone{reg} Open Source CMS/WCM"
                  values={{ reg: <sup>®</sup> }}
                />
              ),
              copyright: (
                <abbr title={intl.formatMessage(messages.copyright)}>©</abbr>
              ),
              current_year: new Date().getFullYear(),
              plonefoundation: (
                <a className="item" href="http://plone.org/foundation">
                  <FormattedMessage
                    id="Plone Foundation"
                    defaultMessage="Plone Foundation"
                  />
                </a>
              ),
            }}
          />{' '}
          <FormattedMessage
            id="Distributed under the {license}."
            defaultMessage="Distributed under the {license}."
            values={{
              license: (
                <a
                  className="item"
                  href="http://creativecommons.org/licenses/GPL/2.0/"
                >
                  <FormattedMessage
                    id="GNU GPL license"
                    defaultMessage="GNU GPL license"
                  />
                </a>
              ),
            }}
          />
        </Segment>
      </Container>
    </Segment>
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
