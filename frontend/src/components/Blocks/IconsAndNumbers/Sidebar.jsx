import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
  CheckboxWidget,
  ObjectListWidget,
  TextWidget,
  ObjectBrowserWidget,
} from '@plone/volto/components';
import { ColorListWidget } from '@package/components/Widgets';

const Sidebar = (props) => {
  const { data, onChangeBlock, block } = props;

  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage
            id="IconsAndNumbersBlock"
            defaultMessage="Icons and numbers block"
          />
          :
        </h2>
      </header>
      <Segment className="form">
        <CheckboxWidget
          id="fullWidth"
          title="Full width"
          value={data.fullWidth ? data.fullWidth : false}
          onChange={(name, value) => {
            onChangeBlock(block, { ...data, [name]: value });
          }}
        />
        <ColorListWidget
          id="background_color"
          title="Backgorund color"
          colors={[
            { name: 'white', label: 'White' },
            { name: 'blue', label: 'Blue' },
            { name: 'light-grey', label: 'Light grey' },
          ]}
          value={data.background_color ?? 'blue'}
          onChange={(name, value) =>
            onChangeBlock(block, { ...data, [name]: value })
          }
        />
        <div className="fixed-object-list">
          <ObjectListWidget
            {...props}
            id="columns"
            value={data?.columns ?? []}
            onChange={(id, value) =>
              props.onChangeBlock(block, { ...data, [id]: value })
            }
            schema={() => {
              const columnsSchema = {
                title: 'Column',
                addMessage: 'Add column',
                fieldsets: [
                  {
                    id: 'default',
                    title: 'Default',
                    // fields: ['icon'],
                    fields: ['iconImage'],
                  },
                ],
                properties: {
                  // icon: {
                  //   title: 'Icona',
                  //   type: 'fontawesome_icon',
                  // },
                  iconImage: {
                    title: 'Icona',
                    description:
                      'The image must be a PNG of at least 128x128 px',
                    widget: 'image_upload_widget',
                    openObjectBrowser: props.openObjectBrowser,
                  },
                },

                required: [],
              };

              return columnsSchema;
            }}
          />
        </div>

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
