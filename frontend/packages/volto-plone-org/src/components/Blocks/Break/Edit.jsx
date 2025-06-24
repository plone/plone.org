/**
 * Edit Break block.
 * @module components/ItaliaTheme/Blocks/Break/Edit
 */

import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

class Edit extends Component {
  render() {
    return (
      <div className="block break-block">
        - <FormattedMessage id="Page break" defaultMessage="Page break" /> -
      </div>
    );
  }
}

export default Edit;
