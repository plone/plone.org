import React from 'react';

import Icon from '@plone/volto/components/theme/Icon/Icon';
import arrowRightSVG from '@plone/volto/icons/ahead.svg';

const ArrowLink = (props) => {
  const createBlockStyleButton = props.draftJsCreateBlockStyleButton.default;

  return createBlockStyleButton({
    blockType: 'arrow',
    children: <Icon name={arrowRightSVG} size="24px" />,
  });
};

export default ArrowLink;
