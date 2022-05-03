import React from 'react';

import Icon from '@plone/volto/components/theme/Icon/Icon';
import formatSVG from '@plone/volto/icons/format.svg';

const LightButton = (props) => {
  const createInlineStyleButton = props.draftJsCreateInlineStyleButton.default;

  return createInlineStyleButton({
    style: 'TEXT_LIGHT',
    children: <Icon name={formatSVG} size="24px" title="Testo light" />,
  });
};

export default LightButton;
