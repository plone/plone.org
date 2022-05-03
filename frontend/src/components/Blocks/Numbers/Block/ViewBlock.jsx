/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import redraft from 'redraft';
import { flattenToAppURL } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

const ViewBlock = ({ data }) => {
  return data.title || data.number ? (
    <div className="number-block">
      {data.title && <div className="number-title">{data.title}</div>}
      <div className="number-content">
        {data.number && (
          <div className="number">
            {data.number}
            {/* {data.icon && (
              <span className="icon">
                <FontAwesomeIcon icon={['fas', data.icon]} />
              </span>
            )} */}

            {data.iconImage && (
              <span className="icon">
                <img
                  src={flattenToAppURL(data.iconImage) + '/@@images/image/tile'}
                  alt=""
                  role="presentation"
                  aria-hidden="true"
                />
              </span>
            )}
          </div>
        )}

        <div className="number-text">
          {redraft(
            data.text,
            config.settings.richtextViewSettings.ToHTMLRenderers,
            config.settings.richtextViewSettings.ToHTMLOptions,
          )}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default React.memo(ViewBlock);
