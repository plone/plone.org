import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import { CheckboxWidget } from '@plone/volto/components';
import { TextBlockStyleSidebar } from '@package/components';
const messages = defineMessages({
  text4AlignLeft: {
    id: 'text4AlignLeft',
    defaultMessage: 'Align title on left',
  },
});

const Sidebar = (props) => {
  const { alignLeft, onChange } = props;
  const intl = useIntl();

  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="Text 4" defaultMessage="Text 4" />
        </h2>
      </header>

      <TextBlockStyleSidebar {...props} />

      <Segment className="form sidebar-listing-data">
        <CheckboxWidget
          id="alignLeft"
          title={intl.formatMessage(messages.text4AlignLeft)}
          value={alignLeft ?? false}
          onChange={onChange}
        />
      </Segment>
    </Segment.Group>
  );
};

Sidebar.propTypes = {
  fullWidth: PropTypes.bool,
  bg_color: PropTypes.string,
  title_color: PropTypes.string,
  share_social: PropTypes.bool,
  alignLeft: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default Sidebar;
