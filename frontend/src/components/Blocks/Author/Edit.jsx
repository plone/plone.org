import React from 'react';
import cx from 'classnames';
import { defineMessages, useIntl } from 'react-intl';
import { SidebarPortal, Icon } from '@plone/volto/components';

import { flattenToAppURL } from '@plone/volto/helpers';

import clearSVG from '@plone/volto/icons/clear.svg';
import { ImageWidget } from '@package/components/Widgets';

import { Button, Message, Grid, Image, Container } from 'semantic-ui-react';

import Body from './Body';
import Sidebar from './Sidebar';

const messages = defineMessages({
  placeholder: {
    id: 'Upload or search a new image',
    defaultMessage: 'Upload or search a new image',
  },
  image: {
    id: 'Image',
    defaultMessage: 'Image',
  },
});

const Edit = (props) => {
  const { data, selected, editable, block, onChangeBlock } = props;
  const intl = useIntl();

  if (__SERVER__) {
    return <div />;
  }

  return (
    <div
      className={cx('block-author', {
        'grey-bg': data.greyBg,
        'full-width': data.fullWidth,
      })}
    >
      <Container className="block-content">
        <Grid>
          <Grid.Row columns={2}>
            {selected && editable && !!data.url && (
              <div className="toolbar">
                <Button.Group>
                  <Button
                    icon
                    basic
                    onClick={() => {
                      onChangeBlock(block, {
                        ...data,
                        url: '',
                      });
                    }}
                  >
                    <Icon name={clearSVG} size="24px" color="#e40166" />
                  </Button>
                </Button.Group>
              </div>
            )}
            {/* Foto autore */}
            <Grid.Column computer={3} tablet={3} mobile={12}>
              {data?.url ? (
                <Image
                  className="block-author-image"
                  src={`${flattenToAppURL(data.url)}/@@images/image`}
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
            <Grid.Column computer={9} tablet={9} mobile={12}>
              <Body {...props} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      <SidebarPortal selected={selected}>
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
    </div>
  );
};

export default Edit;
