import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { CheckboxWidget } from '@plone/volto/components';

const messages = defineMessages({
  pagetag: {
    id: "Page's Tags",
    defaultMessage: "Page's Tags",
  },
  greyBg: {
    id: 'greyBg',
    defaultMessage: 'Set grey background',
  },
});

const Sidebar = (props) => {
  const intl = useIntl();
  const { block, data, onChangeBlock } = props;

  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>{intl.formatMessage(messages.pagetag)}:</h2>
      </header>

      <Segment className="form sidebar-listing-data">
        <CheckboxWidget
          id="greyBg"
          title={intl.formatMessage(messages.greyBg)}
          value={data.greyBg ?? false}
          onChange={(name, value) => {
            onChangeBlock(block, { ...data, [name]: value });
          }}
        />
      </Segment>
    </Segment.Group>
  );
};

Sidebar.propTypes = {
  greyBg: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Sidebar;
