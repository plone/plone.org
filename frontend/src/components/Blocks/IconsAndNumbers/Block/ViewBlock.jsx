/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import redraft from 'redraft';
import { flattenToAppURL } from '@plone/volto/helpers';

import config from '@plone/volto/registry';

const ViewBlock = ({ data }) => {
  const icon = data.iconImage; //data.icon
  return data.title || data.number || icon ? (
    <div className="column-block">
      {!icon ? (
        <div className="number">{data.number}</div>
      ) : (
        <div className="icon">
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
        {redraft(
          data.text,
          config.settings.richtextViewSettings.ToHTMLRenderers,
          config.settings.richtextViewSettings.ToHTMLOptions,
        )}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default React.memo(ViewBlock);
