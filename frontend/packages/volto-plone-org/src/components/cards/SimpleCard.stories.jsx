import React from 'react';
import SimpleCard from './SimpleCard';
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
const Template = (args) => <SimpleCard {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  title: 'Lorem, ipsum dolor',
  preset_color: 1,
  have_description: true,
  description:
    'sit amet consectetur adipisicing elit. Debitis earum perspiciatis quam consequatur libero minus commodi facilis porro laborum repellat. Praesentium voluptas eaque voluptatem numquam at possimus, voluptatibus nesciunt esse!',
  have_image: true,
  image: {
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
  },
  cardLinkHref: 'http://google.it',
  cardLinkTitle: 'Read more',
  isEditMode: false,
};

export const NoImage = Template.bind({});

NoImage.args = {
  title: 'Lorem 2, ipsum',
  preset_color: 1,
  have_description: true,
  description:
    'sit amet consectetur adipisicing elit. Debitis earum perspiciatis quam consequatur libero minus commodi facilis porro laborum repellat. Praesentium voluptas eaque voluptatem numquam at possimus, voluptatibus nesciunt esse!',
  have_image: false,
  image: {
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
  },
  cardLinkHref: 'http://google.it',
  cardLinkTitle: 'Discover',
  isEditMode: false,
};

export const EditMode = Template.bind({});

EditMode.args = {
  title: 'Lorem 2, ipsum',
  preset_color: 1,
  have_description: true,
  description:
    'sit amet consectetur adipisicing elit. Debitis earum perspiciatis quam consequatur libero minus commodi facilis porro laborum repellat. Praesentium voluptas eaque voluptatem numquam at possimus, voluptatibus nesciunt esse!',
  have_image: false,
  image: {
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
  },
  cardLinkHref: 'http://google.it',
  cardLinkTitle: 'Discover this world',
  isEditMode: true,
};

export const NoDescription = Template.bind({});

NoDescription.args = {
  title: 'Lorem 2, ipsum',
  preset_color: 1,
  have_description: false,
  description:
    'sit amet consectetur adipisicing elit. Debitis earum perspiciatis quam consequatur libero minus commodi facilis porro laborum repellat. Praesentium voluptas eaque voluptatem numquam at possimus, voluptatibus nesciunt esse!',
  have_image: true,
  image: {
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
  },
  cardLinkHref: 'http://google.it',
  cardLinkTitle: 'Read more',
  isEditMode: true,
};

export default {
  title: 'Card/SimpleCard',
  component: SimpleCard,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <div style={{ maxWidth: '400px' }}>{Story()}</div>
      </Provider>
    ),
  ],
};
