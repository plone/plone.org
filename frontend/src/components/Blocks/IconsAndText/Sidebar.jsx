import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import {
  FormattedMessage,
  useIntl,
  injectIntl,
  defineMessages,
} from 'react-intl';
import {
  CheckboxWidget,
  ObjectListWidget,
  TextWidget,
  ObjectBrowserWidget,
  SelectWidget,
} from '@plone/volto/components';

import { ColorListWidget, AlignWidget } from '@package/components/Widgets';

const messages = defineMessages({
  header_align: {
    id: 'Header alignment',
    defaultMessage: 'Header alignment',
  },

  backgroundColor: {
    id: 'backgroundColor',
    defaultMessage: 'Background color',
  },
  transparent: {
    id: 'transparent',
    defaultMessage: 'Transparent',
  },
  grey: {
    id: 'grey',
    defaultMessage: 'Grey',
  },
  blue: {
    id: 'blue',
    defaultMessage: 'Blue',
  },
  fullWidth: {
    id: 'fullWidth',
    defaultMessage: 'Full width',
  },
  titleColor: {
    id: 'titleColor',
    defaultMessage: 'Title color',
  },
  columnsNumber: { id: 'columnsNumber', defaultMessage: 'Number of columns' },
  noAdaptColumns: {
    id: 'noAdaptColumns',
    defaultMessage: 'Do not fit the columns to the available space',
  },
  column: {
    id: 'column',
    defaultMessage: 'Column',
  },
  addColumn: {
    id: 'addColumn',
    defaultMessage: 'Add column',
  },
  icon: {
    id: 'icon',
    defaultMessage: 'Icon',
  },
});

const Sidebar = (props) => {
  const intl = useIntl();
  const { data, onChangeBlock, block } = props;

  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage
            id="IconsAndTextBlock"
            defaultMessage="Icons and text block"
          />
          :
        </h2>
      </header>
      <Segment className="form">
        <ColorListWidget
          id="bg_color"
          title={intl.formatMessage(messages.backgroundColor)}
          colors={[
            {
              name: 'outline-white',
              label: intl.formatMessage(messages.transparent),
            },
            { name: 'light-grey', label: intl.formatMessage(messages.grey) },
          ]}
          value={data.bg_color ?? 'outline-white'}
          onChange={(name, value) =>
            onChangeBlock(block, { ...data, [name]: value })
          }
        />
        <CheckboxWidget
          id="fullWidth"
          title={intl.formatMessage(messages.fullWidth)}
          value={data.fullWidth ? data.fullWidth : false}
          onChange={(name, value) => {
            onChangeBlock(block, { ...data, [name]: value });
          }}
        />

        <ColorListWidget
          id="title_color"
          title={intl.formatMessage(messages.titleColor)}
          colors={[
            { name: 'grey', label: intl.formatMessage(messages.grey) },
            { name: 'blue', label: intl.formatMessage(messages.blue) },
          ]}
          value={data.title_color ?? 'grey'}
          onChange={(name, value) =>
            onChangeBlock(block, { ...data, [name]: value })
          }
        />

        <AlignWidget
          id="header_align"
          title={intl.formatMessage(messages.header_align)}
          alignments={['left', 'center']}
          value={data.header_align ? data.header_align : 'center'}
          fieldSet="default"
          onChange={(name, value) => {
            onChangeBlock(block, { ...data, [name]: value });
          }}
        />
      </Segment>

      <Segment className="form">
        <SelectWidget
          id="n_columns"
          title={intl.formatMessage(messages.columnsNumber)}
          choices={[
            ['2', '2'],
            ['3', '3'],
            ['4', '4'],
          ]}
          value={data.n_columns}
          onChange={(name, value) => {
            onChangeBlock(block, {
              ...data,
              [name]: value,
            });
          }}
        />
        <CheckboxWidget
          id="noAdaptColumns"
          title={intl.formatMessage(messages.noAdaptColumns)}
          value={data.noAdaptColumns ? data.noAdaptColumns : false}
          onChange={(name, value) => {
            onChangeBlock(block, { ...data, [name]: value });
          }}
        />
      </Segment>
      <Segment className="form">
        <ObjectListWidget
          {...props}
          id="columns"
          value={data?.columns ?? []}
          onChange={(id, value) =>
            onChangeBlock(block, { ...data, [id]: value })
          }
          schema={() => {
            const columnsSchema = {
              title: intl.formatMessage(messages.column),
              addMessage: intl.formatMessage(messages.addColumn),
              fieldsets: [
                {
                  id: 'default',
                  title: 'Default',
                  fields: [
                    'iconImage',
                    'iconSize',
                    'headerTextPosition',
                    'dividerPosition',
                    'href',
                    'href_title',
                  ],
                },
              ],
              properties: {
                iconImage: {
                  title: intl.formatMessage(messages.icon),
                  description:
                    'The image must be a PNG or SVG. The maximum recommended size for PNG is 200x200px.',
                  widget: 'image_upload_widget',
                  openObjectBrowser: props.openObjectBrowser,
                },
                iconSize: {
                  title: 'Image size',
                  type: 'choices',
                  choices: [
                    ['s', 'Small'],
                    ['m', 'Medium'],
                    ['l', 'Large'],
                  ],
                  noValueOption: false,
                },
                headerTextPosition: {
                  title: 'Header text position',
                  type: 'choices',
                  choices: [
                    ['right', 'On right'],
                    ['bottom', 'On bottom'],
                  ],
                },
                dividerPosition: {
                  title: 'Divider position',
                  type: 'choices',
                  choices: [
                    ['before_title', 'Before title'],
                    ['after_title', 'After title'],
                    ['before_header_text', 'Before header text'],
                    ['no_divider', 'Hide divider'],
                  ],

                  noValueOption: false,
                },
                href: {
                  title: 'Link',
                  widget: 'object_browser',
                  allowExternals: true,
                  mode: 'link',
                },
                href_title: {
                  title: 'Link title',
                  description:
                    'If no title is entered, and a link is selected, the link will be added to the block title.',
                },
              },

              required: [],
            };

            return columnsSchema;
          }}
        />

        <ObjectBrowserWidget
          id="href"
          title="Link more"
          mode="link"
          allowExternals={true}
          value={data.href}
          widgetOptions={{
            pattern_options: { maximumSelectionSize: 1 },
          }}
          onChange={(name, value) => {
            onChangeBlock(block, {
              ...data,
              href: value,
            });
          }}
        />
        <TextWidget
          id="href_title"
          title="Title for link more"
          value={data.href_title ?? ''}
          onChange={(name, value) => {
            onChangeBlock(block, { ...data, [name]: value });
          }}
        />
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

export default injectIntl(Sidebar);
