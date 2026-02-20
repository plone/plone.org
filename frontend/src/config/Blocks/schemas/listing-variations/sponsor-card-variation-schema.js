import { defineMessages } from 'react-intl';
import { addSchemaField } from '@package/config/Blocks/schemas/utils';
import { addPresetFields } from '@package/helpers/presets';

const messages = defineMessages({
  cols: {
    id: 'Number of columns',
    defaultMessage: 'Number of columns',
  },
  linkToPage: {
    id: 'Link to page?',
    defaultMessage: 'Link to page?',
  },
  linkToPageDescription: {
    id:
      'If selected, each card will always link to the page on the site instead of the remote url',
    defaultMessage:
      'If selected, each card will always link to the page on the site instead of the remote url',
  },
});

const getSponsorCardVariationSchema = (
  schema,
  formData,
  intl,
  position = 0,
) => {
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
    'linkToPage',
    intl.formatMessage(messages.linkToPage),
    intl.formatMessage(messages.linkToPageDescription),
    { type: 'boolean', default: false },
    pos,
    'default',
  );

  pos++;

  pos = addPresetFields(schema, intl, pos, 'items', {
    title_color: { colors: ['blue', 'grey'] },
    text_color: { colors: ['blue', 'grey'] },
  });

  return pos;
};

export default getSponsorCardVariationSchema;
