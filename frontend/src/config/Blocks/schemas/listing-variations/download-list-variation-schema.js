//import { addPresetFields } from '@package/helpers/presets';
import { defineMessages } from 'react-intl';
import { addSchemaField } from '@package/config/Blocks/schemas/utils';

const messages = defineMessages({
  title_color: {
    id: 'title_color',
    defaultMessage: 'Title color',
  },
  show_icon: {
    id: 'show_icon',
    defaultMessage: 'Show icon',
  },
  show_bullet_list: {
    id: 'show_bullet_list',
    defaultMessage: 'Show bulleted list',
  },
  show_date: {
    id: 'show_date',
    defaultMessage: 'Show date',
  },
});

const getDownloadVariationSchema = (schema, formData, intl, pos = 0) => {
  //remove 'items' fieldset because unused
  let itemsIndex = schema.fieldsets.findIndex((x) => x.id === 'items');
  schema.fieldsets.splice(itemsIndex, 1);
  const TITLE_COLORS = [
    { name: 'blue', label: 'Blue' },
    { name: 'grey', label: 'Grey' },
  ];
  addSchemaField(
    schema,
    'title_color',
    intl.formatMessage(messages.title_color),
    null,
    {
      widget: 'color_list',
      intl: intl,
      colors: TITLE_COLORS,
      defaultValue: 'blue',
    },
    pos,
    'default',
  );
  pos++;

  addSchemaField(
    schema,
    'show_icon',
    intl.formatMessage(messages.show_icon),
    null,
    { type: 'boolean' },
    pos,
    'default',
  );
  pos++;

  addSchemaField(
    schema,
    'show_bullet_list',
    intl.formatMessage(messages.show_bullet_list),
    null,
    { type: 'boolean' },
    pos,
    'default',
  );
  pos++;

  addSchemaField(
    schema,
    'show_date',
    intl.formatMessage(messages.show_date),
    null,
    { type: 'boolean' },
    pos,
    'default',
  );
  pos++;

  return pos;
};

export default getDownloadVariationSchema;
