import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useIntl, defineMessages } from 'react-intl';
import { isEqual } from 'lodash';
import { Input, Grid, TextArea } from 'semantic-ui-react';

import { flattenToAppURL } from '@plone/volto/helpers';
import { UniversalLink, SidebarPortal } from '@plone/volto/components';
import { Button, PresetWrapper, ShareButtons } from '@package/components';
import { TextEditorWidget } from '@package/components/Widgets';
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
  const { data, selected, block, onChangeBlock, onSelectBlock } = props;
  const intl = useIntl();
  const [focusOn, setFocusOn] = useState('title');
  let href = data.link_to ? flattenToAppURL(data.link_to[0]?.['@id']) : null;

  let ctaButton = (
    <>
      <Button
        as={UniversalLink}
        color={data.buttonColor}
        size="large"
        href={href}
        arrow={true}
      >
        {data.cta_title ?? intl.formatMessage(messages.cta_title_default)}
      </Button>
    </>
  );

  const onChange = (obj, fieldName) => {
    if (!isEqual(obj[fieldName], data[fieldName])) {
      onChangeBlock(block, {
        ...data,
        [fieldName]: obj[fieldName],
      });
    }
  };

  const focusField = (field) => {
    setFocusOn(field);

    if (!selected) {
      onSelectBlock(block);
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

  return (
    <PresetWrapper
      {...(typeof data === 'string' ? {} : data)}
      usePresetDefaults={false}
      className={cx('block-text1', {
        'corner-decoration': data.showCorner,
        ['corner-' + data.cornerColor]: data.cornerColor,
      })}
      onClick={(e) => {
        focusField(null);
      }}
      onKeyDown={onKeyDown}
      tabIndex="0"
      role="textbox"
    >
      <div className="block-content">
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column
              computer={6}
              tablet={6}
              mobile={16}
              className="text-break"
            >
              <h3 className="title">
                <TextArea
                  fluid
                  className="input-title"
                  transparent
                  placeholder={intl.formatMessage(messages.titlePlaceholder)}
                  value={data.title || ''}
                  onClick={(e) => {
                    focusField('title');
                    e.stopPropagation();
                  }}
                  onChange={(e) => {
                    onChange(
                      { title: e.target.value?.replace('\n', '') },
                      'title',
                    );
                  }}
                />
              </h3>
              {data.have_cta && (
                <div className="block-text1-desktop-btn">{ctaButton}</div>
              )}
            </Grid.Column>
            <Grid.Column computer={6} tablet={6} mobile={16}>
              <div className="content">
                {data.share_social && (
                  <div className="content-social">
                    <ShareButtons showLabel={false} />
                  </div>
                )}
                {/* eslint-disable-next-line */}
                <p onClick={() => focusField('content')}>
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
                <div className="block-text1-mobile-btn">{ctaButton}</div>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
    fullWidth: PropTypes.bool,
    have_cta: PropTypes.bool,
    share_social: PropTypes.bool,
    cta_title: PropTypes.string,
    link_to: PropTypes.any,
    buttonColor: PropTypes.string,
    cornerColor: PropTypes.string,
    showCorner: PropTypes.bool,
    titleColor: PropTypes.string,
  }),
  selected: PropTypes.bool.isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
};

export default Edit;
