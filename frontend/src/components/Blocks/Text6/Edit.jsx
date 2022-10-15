import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useIntl, defineMessages } from 'react-intl';
import { isEqual } from 'lodash';
import { Input } from 'semantic-ui-react';
import { SidebarPortal, UniversalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import { TextEditorWidget } from '@package/components/Widgets';
import { Button, ShareButtons, PresetWrapper } from '@package/components';

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

  cta_title_default: {
    id: 'cta_title_default',
    defaultMessage: 'Go to content',
  },
});

const Edit = (props) => {
  const { data, selected, block, onChangeBlock } = props;
  const intl = useIntl();
  const [focusOn, setFocusOn] = useState('title');
  let href = data.link_to ? flattenToAppURL(data.link_to[0]?.['@id']) : null;

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
      className={cx('block-text6', {
        'text-center': data.alignCenter,
      })}
      tabIndex="0"
      onClick={(e) => {
        focusField(null);
      }}
      onKeyDown={onKeyDown}
      role="textbox"
    >
      <div className="block-content">
        <div className="block-content-header">
          <h3
            className={cx('title', {
              'hide-decoration': data.showTitleDecoration === false,
            })}
          >
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
          </h3>
          {data.share_social && (
            <div className="content-social">
              <ShareButtons showLabel={false} />
            </div>
          )}
        </div>
        <div className="content">
          {/* eslint-disable-next-line */}
          <p
            onClick={(e) => {
              focusField('content');
              e.stopPropagation();
            }}
          >
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
            />
          </p>
        </div>
        {data.have_cta && (
          <div className="box-cta">
            <Button
              as={UniversalLink}
              color={data.bg_color === 'blue' ? 'white' : 'blue'}
              size="large"
              href={href}
              arrow={true}
            >
              {data.cta_title ?? intl.formatMessage(messages.cta_title_default)}
            </Button>
          </div>
        )}
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
    bg_color: PropTypes.string,
    fullWidth: PropTypes.bool,
    have_cta: PropTypes.bool,
    share_social: PropTypes.bool,
    cta_title: PropTypes.string,
    link_to: PropTypes.any,
    alignCenter: PropTypes.bool,
  }),
  selected: PropTypes.bool.isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default Edit;
