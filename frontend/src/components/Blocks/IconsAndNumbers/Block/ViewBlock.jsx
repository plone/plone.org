/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { flattenToAppURL } from '@plone/volto/helpers';
import { TextBlockView } from '@plone/volto-slate/blocks/Text';

const ViewBlock = ({ data }) => {
  const icon = data.iconImage; //data.icon
  return data.title || data.number || icon ? (
    <div className="column-block">
      {!icon ? (
        <div className="number">{data.number}</div>
      ) : (
        <div className="icon">
          <FontAwesomeIcon icon={['fas', data.icon]} />
          <img
            src={flattenToAppURL(icon) + '/@@images/image/teaser'}
            alt=""
            role="presentation"
            aria-hidden="true"
          />
        </div>
      )}

      {data.title && <div className="column-title">{data.title}</div>}

      <div className="column-text">
        <TextBlockView data={{ value: data.text }} />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default React.memo(ViewBlock);
