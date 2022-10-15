import React from 'react';
import ListingLinkMore from './ListingLinkMore';
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
});

const Template = (args) => <ListingLinkMore {...args} />;

export const Default = Template.bind({});

Default.args = {
  linkTitle: 'Leggi di più',
  linkHref: [{ '@id': '/pagina-di-dettaglio' }],
};

export default {
  title: 'Listing/ListingLinkMore',
  component: ListingLinkMore,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <div className="block listing">{Story()}</div>
      </Provider>
    ),
  ],
};
