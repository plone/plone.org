import React from 'react';
import View from './View';

export default {
  title: 'Testo/Numeri',
  component: View,
};

const Template = (args) => <View {...args} />;

const baseArgs = {
  data: {
    //backgroundImage
    //fullwidth
    variation: 'blue',
    numbers: [
      {
        title: 'Lorem ipsum dolor sit amet',
        number: '+4,85',
        icon: '/it/arrow-up.png',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: 'bsqiu',
              text:
                'Consectetur adipiscing elit. In porta sem in nisi pellentesque imperdiet.',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
      {
        title: 'Consectetur adipiscing elit. ',
        number: '12.000',
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
        title: 'In porta sem in nisi pellentesque imperdiet',
        number: '98.85',
        icon: '/it/percent.png',
        text: {
          blocks: [
            {
              data: {},
              depth: 0,
              entityRanges: [],
              inlineStyleRanges: [],
              key: 'bsqiu',
              text:
                'Maecenas tempus molestie felis, at varius nibh egestas ac. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
              type: 'unstyled',
            },
          ],
          entityMap: {},
        },
      },
    ],
  },
};

export const Blue = Template.bind({});

Blue.args = { ...baseArgs };

export const White = Template.bind({});

White.args = {
  ...baseArgs,
  data: {
    ...baseArgs.data,
    variation: 'white',
  },
};

export const FullWidth = Template.bind({});

FullWidth.args = {
  ...baseArgs,
  data: {
    ...baseArgs.data,
    fullWidth: true,
  },
};

export const WithImage = Template.bind({});

WithImage.args = {
  ...baseArgs,
  data: {
    ...baseArgs.data,
    backgroundImage: '/it/blocco-numeri/andisheh-a-qlixaq0orrc-unsplash.png',
  },
};
