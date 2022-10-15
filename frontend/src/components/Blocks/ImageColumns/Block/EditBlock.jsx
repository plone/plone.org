/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { flattenToAppURL } from '@plone/volto/helpers';
import { UniversalLink } from '@plone/volto/components';

import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';

const EditBlock = ({
  data,
  index,
  focusOn,
  setFocusOn,
  onChange,
  selected,
}) => {
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

  return __SERVER__ ? (
    <div />
  ) : (
    <div className="column-block" key={'column' + data.block + data.index}>
      {!image && (
        <div className="placeholder">
          <img src={imageBlockSVG} alt="" />
        </div>
      )}

      {image && data.href?.[0] ? (
        <UniversalLink item={data.href[0]}>{image}</UniversalLink>
      ) : image ? (
        image
      ) : (
        <></>
      )}
    </div>
  );
};

export default React.memo(EditBlock);
