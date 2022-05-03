import React from 'react';
import View from './View';

export default {
  title: 'Text/Text 4',
  component: View,
};

const Template = (args) => <View {...args} />;

const baseArgs = {
  data: {
    title: 'Lorem ipsum dolor sit amet',
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
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porta sem in nisi pellentesque imperdiet. Maecenas tempus molestie felis, at varius nibh egestas ac. Quisque ultrices nisl neque. Duis cursus tortor velit, nec commodo libero mollis sit amet. Vivamus a dignissim arcu, pellentesque tincidunt ipsum',
          type: 'unstyled',
        },
      ],
      entityMap: {},
    },
    bg_color: 'white',
    title_color: 'grey',
    alignLeft: false,
  },
};

export const Center = Template.bind({});

Center.args = { ...baseArgs };

export const AlignLeft = Template.bind({});

AlignLeft.args = {
  ...baseArgs,
  data: {
    ...baseArgs.data,
    alignLeft: true,
  },
};

export const GreyBackgorund = Template.bind({});

GreyBackgorund.args = {
  ...baseArgs,
  data: {
    ...baseArgs.data,
    bg_color: 'light-grey',
  },
};
