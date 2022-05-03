import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

import { TextBlockStyleSidebar } from '@package/components';

const Sidebar = (props) => {
  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="Text" defaultMessage="Text" />
        </h2>
      </header>
      <TextBlockStyleSidebar {...props} titleColorOptions={[]} />
    </Segment.Group>
  );
};

Sidebar.propTypes = {
  fullWidth: PropTypes.bool,
  bg_color: PropTypes.string,
  title_color: PropTypes.string,
  share_social: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default Sidebar;
