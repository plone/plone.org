/* eslint-disable react-hooks/exhaustive-deps */
/**
 * View icons block.
 * @module components/manage/Blocks/IconsBlocks/View
 */

import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Body from './Body';
import { TextBlockView } from '@plone/volto-slate/blocks/Text';

/**
 * View icons blocks class.
 * @class View
 * @extends Component
 */
const View = ({ data }) => {
  return (
    <div className="block slider">
      {data.showMainTitleAndDescription && (
        <>
          {(data.title || data.description) && (
            <div className="block-content-header">
              {data.title && <div className={cx('title')}>{data.title}</div>}
              {data.description && (
                <div className="description">
                  <TextBlockView data={{ value: data.description }} />
                </div>
              )}
            </div>
          )}
        </>
      )}

      <Body {...data} />
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
