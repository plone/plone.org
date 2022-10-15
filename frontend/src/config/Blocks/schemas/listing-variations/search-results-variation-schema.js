const getSearchResultsVariationSchema = (schema, formData, intl, pos = 0) => {
  //remove 'items' fieldset because unused
  let itemsIndex = schema.fieldsets.findIndex((x) => x.id === 'items');
  schema.fieldsets.splice(itemsIndex, 1);
  return pos;
};

export default getSearchResultsVariationSchema;
