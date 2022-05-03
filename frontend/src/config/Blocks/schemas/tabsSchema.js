import TabsLayoutSchema from '@package/components/Blocks/Tabs/LayoutSchema';

export const extendedTabsSchema = (config) => {
  const choices = Object.keys(config.blocks.blocksConfig)
    .map((key) => {
      if (config.blocks.blocksConfig[key]?.restricted) {
        return false;
      } else {
        const title = config.blocks.blocksConfig[key]?.title || key;
        return [key, title];
      }
    })
    .filter((val) => !!val);

  choices.push(['accordion', 'Accordion']);

  return {
    ...TabsLayoutSchema,
    properties: {
      ...TabsLayoutSchema.properties,
      allowedBlocks: {
        ...TabsLayoutSchema.properties.allowedBlocks,
        items: {
          choices: choices,
        },
      },
    },
  };
};
