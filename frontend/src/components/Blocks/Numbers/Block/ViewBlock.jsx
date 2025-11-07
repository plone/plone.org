/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { flattenToAppURL } from '@plone/volto/helpers';
import { TextBlockView } from '@plone/volto-slate/blocks/Text';

const ViewBlock = ({ data }) => {
  return data.title || data.number ? (
    <div className="number-block">
      {data.title && <div className="number-title">{data.title}</div>}
      <div className="number-content">
        {data.number && (
          <div className="number">
            {data.number}
            {data.icon && (
              <span className="icon">
                <FontAwesomeIcon icon={['fas', data.icon]} />
              </span>
            )}

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
          <TextBlockView data={{ value: data.text }} />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default React.memo(ViewBlock);
