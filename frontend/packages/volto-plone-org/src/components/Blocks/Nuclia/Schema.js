import { defineMessages } from 'react-intl';

const messages = defineMessages({
  title: {
    id: 'Nuclia search',
    defaultMessage: 'Nuclia search',
  },
  knowledgebox: {
    id: 'Knowledge Box',
    defaultMessage: 'Knowledge Box',
  },
  zone: {
    id: 'Zone',
    defaultMessage: 'Zone',
  },
  features: {
    id: 'Features',
    defaultMessage: 'Features',
  },
});

export const Schema = (props) => {
  const { intl } = props;

  return {
    title: intl.formatMessage(messages.title),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['knowledgebox', 'zone', 'features'],
      },
    ],

    properties: {
      knowledgebox: {
        title: intl.formatMessage(messages.knowledgebox),
      },
      zone: {
        title: intl.formatMessage(messages.zone),
        default: 'europe-1',
      },
      features: {
        title: intl.formatMessage(messages.features),
        default: 'permalink,filter',
      },
    },
    required: ['knowledgebox', 'zone', 'features'],
  };
};
