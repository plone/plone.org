import React, { useState } from 'react';
import { defineMessages } from 'react-intl';
import { isEqual } from 'lodash';
import { Input, Grid } from 'semantic-ui-react';
import { UniversalLink, SidebarPortal } from '@plone/volto/components';
import { DetachedTextBlockEditor } from '@plone/volto-slate/blocks/Text/DetachedTextBlockEditor';
import { ShareButtons, PresetWrapper, Button } from '@package/components';
import GalleryBody from './GalleryBody';
import Sidebar from './Sidebar';
import { flattenToAppURL } from '@plone/volto/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

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
                <DetachedTextBlockEditor
                  data={{ value: data.description }}
                  onChangeBlock={(block, { value }) =>
                    onChange({ description: value }, 'description')
                  }
                  selected={selected && focusOn === 'description'}
                  readOnly={false}
                  placeholder={intl.formatMessage(messages.subtitle)}
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
                      <DetachedTextBlockEditor
                        data={{ value: data.text1 }}
                        onChangeBlock={(block, { value }) =>
                          onChange({ text1: value }, 'text1')
                        }
                        selected={selected && focusOn === 'text1'}
                        readOnly={false}
                        placeholder={intl.formatMessage(messages.description)}
                      />
                    </div>
                  </Grid.Column>
                  <Grid.Column>
                    {/* eslint-disable-next-line */}
                    <div onClick={() => focusField('text2')}>
                      <DetachedTextBlockEditor
                        data={{ value: data.text2 }}
                        onChangeBlock={(block, { value }) =>
                          onChange({ text2: value }, 'text2')
                        }
                        selected={selected && focusOn === 'text2'}
                        readOnly={false}
                        placeholder={intl.formatMessage(messages.description)}
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
                  <DetachedTextBlockEditor
                    data={{ value: data.content }}
                    onChangeBlock={(block, { value }) =>
                      onChange({ content: value }, 'content')
                    }
                    selected={selected && focusOn === 'content'}
                    readOnly={false}
                    placeholder={props.intl.formatMessage(messages.description)}
                  />
                </div>
                {data.has_cta && (
                  <div className="block-text5-button">
                    <Button
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
                    </Button>
                  </div>
                )}
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
