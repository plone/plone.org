import { defineMessages } from 'react-intl';
import { addSchemaField } from '@package/config/Blocks/schemas/utils';
import { addPresetFields } from '@package/helpers/presets';

const messages = defineMessages({
  have_description: {
    id: 'Show descriptions',
    defaultMessage: 'Show descriptions',
  },
  have_image: {
    id: 'Show images',
    defaultMessage: 'Show images',
  },
  show_item_more_button: {
    id: 'show_item_more_button',
    defaultMessage: "Show button for card's detail",
  },
  cols: {
    id: 'Number of columns',
    defaultMessage: 'Number of columns',
  },
});

const getSimpleCardVariationSchema = (schema, formData, intl, position = 0) => {
  let pos = position;
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

  addSchemaField(
    schema,
    'have_description',
    intl.formatMessage(messages.have_description),
    null,
    { type: 'boolean', default: true },
    pos,
    'items',
  );
  pos++;

  addSchemaField(
    schema,
    'have_cta',
    intl.formatMessage(messages.show_item_more_button),
    null,
    { type: 'boolean', default: true },
    pos,
    'items',
  );
  pos++;

  pos = addPresetFields(schema, intl, pos, 'items', {
    title_color: { colors: ['blue', 'grey'] },
    text_color: { colors: ['blue', 'grey'] },
  });

  return pos;
};

export default getSimpleCardVariationSchema;
