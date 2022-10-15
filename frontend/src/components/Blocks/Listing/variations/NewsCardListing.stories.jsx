import React from 'react';
import NewsCardListing from './NewsCardListing';
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

const Template = (args) => <NewsCardListing {...args} />;

export const NoDescription = Template.bind({});

NoDescription.args = {
  title: 'News/events',
  description:
    'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint amet est sit aliqua.',
  linkHref: [
    {
      '@id': '/it/test-page/copy_of_notizia-di-test',
      Description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard ",
      Title: 'Test News 226',
      title: 'Test News 226',
    },
  ],
  linkTitle: 'Read more',
  items: [
    {
      '@id': '1id',
      title: 'Big title',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      image: {
        filename: 'test.jpeg',
        scales: {
          preview: {
            download: 'https://via.placeholder.com/150',
          },
        },
      },
      effective: '2021-10-20T12:22:42+00:00',
      card_eyelet: 'news',
    },
    {
      '@id': '2id',
      title: 'Big title 2',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
      image: {
        filename: 'test2.jpeg',
        scales: {
          preview: {
            download: 'https://via.placeholder.com/150',
          },
        },
      },
      effective: '2021-10-20T12:22:42+00:00',
      card_eyelet: 'news',
    },
    {
      '@id': '3id',
      title: 'Big title 3',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      image: {
        filename: 'test3.jpeg',
        scales: {
          preview: {
            download: 'https://via.placeholder.com/150',
          },
        },
      },
      effective: '2021-10-20T12:22:42+00:00',
      card_eyelet: 'bycicles',
    },
    {
      '@id': '4id',
      title: 'Big title 4',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      image: {
        filename: 'test4.jpeg',
        scales: {
          preview: {
            download: 'https://via.placeholder.com/150',
          },
        },
      },
      effective: '2021-10-20T12:22:42+00:00',
      card_eyelet: 'people',
    },
  ],
};

export const NoImage = Template.bind({});

NoImage.args = {
  title: 'News/events',
  description:
    'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint amet est sit aliqua.',
  linkHref: [
    {
      '@id': '/it/test-page/copy_of_notizia-di-test',
      Description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard ",
      Title: 'Notizia di test 226',
      title: 'Notizia di test 226',
    },
  ],
  linkTitle: 'Lorem Ipsum',
  items: [
    {
      '@id': '1id',
      title: 'Titolone',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      image: null,
      effective: '2007-10-20T12:22:42+00:00',
      card_eyelet: 'attualità',
    },
    {
      '@id': '2id',
      title: 'Lorem Ipsum 2',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
      image: null,
      effective: '2011-10-20T12:22:42+00:00',
      card_eyelet: 'news',
    },
    {
      '@id': '3id',
      title: 'Lorem Ipsum 3',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      image: null,
      effective: '2021-10-20T12:22:42+00:00',
      card_eyelet: 'animals',
    },
    {
      '@id': '4id',
      title: 'Lorem Ipsum 4',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      image: null,
      effective: '2027-10-20T12:22:42+00:00',
      card_eyelet: 'cats',
    },
  ],
};

export default {
  title: 'Listing/NewsCardListing',
  component: NewsCardListing,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <div className="block listing">{Story()}</div>
      </Provider>
    ),
  ],
};
