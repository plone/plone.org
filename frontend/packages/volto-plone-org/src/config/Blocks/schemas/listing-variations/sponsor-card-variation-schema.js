import { defineMessages } from 'react-intl';
import { addSchemaField } from 'volto-plone-org/config/Blocks/schemas/utils';
import { addPresetFields } from 'volto-plone-org/helpers/presets';

const messages = defineMessages({
  cols: {
    id: 'Number of columns',
    defaultMessage: 'Number of columns',
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

  pos = addPresetFields(schema, intl, pos, 'items', {
    title_color: { colors: ['blue', 'grey'] },
    text_color: { colors: ['blue', 'grey'] },
  });

  return pos;
};

export default getSponsorCardVariationSchema;
