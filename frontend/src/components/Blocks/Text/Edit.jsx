/*It's simpy a wrapper for Volto Text block, to add background */

import React from 'react';
import { SidebarPortal } from '@plone/volto/components';
import VoltoEditTextBlock from '@plone/volto/components/manage/Blocks/Text/Edit';
import { PresetWrapper, ShareButtons } from '@package/components';

import Sidebar from './Sidebar';

const Edit = (props) => {
  if (__SERVER__) {
    return <div />;
  }

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
      <VoltoEditTextBlock {...props} />
      <SidebarPortal selected={props.selected}>
        <Sidebar
          {...props.data}
          onChange={(fieldName, value) => {
            props.onChangeBlock(props.block, {
              ...props.data,
              [fieldName]: value,
            });
          }}
        />
      </SidebarPortal>
    </PresetWrapper>
  );
};

export default Edit;
