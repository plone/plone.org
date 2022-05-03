import React from 'react';
import View from './View';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';

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

export default {
  title: 'Text/Text 6',
  component: View,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <div style={{ maxWidth: '100%' }}>{Story()}</div>
      </Provider>
    ),
  ],
};

const Template = (args) => <View {...args} />;

const baseArgs = {
  data: {
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    content: {
      // draft-js text
      blocks: [
        {
          data: {},
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
          key: 'bsqiu',
          text:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porta sem in nisi pellentesque imperdiet. Maecenas tempus molestie felis, at varius nibh egestas ac. Quisque ultrices nisl neque. Duis cursus tortor velit, nec commodo libero mollis sit amet. Vivamus a dignissim arcu, pellentesque tincidunt ipsum. Nunc commodo, nibh at euismod .',
          type: 'unstyled',
        },
      ],
      entityMap: {},
    },
    bg_color: 'white',
    title_color: 'grey',
    fullWidth: false,
    have_cta: true,
    cta_title: 'Button label',
    link_to: '#',
    alignCenter: false,
  },
};

export const Basic = Template.bind({});

Basic.args = { ...baseArgs };

export const GreyBackground = Template.bind({});

GreyBackground.args = {
  ...baseArgs,
  data: {
    ...baseArgs.data,
    bg_color: 'light-grey',
  },
};

export const BlueBackground = Template.bind({});

BlueBackground.args = {
  ...baseArgs,
  data: {
    ...baseArgs.data,
    bg_color: 'blue',
  },
};
