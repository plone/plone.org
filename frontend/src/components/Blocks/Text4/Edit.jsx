import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useIntl, defineMessages } from 'react-intl';
import { isEqual } from 'lodash';
import { Input } from 'semantic-ui-react';
import { SidebarPortal } from '@plone/volto/components';
import { TextEditorWidget } from '@package/components/Widgets';
import { PresetWrapper, ShareButtons } from '@package/components';
import Sidebar from './Sidebar';

const messages = defineMessages({
  titlePlaceholder: {
    id: 'Title placeholder',
    defaultMessage: 'Title...',
  },
  textPlaceholder: {
    id: 'Text placeholder',
    defaultMessage: 'Text...',
  },
});

const Edit = (props) => {
  const { data, selected, block, onChangeBlock } = props;
  const intl = useIntl();
  const [focusOn, setFocusOn] = useState('title');

  const onChange = (obj, fieldName) => {
    if (!isEqual(obj[fieldName], data[fieldName])) {
      onChangeBlock(block, {
        ...data,
        [fieldName]: obj[fieldName],
      });
    }
  };

  if (__SERVER__) {
    return <div />;
  }

  const onKeyDown = (e) => {
    if (!focusOn) {
      //nessun campo selezionato
      props.handleKeyDown(e, props.index, props.id, props.blockNode.current);
    }
    e.stopPropagation();
  };

  const focusField = (field) => {
    setFocusOn(field);

    if (!selected) {
      props.onSelectBlock(block);
    }
  };

  return (
    <PresetWrapper
      {...props.data}
      usePresetDefaults={false}
      className={cx('block-text4', {
        'align-left': data.alignLeft,
      })}
      onClick={(e) => {
        focusField(null);
      }}
      onKeyDown={onKeyDown}
      tabIndex="0"
      role="textbox"
    >
      <div className="block-content">
        <div className="block-content-header">
          <div className="title">
            <Input
              fluid
              className="input-title"
              transparent
              placeholder={intl.formatMessage(messages.titlePlaceholder)}
              value={data.title || ''}
              onClick={(e) => {
                focusField('title');
                e.stopPropagation();
              }}
              onChange={(e) => onChange({ title: e.target.value }, 'title')}
            />
          </div>
          {data.share_social && (
            <div className="content-social">
              <ShareButtons showLabel={false} />
            </div>
          )}
        </div>
        {/* eslint-disable-next-line */}
        <div className="columns-wrapper">
          <div onClick={() => focusField('content')} className="column">
            <TextEditorWidget
              data={data}
              fieldName="content"
              selected={selected && focusOn === 'content'}
              block={block}
              onChangeBlock={(data) => onChange(data, 'content')}
              placeholder={intl.formatMessage(messages.textPlaceholder)}
              prevFocus="title"
              setFocus={(f) => focusField(f)}
              showToolbar={true}
              key="content"
              disableMoveToNearest={true}
            />
          </div>
          <div onClick={() => focusField('content1')} className="column">
            <TextEditorWidget
              data={data}
              fieldName="content1"
              selected={selected && focusOn === 'content1'}
              block={block}
              onChangeBlock={(data) => onChange(data, 'content1')}
              placeholder={intl.formatMessage(messages.textPlaceholder)}
              prevFocus="content"
              setFocus={(f) => focusField(f)}
              showToolbar={true}
              key="content1"
              disableMoveToNearest={true}
            />
          </div>
        </div>
      </div>
      <SidebarPortal selected={selected}>
        <Sidebar
          {...data}
          onChange={(fieldName, value) => {
            onChangeBlock(block, {
              ...data,
              [fieldName]: value,
            });
          }}
        />
      </SidebarPortal>
    </PresetWrapper>
  );
};

Edit.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.object,
    greyBg: PropTypes.bool,
    alignLeft: PropTypes.bool,
    share_social: PropTypes.bool,
  }),
  selected: PropTypes.bool.isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default Edit;
