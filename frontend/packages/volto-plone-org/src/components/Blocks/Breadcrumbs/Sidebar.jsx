import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

import { CheckboxWidget } from '@plone/volto/components';
const Sidebar = (props) => {
  const { data, block, onChangeBlock } = props;

  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="Breadcrumbs" defaultMessage="Breadcrumbs" />:
        </h2>
      </header>

      <Segment className="form sidebar-listing-data">
        <CheckboxWidget
          id="background"
          title="Grey background"
          value={data.background ? data.background : false}
          onChange={(name, value) => {
            onChangeBlock(block, { ...data, [name]: value });
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
  openObjectBrowser: PropTypes.func.isRequired,
};

export default Sidebar;
