import React from 'react';

import Icon from '@plone/volto/components/theme/Icon/Icon';
import downloadSVG from '@plone/volto/icons/download.svg';

const DownloadButton = (props) => {
  const createBlockStyleButton = props.draftJsCreateBlockStyleButton.default;

  return createBlockStyleButton({
    blockType: 'download-button',
    children: <Icon name={downloadSVG} size="24px" />,
  });
};
export default DownloadButton;
