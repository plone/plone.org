import React from 'react';
import Button from './Button';

const Template = (args) => <Button {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  children: 'Button',
  color: 'blue',
  size: 'massive',
  as: 'a',
  href: 'https://www.google.it',
};

export default {
  title: 'Common/Button',
  component: Button,
  argTypes: {
    color: {
      options: [
        'blue',
        'outline-blue',
        'white',
        'outline-white',
        'yellow',
        'outline-yellow',
        'orange',
        'outline-orange',
        'green',
        'outline-green',
      ],
      control: { type: 'radio' },
    },
    size: {
      options: [
        'mini',
        'tiny',
        'small',
        'medium',
        'large',
        'small',
        'huge',
        'massive',
      ],
      control: { type: 'radio' },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ backgroundColor: '#ccc', padding: '4rem' }}>{Story()}</div>
    ),
  ],
};
