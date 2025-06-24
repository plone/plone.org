/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { flattenToAppURL } from '@plone/volto/helpers';
import { UniversalLink } from '@plone/volto/components';

const ViewBlock = ({ data }) => {
  const image = data.image ? (
    <div className="icon">
      <img
        src={flattenToAppURL(data.image) + '/@@images/image'}
        alt=""
        role="presentation"
        aria-hidden="true"
      />
    </div>
  ) : null;

  return image ? (
    <div className="column-block" key={'view' + data.index}>
      {image && data.href?.[0] ? (
        <UniversalLink item={data.href[0]}>{image}</UniversalLink>
      ) : image ? (
        image
      ) : (
        <></>
      )}
    </div>
  ) : (
    <></>
  );
};

export default React.memo(ViewBlock);
