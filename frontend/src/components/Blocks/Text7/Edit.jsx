import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { defineMessages } from 'react-intl';
import { isEqual } from 'lodash';
import { Input, Button, Message, Grid, Image } from 'semantic-ui-react';
import { flattenToAppURL } from '@plone/volto/helpers';
import { SidebarPortal, Icon, UniversalLink } from '@plone/volto/components';
import clearSVG from '@plone/volto/icons/clear.svg';

import { PresetWrapper, ShareButtons } from '@package/components';
import CustomButton from '@package/components/Button/Button';
import { ImageWidget, TextEditorWidget } from '@package/components/Widgets';
import Sidebar from './Sidebar';

const messages = defineMessages({
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  description: {
    id: 'Description',
    defaultMessage: 'Description',
  },
  placeholder: {
    id: 'Upload a new image',
    defaultMessage: 'Upload a new image',
  },
  image: {
    id: 'Image',
    defaultMessage: 'Image',
  },
  cta_title_default: {
    id: 'cta_title_default',
    defaultMessage: 'Go to content',
  },
});

const Edit = (props) => {
  const { data, selected, block, onChangeBlock, intl, editable } = props;
  const img_column_width = data.img_column_width
    ? parseInt(data.img_column_width)
    : 6;

  const [focusOn, setFocusOn] = useState('title');

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
      props.onSelectBlock(block);
    }
  };

  if (__SERVER__) {
    return <div />;
  }

  return (
    <PresetWrapper
      {...props.data}
      usePresetDefaults={false}
      className="block-text7"
    >
      <>
        {data.share_social && (
          <div className="content-social">
            <ShareButtons showLabel={false} />
          </div>
        )}
        <Grid className="block-content" verticalAlign="middle">
          <Grid.Row
            className={cx({
              'block-right': data?.right,
            })}
            columns={2}
          >
            {props.selected && props.editable && !!props.data.url && (
              <div className="toolbar">
                <Button.Group>
                  <Button
                    icon
                    basic
                    onClick={() =>
                      onChangeBlock(props.block, {
                        ...props.data,
                        url: '',
                      })
                    }
                  >
                    <Icon name={clearSVG} size="24px" color="#e40166" />
                  </Button>
                </Button.Group>
              </div>
            )}
            <Grid.Column
              computer={img_column_width}
              tablet={img_column_width}
              mobile={12}
            >
              {props.data?.url ? (
                <Image
                  className="block-text7-image"
                  src={`${flattenToAppURL(props.data.url)}/@@images/image`}
                  loading="lazy"
                  alt=""
                />
              ) : (
                <div className="image-add">
                  <Message className="image-message">
                    <center>
                      <h4>{intl.formatMessage(messages.image)}</h4>
                      {editable && (
                        <>
                          <p>{intl.formatMessage(messages.placeholder)}</p>

                          <ImageWidget
                            id={'image' + block}
                            wrapped={false}
                            value={props.data.url}
                            onChange={(id, value) => {
                              onChangeBlock(block, { ...data, url: value });
                            }}
                            openObjectBrowser={props.openObjectBrowser}
                            imagePlaceholder={false}
                            showInput={false}
                          />
                        </>
                      )}
                    </center>
                  </Message>
                </div>
              )}
            </Grid.Column>
            <Grid.Column
              computer={12 - img_column_width}
              tablet={12 - img_column_width}
              mobile={12}
            >
              <div className="block-text7-body">
                <Input
                  as="h3"
                  className="input-title title"
                  transparent
                  placeholder={props.intl.formatMessage(messages.title)}
                  value={data.title ?? ''}
                  onClick={(e) => {
                    focusField('title');
                    e.stopPropagation();
                  }}
                  selected={selected && focusOn === 'title'}
                  onChange={(e) => onChange({ title: e.target.value }, 'title')}
                />
                {/* eslint-disable-next-line */}
                <div onClick={() => focusField('content')}>
                  <TextEditorWidget
                    data={data}
                    fieldName="content"
                    selected={selected && focusOn === 'content'}
                    block={block}
                    onChangeBlock={(data) => onChange(data, 'content')}
                    placeholder={props.intl.formatMessage(messages.description)}
                    prevFocus="title"
                    setFocus={(f) => focusField(f)}
                    showToolbar={true}
                    key="content"
                    disableMoveToNearest={true}
                  />
                </div>
                {data.has_cta && (
                  <div className="buttonBottom">
                    <CustomButton
                      as={UniversalLink}
                      size="large"
                      href={
                        data.link_to
                          ? flattenToAppURL(data.link_to[0]?.['@id'])
                          : data.link_to_external
                          ? data.link_to_external
                          : null
                      }
                      arrow={true}
                    >
                      {data.cta_title ||
                        intl.formatMessage(messages.cta_title_default)}
                    </CustomButton>
                  </div>
                )}
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </>
      <SidebarPortal selected={selected}>
        <Sidebar
          {...data}
          onChange={(fieldName, value) => {
            const newValue = fieldName === 'cta_title' ? value ?? '' : value;
            onChangeBlock(block, {
              ...data,
              [fieldName]: newValue,
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
    right: PropTypes.bool,
    share_social: PropTypes.bool,
    link_to: PropTypes.array,
    link_to_external: PropTypes.string,
    cta_title: PropTypes.string,
    placeholder: PropTypes.any,
    have_cta: PropTypes.any,
    linkHref: PropTypes.any,
    linkTitle: PropTypes.any,
    url: PropTypes.any,
  }).isRequired,
  selected: PropTypes.bool,
  block: PropTypes.string,
  onChangeBlock: PropTypes.func,
};

export default Edit;
