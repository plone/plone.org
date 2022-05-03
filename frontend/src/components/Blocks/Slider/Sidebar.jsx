import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { addPresetFields } from '@package/helpers/presets';
import {
  CheckboxWidget,
  ObjectListWidget,
  FormFieldWrapper,
} from '@plone/volto/components';
import { TITLE_COLORS } from '@package/helpers/presets';
import ImageSizeWidget from '@plone/volto/components/manage/Blocks/Image/ImageSizeWidget';

const messages = defineMessages({
  size: {
    id: 'Size',
    defaultMessage: 'Size',
  },
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
  buttonText: {
    id: 'SliderBlock: Text on button',
    defaultMessage: 'Text on button',
  },
  buttonTextDescription: {
    id: 'SliderBlock: Text on button description',
    defaultMessage:
      "If present, a button will be shown which, when clicked, will take you to the destination chosen in the 'Destination' field. If not filled in, the link will be placed on the title of the slide",
  },
  opacity: {
    id: 'SliderBlock: Opacify the image',
    defaultMessage: 'Opacify the image',
  },
  titleAlign: {
    id: 'SliderBlock: Title alignment',
    defaultMessage: 'Title alignment',
  },
  textAlign: {
    id: 'SliderBlock: Text alignment',
    defaultMessage: 'Text alignment',
  },
  textFullWidth: {
    id: 'SliderBlock: text width 100%',
    defaultMessage: 'Display full-width text',
  },
  hrefAlign: {
    id: 'SliderBlock: Button alignment',
    defaultMessage: 'Button alignment',
  },

  separator: {
    id: 'SliderBlock: Display a separator after title',
    defaultMessage: ' Display a separator after title',
  },
  separator_color: {
    id: 'SliderBlock: Separator color',
    defaultMessage: 'Separator color',
  },
  content_as_default: {
    id: "SliderBlock: Display current content's data",
    defaultMessage: "Display current content's data",
  },
  content_as_default_desc: {
    id: "SliderBlock:Display current content's data description",
    defaultMessage:
      "By default, dispaly current contents'data.  The text placed in below fields, will override content's data",
  },
  hide_title: {
    id: 'SliderBlock: Hide title on slide',
    defaultMessage: 'Hide title on slide',
  },
  show_cta_arrow: {
    id: 'SliderBlock: show cta arow',
    defaultMessage: 'Display arrow on CTA button',
  },
});

const Sidebar = (props) => {
  const intl = useIntl();
  const { data, block, onChangeBlock } = props;

  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="SliderBlock" defaultMessage="Blocco Slider" />:
        </h2>
      </header>

      <Segment className="form sidebar-listing-data">
        <CheckboxWidget
          id="showMainTitleAndDescription"
          title="Show main title and description"
          value={
            data.showMainTitleAndDescription
              ? data.showMainTitleAndDescription
              : false
          }
          onChange={(name, value) => {
            onChangeBlock(block, { ...data, [name]: value });
          }}
        />
        <CheckboxWidget
          id="autoplay"
          title="Autoplay"
          value={data.autoplay ? data.autoplay : false}
          onChange={(name, value) => {
            onChangeBlock(block, { ...data, [name]: value });
          }}
        />
        <CheckboxWidget
          id="fullwidth"
          title="Full width"
          value={data.fullwidth ? data.fullwidth : false}
          onChange={(name, value) => {
            onChangeBlock(block, { ...data, [name]: value });
          }}
        />

        <FormFieldWrapper
          id="image_size"
          title={intl.formatMessage(messages.size)}
        >
          <ImageSizeWidget
            onChangeBlock={onChangeBlock}
            data={data}
            block={block}
          />
        </FormFieldWrapper>
      </Segment>

      <ObjectListWidget
        {...props}
        id="slides"
        className="form sidebar-listing-data"
        value={data?.slides ?? []}
        onChange={(id, value) =>
          props.onChangeBlock(block, { ...data, [id]: value })
        }
        schema={() => {
          const slideSchema = {
            title: 'Slide',
            addMessage: 'Add Slide',
            fieldsets: [
              {
                id: 'default',
                title: 'Default',
                fields: [
                  'content_as_default',
                  'hide_title',
                  'title',
                  'subtitle',
                  'separator',
                  'description',
                  'image',
                  'opacity',
                  'href',
                  'href_title',
                  'show_cta_arrow',
                ],
              },
              {
                id: 'colors',
                title: 'Colors',
                fields: ['separator_color'],
              },
              {
                id: 'align',
                title: 'Align',
                fields: [
                  'title_align',
                  'text_align',
                  'href_align',
                  'text_fullwidth',
                ],
              },
            ],
            properties: {
              content_as_default: {
                title: intl.formatMessage(messages.content_as_default),
                description: intl.formatMessage(
                  messages.content_as_default_desc,
                ),
                type: 'boolean',
                defaultValue: false,
              },
              hide_title: {
                title: intl.formatMessage(messages.hide_title),
                type: 'boolean',
                defaultValue: false,
              },
              title: {
                title: intl.formatMessage(messages.title),
              },
              subtitle: {
                title: intl.formatMessage(messages.subtitle),
              },
              description: {
                title: intl.formatMessage(messages.description),
                widget: 'textarea',
              },
              image: {
                title: intl.formatMessage(messages.image),
                widget: 'object_browser',
                mode: 'image',
                allowExternals: true,
              },
              href: {
                title: 'Link',
                widget: 'object_browser',
                mode: 'link',
                allowExternals: true,
              },
              href_title: {
                title: intl.formatMessage(messages.buttonText),
                description: intl.formatMessage(messages.buttonTextDescription),
              },
              show_cta_arrow: {
                title: intl.formatMessage(messages.show_cta_arrow),
                type: 'boolean',
                defaultValue: false,
              },
              opacity: {
                title: intl.formatMessage(messages.opacity),
                type: 'boolean',
                defaultValue: false,
              },
              separator: {
                title: intl.formatMessage(messages.separator),
                type: 'boolean',
                defaultValue: false,
              },
              separator_color: {
                title: intl.formatMessage(messages.separator_color),
                widget: 'color_list',
                colors: TITLE_COLORS,
                defaultValue: 'blue',
              },
              title_align: {
                title: intl.formatMessage(messages.titleAlign),
                widget: 'sitealign',
                defaultValue: 'left',
                alignments: ['left', 'center'],
              },
              text_align: {
                title: intl.formatMessage(messages.textAlign),
                widget: 'sitealign',
                defaultValue: 'left',
                alignments: ['left', 'center'],
              },
              text_fullwidth: {
                title: intl.formatMessage(messages.textFullWidth),
                type: 'boolean',
                defaultValue: false,
              },
              href_align: {
                title: intl.formatMessage(messages.hrefAlign),
                widget: 'sitealign',
                defaultValue: 'left',
                alignments: ['left', 'center'],
              },
            },

            required: [],
          };

          addPresetFields(slideSchema, intl, 0, 'colors');
          return slideSchema;
        }}
      />
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
