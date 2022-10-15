import React from 'react';
import { Segment } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { TextWidget } from '@plone/volto/components';

const messages = defineMessages({
  related_items: {
    id: 'Related items',
    defaultMessage: 'Related items',
  },
  related_items_title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
});

const Sidebar = (props) => {
  const intl = useIntl();
  const { data, block, onChangeBlock } = props;

  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>{intl.formatMesssage(messages.related_items)}:</h2>
      </header>
      <Segment className="form sidebar-listing-data">
        <TextWidget
          id="title"
          title={intl.formatMessage(messages.related_items_title)}
          value={data.title}
          onChange={(name, value) => {
            onChangeBlock(block, { ...data, [name]: value });
          }}
        />
      </Segment>
    </Segment.Group>
  );
};

export default Sidebar;
