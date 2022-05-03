import React, { useState } from 'react';
import { defineMessages } from 'react-intl';
import { isEqual } from 'lodash';
import { Input, Grid } from 'semantic-ui-react';
import { /*UniversalLink,*/ SidebarPortal } from '@plone/volto/components';
//import CustomButton from '@package/components/Button/Button';
import { TextEditorWidget } from '@package/components/Widgets';
import { ShareButtons, PresetWrapper } from '@package/components';
import GalleryBody from './GalleryBody';
import Sidebar from './Sidebar';
// import { flattenToAppURL } from '@plone/volto/helpers';

const messages = defineMessages({
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  subtitle: {
    id: 'Subtitle',
    defaultMessage: 'Subtitle',
  },
  description: {
    id: 'Description',
    defaultMessage: 'Description',
  },
  image: {
    id: 'Image',
    defaultMessage: 'Image',
  },
  image_placeholder: {
    id: 'ImagePlaceholder',
    defaultMessage: 'Uploaded images will be placed here',
  },
  cta_title_default: {
    id: 'cta_title_default',
    defaultMessage: 'Go to content',
  },
});

const Edit = (props) => {
  const { data, selected, block, onChangeBlock, intl } = props;
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
  const onKeyDown = (e) => {
    if (!focusOn) {
      //no fields selected
      props.handleKeyDown(e, props.index, props.id, props.blockNode.current);
    }
    e.stopPropagation();
  };

  if (__SERVER__) {
    return <div />;
  }

  return (
    <PresetWrapper
      {...props.data}
      usePresetDefaults={false}
      className="block-text5"
      onClick={(e) => {
        focusField(null);
      }}
      onKeyDown={onKeyDown}
      tabIndex="0"
      role="textbox"
    >
      <div className="block-content">
        <div className="text5-header">
          {/* Title and description */}
          <Input
            as="h3"
            className="input-title title"
            transparent
            placeholder={intl.formatMessage(messages.title)}
            value={data.title ?? ''}
            onClick={(e) => {
              focusField('title');
              e.stopPropagation();
            }}
            selected={selected && focusOn === 'title'}
            onChange={(e) => onChange({ title: e.target.value }, 'title')}
          />
          {data.share_social && <ShareButtons showLabel={false} />}
        </div>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column computer={6} tablet={12} mobile={12}>
              {/* Description */}

              {/* eslint-disable-next-line */}
              <div onClick={() => focusField('description')}>
                <TextEditorWidget
                  data={data}
                  block={block}
                  fieldName="description"
                  onChangeBlock={(v) => {
                    onChangeBlock(block, {
                      ...data,
                      description: v.description,
                    });
                  }}
                  placeholder={intl.formatMessage(messages.subtitle)}
                  prevFocus={'title'}
                  selected={selected && focusOn === 'description'}
                  setFocus={(f) => focusField(f)}
                  showToolbar={true}
                />
              </div>

              {/* Gallery */}
              <div className="block-text5-gallery">
                <GalleryBody images={data?.images} />
              </div>

              {/* blocchi di testo sotto alla foto/gallery */}
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column>
                    {/* eslint-disable-next-line */}
                    <div onClick={() => focusField('text1')}>
                      <TextEditorWidget
                        data={data}
                        fieldName="text1"
                        block={block}
                        onChangeBlock={(data) => onChange(data, 'text1')}
                        placeholder={intl.formatMessage(messages.description)}
                        prevFocus={'description'}
                        selected={selected && focusOn === 'text1'}
                        setFocus={(f) => focusField(f)}
                        showToolbar={true}
                        key="text1"
                      />
                    </div>
                  </Grid.Column>
                  <Grid.Column>
                    {/* eslint-disable-next-line */}
                    <div onClick={() => focusField('text2')}>
                      <TextEditorWidget
                        data={data}
                        fieldName="text2"
                        block={block}
                        onChangeBlock={(data) => onChange(data, 'text2')}
                        placeholder={intl.formatMessage(messages.description)}
                        prevFocus={'text1'}
                        selected={selected && focusOn === 'text2'}
                        setFocus={(f) => focusField(f)}
                        showToolbar={true}
                        key="text2"
                      />
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>

            {/* right column with Social, text and cta */}
            <Grid.Column computer={6} tablet={12} mobile={12}>
              <div className="block-text5-body">
                {/* eslint-disable-next-line */}
                <div onClick={() => focusField('content')}>
                  <TextEditorWidget
                    data={data}
                    fieldName="content"
                    selected={selected && focusOn === 'content'}
                    block={block}
                    onChangeBlock={(data) => onChange(data, 'content')}
                    placeholder={props.intl.formatMessage(messages.description)}
                    prevFocus="text2"
                    setFocus={(f) => focusField(f)}
                    showToolbar={true}
                    key="content"
                    disableMoveToNearest={true}
                  />
                </div>
                {/* {data.has_cta && (
                  <div className="block-text5-button">
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
                    >
                      {data.cta_title ||
                        intl.formatMessage(messages.cta_title_default)}
                      <FontAwesomeIcon
                        style={{ marginLeft: 20 }}
                        icon={faArrowRight}
                      />
                    </CustomButton>
                  </div>
                )} */}
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      <SidebarPortal selected={selected}>
        <Sidebar {...props} />
      </SidebarPortal>
    </PresetWrapper>
  );
};

export default Edit;
