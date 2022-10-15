import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import { ObjectListWidget } from '@plone/volto/components';
import { TextBlockStyleSidebar } from '@package/components';

const messages = defineMessages({
  has_cta: {
    id: 'has_cta',
    defaultMessage: 'Show CTA',
  },
  has_cta_description: {
    id: 'has_cta_description',
    defaultMessage:
      'Choose whether or not to show the CTA in the block, absent by default.',
  },
  cta_title: {
    id: 'cta_title',
    defaultMessage: 'CTA text',
  },
  cta_title_default: {
    id: 'cta_title_default',
    defaultMessage: 'Go to content',
  },
  cta_title_description: {
    id: 'cta_title_description',
    defaultMessage: 'Text to show for the block CTA.',
  },
  link_to: {
    id: 'link_to',
    defaultMessage: 'CTA internal link',
  },
  link_to_description: {
    id: 'link_to_description',
    defaultMessage: "Insert a link to internal content for the block's CTA.",
  },
  image: {
    id: 'Image',
    defaultMessage: 'Image',
  },
  link_image: {
    id: 'link_image',
    defaultMessage: 'Image link',
  },
});

const Sidebar = (props) => {
  const { data, block, onChangeBlock } = props;
  const intl = useIntl();

  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="Text 5" defaultMessage="Text 5" />
        </h2>
      </header>
      <TextBlockStyleSidebar
        {...props.data}
        onChange={(fieldName, value) => {
          onChangeBlock(block, {
            ...data,
            [fieldName]: value,
          });
        }}
      />

      <Segment className="form sidebar-listing-data">
        <ObjectListWidget
          {...props}
          id="images"
          value={data?.images ?? []}
          onChange={(id, value) =>
            onChangeBlock(block, { ...data, [id]: value })
          }
          schema={() => {
            const imageSchema = {
              title: 'Image',
              addMessage: 'Add image',
              fieldsets: [
                {
                  id: 'default',
                  title: 'Default',
                  fields: ['image'],
                },
              ],
              properties: {
                image: {
                  title: intl.formatMessage(messages.link_image),
                  description: 'The image must be a PNG of at least 600x400 px',
                  widget: 'image_upload_widget',
                  openObjectBrowser: props.openObjectBrowser,
                },
              },
              required: [],
            };

            return imageSchema;
          }}
        />
        {/* <CheckboxWidget
          id="has_cta"
          title={intl.formatMessage(messages.has_cta)}
          value={data.has_cta}
          onChange={(name, value) => {
            onChangeBlock(block, { ...data, [name]: value });
          }}
        />
        {data.has_cta && (
          <>
            <TextWidget
              id="cta_title"
              title={intl.formatMessage(messages.cta_title)}
              description={intl.formatMessage(messages.cta_title_description)}
              value={data.cta_title ?? ''}
              onChange={(name, value) => {
                onChangeBlock(block, { ...data, [name]: value });
              }}
              placeholder={intl.formatMessage(messages.cta_title_default)}
            />
            <ObjectBrowserWidget
              id="link_to"
              title={intl.formatMessage(messages.link_to)}
              description={intl.formatMessage(messages.link_to_description)}
              mode="link"
              required={data.has_cta}
              value={data.link_to}
              onChange={(name, value) => {
                onChangeBlock(block, { ...data, [name]: value });
              }}
              allowExternals={true}
            />
          </>
        )} */}
      </Segment>
    </Segment.Group>
  );
};

Sidebar.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  openObjectBrowser: PropTypes.func.isRequired,
};
export default Sidebar;
