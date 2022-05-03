import { defineMessages } from 'react-intl';
import { addSchemaField } from '@package/config/Blocks/schemas/utils';
import { addPresetFields } from '@package/helpers/presets';

const messages = defineMessages({
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  description: {
    id: 'Description',
    defaultMessage: 'Description',
  },

  header_align: {
    id: 'Header alignmnet',
    defaultMessage: 'Header alignment',
  },
});

/** DEFAULT **/

const getDefaultSchema = (schema, formData, intl, position = 0) => {
  let pos = position;
  schema.fieldsets[0].fields = schema.fieldsets[0].fields.filter(
    (f) => f !== 'querystring',
  ); //move 'querystring' field to a separate fieldset

  schema.fieldsets.splice(1, 0, {
    fields: ['querystring'],
    id: 'criteria',
    title: 'Criteria',
  });
  schema.fieldsets.splice(1, 0, {
    fields: [],
    id: 'items',
    title: 'Elements style',
  });

  addSchemaField(
    schema,
    'title',
    intl.formatMessage(messages.title),
    null,
    { type: 'string' },
    pos,
  );
  pos++;

  addSchemaField(
    schema,
    'description',
    intl.formatMessage(messages.description),
    null,
    { type: 'string' },
    pos,
  );
  pos++;

  addSchemaField(
    schema,
    'header_align',
    intl.formatMessage(messages.header_align),
    null,
    {
      widget: 'sitealign',
      defaultValue: 'center',
      alignments: ['left', 'center'],
    },
    pos,
  );
  pos++;

  pos = addPresetFields(schema, intl, pos, 'default', {
    bg_color: { colors: ['outline-white', 'light-grey'] },
  });

  return pos;
};

export default getDefaultSchema;
