const Schema = {
  title: 'Tabs block settings',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: [
        'title',
        'placeholder',
        'instructions',
        'allowedBlocks',
        'required',
        'fixed',
        'fixedLayout',
        'disableNewBlocks',
        'disableInnerButtons',
        'readOnlyTitles',
        'readOnlySettings',
        'readOnly',
      ],
    },
  ],
  properties: {
    title: {
      title: 'Title',
      description: 'Section friendly name',
      type: 'string',
    },
    allowedBlocks: {
      title: 'Allowed blocks',
      description: 'Allow only the following blocks types',
      type: 'array',
      items: {
        choices: [],
      },
    },
    placeholder: {
      title: 'Helper text',
      description:
        'A short hint that describes the expected value within this block',
      type: 'string',
    },
    instructions: {
      title: 'Instructions',
      description: 'Detailed expected value within this block',
      type: 'string',
      widget: 'richtext',
    },
    required: {
      title: 'Required',
      description: "Don't allow deletion of this block",
      type: 'boolean',
    },
    fixed: {
      title: 'Fixed position',
      description: 'Disable drag & drop on this block',
      type: 'boolean',
    },
    fixedLayout: {
      title: 'Fixed layout',
      description:
        'Fixed layout, New panes (tabs) created by Editor within this block will be ignored',
      type: 'boolean',
    },
    disableNewBlocks: {
      title: 'Disable new blocks',
      description: 'Disable creation of new blocks after this block',
      type: 'boolean',
    },
    readOnly: {
      title: 'Read-only',
      description: 'Disable editing on this block',
      type: 'boolean',
    },
    readOnlyTitles: {
      title: 'Tabs Read-only titles',
      description: 'Disable editing on tab titles',
      type: 'boolean',
    },
    readOnlySettings: {
      title: 'Tabs Read-only settings',
      description: 'Disable editing on tab block settings',
      type: 'boolean',
    },
    disableInnerButtons: {
      title: 'Disable inner buttons',
      description: 'Hide all block related buttons within this block',
      type: 'boolean',
    },
  },
  required: [],
};

export default Schema;
