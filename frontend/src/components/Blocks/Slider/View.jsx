/* eslint-disable react-hooks/exhaustive-deps */
/**
 * View icons block.
 * @module components/manage/Blocks/IconsBlocks/View
 */

import React from 'react';
import cx from 'classnames';
import redraft from 'redraft';
import PropTypes from 'prop-types';
import Body from './Body';
import config from '@plone/volto/registry';
/**
 * View icons blocks class.
 * @class View
 * @extends Component
 */
const View = ({ data }) => {
  const checkHasContent = (content) => {
    if (content) {
      let blocks = content.blocks.filter((block) => block?.text !== '');
      return blocks.length > 0 ? true : false;
    }
  };
  return (
    <div className="block slider">
      {data.showMainTitleAndDescription && (
        <>
          {(data.title || checkHasContent(data.description)) && (
            <div className="block-content-header">
              {data.title && <div className={cx('title')}>{data.title}</div>}
              {checkHasContent(data.description) && (
                <div className="description">
                  {redraft(
                    data.description,
                    config.settings.richtextViewSettings.ToHTMLRenderers,
                    config.settings.richtextViewSettings.ToHTMLOptions,
                  )}
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
