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
});

const Template = (args) => <View {...args} />;

const left = {
  data: {
    title: 'Lorem ipsum dolor sit',
    url: 'https://placekitten.com/1000/1000',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porta sem in nisi pellentesque imperdiet. Maecenas tempus molestie felis, at varius nibh egestas ac. Quisque ultrices nisl neque. Duis cursus tortor velit, nec commodo libero mollis sit amet. Vivamus a dignissim arcu, pellentesque tincidunt ipsum. Nunc commodo, nibh at euismod gravida, urna neque finibus urna, in congue mi ante a arcu. Suspendisse volutpat, velit vitae aliquet sodales, mi augue accumsan lectus, eget laoreet quam mi vitae odio. Maecenas nec ligula sollicitudin ipsum sodales posuere.',
    linkHref: 'google.it',
    linkTitle: 'Go to projects',
    right: false,
    bg_color: 'white',
    title_color: 'grey',
  },
};

const right = {
  data: {
    title: 'Lorem ipsum dolor sit 2',
    url: 'https://placekitten.com/1000/1000',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porta sem in nisi pellentesque imperdiet. Maecenas tempus molestie felis, at varius nibh egestas ac. Quisque ultrices nisl neque. Duis cursus tortor velit, nec commodo libero mollis sit amet. Vivamus a dignissim arcu, pellentesque tincidunt ipsum. Nunc commodo, nibh at euismod gravida, urna neque finibus urna, in congue mi ante a arcu. Suspendisse volutpat, velit vitae aliquet sodales, mi augue accumsan lectus, eget laoreet quam mi vitae odio. Maecenas nec ligula sollicitudin ipsum sodales posuere.',
    linkHref: 'google.it',
    linkTitle: 'Go to site',
    right: true,
    bg_color: 'white',
    title_color: 'grey',
  },
};

export const ImageLeft = Template.bind({});

ImageLeft.args = { ...left };

export const ImageRight = Template.bind({});

ImageRight.args = { ...right };

export default {
  title: 'Text/Text 7',
  component: View,
  decorators: [(Story) => <Provider store={store}>{Story()}</Provider>],
};
