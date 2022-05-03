import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { ColorListWidget } from '@package/components/Widgets';
import { CheckboxWidget } from '@plone/volto/components';
import {
  //CheckboxWidget,
  ObjectListWidget,
  TextWidget,
  ObjectBrowserWidget,
  SelectWidget,
} from '@plone/volto/components';

const Sidebar = (props) => {
  const { data, onChangeBlock, block } = props;

  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage
            id="Image columns"
            defaultMessage="Side by side images"
          />
          :
        </h2>
      </header>
      <Segment className="form">
        <SelectWidget
          id="n_columns"
          title="Columns number"
          description="If created columns number is less then selected number, columns will adapt to the available width"
          choices={[
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
      </Segment>
      <Segment className="form">
        <ColorListWidget
          id="bg_color"
          title="Background color"
          colors={[
            { name: 'outline-white', label: 'Transparent' },
            { name: 'light-grey', label: 'Light grey' },
          ]}
          value={data.bg_color ?? 'outline-white'}
          onChange={(name, value) => {
            onChangeBlock(block, {
              ...data,
              [name]: value,
            });
          }}
        />
        <CheckboxWidget
          id="fullWidth"
          title="Full width background"
          value={data.fullWidth ?? false}
          onChange={(name, value) => {
            onChangeBlock(block, {
              ...data,
              [name]: value,
            });
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
              title: 'Column',
              addMessage: 'Add column',
              fieldsets: [
                {
                  id: 'default',
                  title: 'Default',
                  fields: ['image', 'href'],
                },
              ],
              properties: {
                image: {
                  title: 'Immagine',
                  description:
                    'The image will be resized and fitted to the column width if larger than the available space. Otherwise, it will keep its proportions.',
                  widget: 'image_upload_widget',
                  openObjectBrowser: props.openObjectBrowser,
                },
                href: {
                  title: 'Link',
                  widget: 'object_browser',
                  allowExternals: true,
                  mode: 'link',
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
