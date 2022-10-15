import React from 'react';

import VoltoViewTextBlock from '@plone/volto/components/manage/Blocks/Text/View';
import { PresetWrapper, ShareButtons } from '@package/components';

const View = (props) => {
  return (
    <PresetWrapper
      {...props.data}
      usePresetDefaults={false}
      className="text-block-wrapper"
    >
      {props.data.share_social && (
        <div className="content-social">
          <ShareButtons showLabel={false} />
        </div>
      )}
      <VoltoViewTextBlock {...props} />
    </PresetWrapper>
  );
};

export default View;
