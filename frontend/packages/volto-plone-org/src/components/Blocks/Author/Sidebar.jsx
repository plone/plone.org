import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import { CheckboxWidget } from '@plone/volto/components';

const messages = defineMessages({
  autore: {
    id: 'Author',
    defaultMessage: 'Author',
  },
  greyBg: {
    id: 'greyBg',
    defaultMessage: 'Set grey background',
  },
  fullWidth: {
    id: 'fullWidth',
    defaultMessage: 'Set full-width background',
  },
});

const Sidebar = ({ greyBg, fullWidth, showImageAuthor, onChange }) => {
  const intl = useIntl();

  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="autore" defaultMessage="Autore" />
        </h2>
      </header>
      <Segment className="form sidebar-listing-data">
        <CheckboxWidget
          id="greyBg"
          title={intl.formatMessage(messages.greyBg)}
          value={greyBg ?? false}
          onChange={onChange}
        />
        <CheckboxWidget
          id="fullWidth"
          title={intl.formatMessage(messages.fullWidth)}
          value={fullWidth ?? false}
          onChange={onChange}
        />
      </Segment>
    </Segment.Group>
  );
};

Sidebar.propTypes = {
  greyBg: PropTypes.bool,
  fullWidth: PropTypes.bool,
  onChange: PropTypes.func,
};
export default Sidebar;
