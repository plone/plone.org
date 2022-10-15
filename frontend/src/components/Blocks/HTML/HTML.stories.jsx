import React from 'react';
import View from './View';

export default {
  title: 'Testo/HTML Embed',
  component: View,
};

const Template = (args) => <View {...args} />;

const baseArgs = {
  data: {
    title: 'Lorem ipsum dolor sit amet',
    greyBg: false,
    html: '<p>Test HTML Embed</p>',
  },
};

export const Default = Template.bind({});

Default.args = { ...baseArgs };

export const GreyBackground = Template.bind({});

GreyBackground.args = {
  ...baseArgs,
  data: {
    ...baseArgs.data,
    greyBg: true,
  },
};
