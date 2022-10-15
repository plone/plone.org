import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { CheckboxWidget, ObjectBrowserWidget } from '@plone/volto/components';

const messages = defineMessages({
  showBgGrey: {
    id: 'greyBg',
    defaultMessage: 'Set grey background',
  },
  fullwidthLabel: {
    id: 'full-width',
    defaultMessage: 'Full width',
  },
  linkedItemsLabel: {
    id: 'Linked items',
    defaultMessage: 'Linked items',
  },
});

const Sidebar = (props) => {
  const intl = useIntl();
  const { data, block, onChangeBlock } = props;

  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="LinkedItems" defaultMessage="Linked items" />:
        </h2>
      </header>

      <Segment className="form sidebar-listing-data">
        <CheckboxWidget
          id="background"
          title={intl.formatMessage(messages.showBgGrey)}
          value={data.background ? data.background : false}
          onChange={(name, value) => {
            onChangeBlock(block, { ...data, [name]: value });
          }}
        />
        <CheckboxWidget
          id="fullwidth"
          title={intl.formatMessage(messages.fullwidthLabel)}
          value={data.fullwidth ? data.fullwidth : false}
          onChange={(name, value) => {
            onChangeBlock(block, { ...data, [name]: value });
          }}
        />
        <ObjectBrowserWidget
          id="links"
          title={intl.formatMessage(messages.linkedItemsLabel)}
          mode="multiple"
          allowExternals={true}
          value={data.links}
          onChange={(name, value) => {
            onChangeBlock(block, {
              ...data,
              links: value,
            });
          }}
        />
      </Segment>
    </Segment.Group>
  );
};

Sidebar.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default Sidebar;
