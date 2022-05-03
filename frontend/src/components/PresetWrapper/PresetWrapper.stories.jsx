import React from 'react';
import PresetWrapper from './PresetWrapper';
import SimpleCard from '@package/components/cards/SimpleCard';

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
const Template = (args) => <PresetWrapper {...args} />;

export const SimpleCardWrapped = Template.bind({});

let imagez = {
  'content-type': 'image/jpeg',
  download:
    'http://localhost:3000/it/testing-page/testing-notizia/@@images/2a84fcef-76d6-478c-8076-4a02922b0af7.jpeg',
  filename: 'avatar.jpeg',
  height: 720,
  scales: {
    great: {
      download:
        'http://localhost:3000/it/testing-page/testing-notizia/@@images/63148542-5563-4c7a-94fb-588f10596bc9.jpeg',
      height: 675,
      width: 1200,
    },
    huge: {
      download:
        'http://localhost:3000/it/testing-page/testing-notizia/@@images/7a48929c-990e-463c-a88f-07d36ff5594d.jpeg',
      height: 720,
      width: 1280,
    },
    icon: {
      download:
        'http://localhost:3000/it/testing-page/testing-notizia/@@images/427cdebf-ff50-4959-952a-ac30c24f7495.jpeg',
      height: 18,
      width: 32,
    },
    large: {
      download:
        'http://localhost:3000/it/testing-page/testing-notizia/@@images/be14de18-a5aa-4110-beec-f30475f1ff8e.jpeg',
      height: 450,
      width: 800,
    },
    larger: {
      download:
        'http://localhost:3000/it/testing-page/testing-notizia/@@images/3c9a9ced-6166-4f3b-8337-e74a3e6b996e.jpeg',
      height: 562,
      width: 1000,
    },
    listing: {
      download:
        'http://localhost:3000/it/testing-page/testing-notizia/@@images/6b3ae0c8-ce31-4691-96da-a6522121bb32.jpeg',
      height: 9,
      width: 16,
    },
    mini: {
      download:
        'http://localhost:3000/it/testing-page/testing-notizia/@@images/292dafb2-f06a-493c-a1c4-4daa039713b9.jpeg',
      height: 112,
      width: 200,
    },
    preview: {
      download: 'http://via.placeholder.com/150',
      height: 225,
      width: 400,
    },
    teaser: {
      download:
        'http://localhost:3000/it/testing-page/testing-notizia/@@images/819074bd-07a3-4c8f-8396-f89437191001.jpeg',
      height: 337,
      width: 600,
    },
    thumb: {
      download:
        'http://localhost:3000/it/testing-page/testing-notizia/@@images/e79228eb-4481-47a5-8564-27e137f3c0ab.jpeg',
      height: 72,
      width: 128,
    },
    tile: {
      download:
        'http://localhost:3000/it/testing-page/testing-notizia/@@images/ba393094-cddc-4d74-ac70-29bff36ceb8f.jpeg',
      height: 36,
      width: 64,
    },
  },
  size: 396039,
  width: 1280,
};

const children = (
  <SimpleCard
    title="Consectetur adipiscing elit"
    have_description={true}
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nisi lectus, hendrerit in interdum in, auctor vitae orci. Nulla tincidunt, tortor nec vestibulum semper."
    have_image={true}
    image={imagez}
    cardLinkHref="google.it"
    cardLinkTitle="Lorem ipsum"
    isEditMode={false}
  ></SimpleCard>
);

SimpleCardWrapped.args = {
  item_bg_color: 'white',
  title_color: 'grey',
  text_color: 'grey',
  button_color: 'outline-blue',
  className: '',
  children,
};

export default {
  title: 'Common/PresetWrapper',
  component: PresetWrapper,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <div style={{ width: '400px' }}>{Story()}</div>
      </Provider>
    ),
  ],
  argTypes: {
    item_bg_color: {
      options: ['blue', 'grey', 'light-grey', 'white', 'transparent'],
      control: { type: 'radio' },
    },
    title_color: {
      options: ['blue', 'grey', 'white'],
      control: { type: 'radio' },
    },
    text_color: {
      options: ['blue', 'grey', 'white'],
      control: { type: 'radio' },
    },
    button_color: {
      options: ['blue', 'white', 'outline-blue', 'outline-white'],
      control: { type: 'radio' },
    },
  },
};
