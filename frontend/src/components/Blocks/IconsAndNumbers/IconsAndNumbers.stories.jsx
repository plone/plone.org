import React from 'react';
import View from './View';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

export default {
  title: 'Text/Numbers and Icons',
  component: View,
};

const mockStore = configureStore();
const store = mockStore({
  userSession: {
    token: null,
  },
  intl: {
    locale: 'en',
    messages: {},
  },
});

const Template = (args) => (
  <Provider store={store}>
    <View {...args} />
  </Provider>
);

const baseArgs = {
  data: {
    title: 'Lorem ipsum dolor sit amet',
    description: {
      blocks: [
        {
          data: {},
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
          key: 'bsqiu',
          text:
            'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
          type: 'unstyled',
        },
      ],
      entityMap: {},
    },
    href: [{ '@id': 'http://www.google.it', title: 'www.google.it' }],
    title_href: 'Read more',
    columns: [
      {
        title: 'Lorem ipsum dolor sit amet',
        number: '+4,85',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: 'bsqiu',
              text:
                'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
      {
        title: 'Lorem ipsum dolor sit amet',
        icon: '/it/home.png',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: 'bsqiu',
              text:
                'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
      {
        title: 'Lorem ipsum dolor sit amet',
        number: '98.85',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: 'bsqiu',
              text:
                'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    ],
  },
};

export const FullWidth = Template.bind({});

FullWidth.args = {
  ...baseArgs,
  data: {
    ...baseArgs.data,
    fullwidth: true,
  },
};
