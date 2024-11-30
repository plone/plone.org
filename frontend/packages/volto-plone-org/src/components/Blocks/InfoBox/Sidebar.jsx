import React from 'react';
import { Segment } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

const Sidebar = (props) => {
  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="infobox" defaultMessage="Info Box" />:
        </h2>
      </header>
    </Segment.Group>
  );
};

export default Sidebar;
