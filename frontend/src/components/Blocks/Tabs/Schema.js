import { defineMessages } from 'react-intl';

const messages = defineMessages({
  Tabs: {
    id: 'Tabs',
    defaultMessage: 'Tabs',
  },
  Style: {
    id: 'Style',
    defaultMessage: 'Style',
  },
  Title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  friendly_name: {
    id: 'Friendly name',
    defaultMessage: 'Friendly name',
  },
});

export const TabsSchema = {
  title: 'Tabs',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['panel_title'],
    },
  ],
  properties: {
    panel_title: {
      title: 'Tabs title',
    },
  },
  required: [],
};

export const tabsBlockSchema = ({ intl }) => ({
  title: 'Tabs block',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['data'],
    },
    // {
    //   id: 'style',
    //   title: intl.formatMessage(messages.Style),
    //   fields: ['title'],
    // },
  ],
  properties: {
    // title: {
    //   title: intl.formatMessage(messages.Title),
    //   description: intl.formatMessage(messages.friendly_name),
    //   type: 'string',
    // },
    data: {
      title: intl.formatMessage(messages.Tabs),
      type: 'panels',
      schema: TabsSchema,
    },
  },
  required: ['title'],
});
