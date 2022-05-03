/**
 * Edit icons block.
 * @module components/manage/Blocks/Title/Edit
 */

import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { Input } from 'semantic-ui-react';
import { useIntl, defineMessages } from 'react-intl';
import { SidebarPortal } from '@plone/volto/components';
import Sidebar from './Sidebar';
import Body from './Body';
import { TextEditorWidget } from '@package/components/Widgets';
import { v4 as uuid } from 'uuid';

const messages = defineMessages({
  titlePlaceholder: {
    id: 'Title placeholder',
    defaultMessage: 'Title...',
  },
  textPlaceholder: {
    id: 'Text placeholder',
    defaultMessage: 'Type text...',
  },
});

const Edit = (props) => {
  const intl = useIntl();
  const [focusOn, setFocusOn] = useState('title');

  useEffect(() => {
    if ((props.data.slides ?? []).length === 0) {
      props.onChangeBlock(props.block, {
        ...props.data,
        fullwidth: true,
        slides: [
          {
            '@id': uuid(),
            content_as_default: true,
            item_bg_color: 'light-grey',
          },
        ],
      });
    }
  }, []);

  const focusField = (field) => {
    setFocusOn(field);

    if (!props.selected) {
      props.onSelectBlock(block);
    }
  };

  return __SERVER__ ? (
    <div />
  ) : (
    <>
      {props.data.showMainTitleAndDescription && (
        <div className="block-content-header">
          <div className={cx('title')}>
            <Input
              fluid
              transparent
              placeholder={intl.formatMessage(messages.titlePlaceholder)}
              value={props.data.title || ''}
              name="title"
              onChange={(e) =>
                props.onChangeBlock(props.block, {
                  ...props.data,
                  title: e.target.value,
                })
              }
            />
          </div>
          <TextEditorWidget
            data={props.data}
            fieldName="description"
            onChangeBlock={(v) => {
              props.onChangeBlock(props.block, {
                ...props.data,
                description: v.description,
              });
            }}
            placeholder={intl.formatMessage(messages.textPlaceholder)}
            setFocus={(f) => focusField(f)}
            selected={focusOn === 'description'}
            showToolbar={true}
          />
        </div>
      )}

      <Body {...props.data} properties={props.properties} />

      <SidebarPortal selected={props.selected}>
        <Sidebar {...props} />
      </SidebarPortal>
    </>
  );
};

export default Edit;
