import { defineMessages } from 'react-intl';
import { addSchemaField } from '@package/config/Blocks/schemas/utils';
import { addPresetFields } from '@package/helpers/presets';

const messages = defineMessages({
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  title_decoration: {
    id: 'title_decoration',
    defaultMessage: 'Show title separator line',
  },
  show_item_more_button: {
    id: 'show_item_more_button',
    defaultMessage: "Show button for card's details",
  },
  have_image: {
    id: 'have_image',
    defaultMessage: 'Show image',
  },
  cols: {
    id: 'Number of columns',
    defaultMessage: 'Number of columns',
  },
});

const getNewsCardVariationSchema = (schema, formData, intl, pos = 0) => {
  addSchemaField(
    schema,
    'show_title_decoration',
    intl.formatMessage(messages.title_decoration),
    null,
    { type: 'boolean', default: true },
    pos,
    'default',
  );
  pos++;

  addSchemaField(
    schema,
    'cols',
    intl.formatMessage(messages.cols),
    null,
    { type: 'number', default: 3 },
    pos,
    'default',
  );
  pos++;

  addSchemaField(
    schema,
    'have_image',
    intl.formatMessage(messages.have_image),
    null,
    { type: 'boolean', default: true },
    pos,
    'items',
  );
  pos++;

  pos = addPresetFields(schema, intl, pos, 'items', {
    title_color: { colors: ['blue', 'grey'] },
  });

  addSchemaField(
    schema,
    'show_item_more_button',
    intl.formatMessage(messages.show_item_more_button),
    null,
    { type: 'boolean', default: false },
    pos,
    'items',
  );
  pos++;

  return pos;
};

export default getNewsCardVariationSchema;
