import { defineMessages } from 'react-intl';

const messages = defineMessages({
  HTMLBlockTitle: {
    id: 'HTMLBlockTitle',
    defaultMessage: 'Title',
  },
  htmlGreyBg: {
    id: 'htmlGreyBg',
    defaultMessage: 'Set grey background',
  },
  bgFullWidth: {
    id: 'bgFullWidth',
    defaultMessage: 'Set full width background',
  },
});

const schemaHTML = ({ intl }) => {
  return {
    title: 'HTML',
    required: [],
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['title', 'greyBg', 'fullWidth'],
      },
    ],
    properties: {
      title: {
        title: intl.formatMessage(messages.HTMLBlockTitle),
      },
      greyBg: {
        title: intl.formatMessage(messages.htmlGreyBg),
        type: 'boolean',
      },
      fullWidth: {
        title: intl.formatMessage(messages.bgFullWidth),
        type: 'boolean',
      },
    },
  };
};

export default schemaHTML;
