/**
 * View image block.
 * @module components/manage/Blocks/Hero/View
 *
 * CUSTOMIZATIONS:
 * - the formattable description is displayed
 * - added wrapper to the image
 */

import React from 'react';
import PropTypes from 'prop-types';
import redraft from 'redraft';
import { flattenToAppURL } from '@plone/volto/helpers';
import { LinkMore } from '@plone/volto/components';
import config from '@plone/volto/registry';
/**
 * View image block class.
 * @class View
 * @extends Component
 */
const View = ({ data }) => (
  <div className="block hero">
    <div className="block-inner-wrapper">
      {data.url && (
        <div className="image-wrapper">
          <img
            src={`${flattenToAppURL(data.url)}/@@images/image`}
            alt=""
            className="hero-image"
            loading="lazy"
          />
        </div>
      )}
      <div className="hero-body">
        <div className="hero-text">
          {data.title && <h1>{data.title}</h1>}
          <p>
            {redraft(
              data.description,
              config.settings.richtextViewSettings.ToHTMLRenderers,
              config.settings.richtextViewSettings.ToHTMLOptions,
            )}
          </p>
        </div>
        <LinkMore data={data} />
      </div>
    </div>
  </div>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
