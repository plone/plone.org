export const removeListingVariation = (config, id) => {
  let indexOfVariation = -1;
  indexOfVariation = config.blocks?.blocksConfig?.listing?.variations?.findIndex(
    (x) => x.id === id,
  );
  if (indexOfVariation >= 0) {
    config.blocks.blocksConfig.listing.variations.splice(indexOfVariation, 1);
  }
};

export const addSchemaField = (
  schema,
  field,
  title,
  description,
  properties = {},
  position = 0,
  fieldset = 'default',
  fieldsetPosition = 1,
) => {
  let fieldsetIndex = schema.fieldsets.findIndex((x) => x.id === fieldset);

  if (fieldsetIndex < 0) {
    schema.fieldsets.splice(fieldsetPosition, 0, {
      id: fieldset,
      title: fieldset,
      fields: [],
    });
    fieldsetIndex = fieldsetPosition;
  }

  schema.fieldsets[fieldsetIndex] = {
    ...schema.fieldsets[fieldsetIndex],
  };

  schema.fieldsets[fieldsetIndex].fields.splice(position, 0, field);
  schema.properties[field] = { title, description, ...properties };
};
