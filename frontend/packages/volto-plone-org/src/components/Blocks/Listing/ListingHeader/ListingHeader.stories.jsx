import React from 'react';
import ListingHeader from './ListingHeader';

const Template = (args) => <ListingHeader {...args} />;

export const Default = Template.bind({});

Default.args = {
  title: 'News/eventi e comunicati',
  description:
    'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint amet est sit aliqua.',
};

export default {
  title: 'Listing/ListingHeader',
  component: ListingHeader,
  decorators: [(Story) => <div className="block listing">{Story()}</div>],
};
