import React from 'react';
import View from './View';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

const mockStore = configureStore();
const store = mockStore({
  userSession: {
    token: null,
  },
  intl: {
    locale: 'en',
    messages: {},
  },
  breadcrumbs: {
    items: [
      { url: '/foundation', title: 'Plone Foundation' },
      { url: '/foundation/about', title: 'About the foundation' },
    ],
  },
});

const Template = (args) => <View {...args} />;

export const Default = Template.bind({});
Default.args = { pathname: '/foundation/about' };

export const Background = Template.bind({});

Background.args = {
  pathname: '/foundation/about',
  data: { background: true },
};

export default {
  title: 'Breadcrumbs',
  component: View,
  decorators: [(Story) => <Provider store={store}>{Story()}</Provider>],
};
