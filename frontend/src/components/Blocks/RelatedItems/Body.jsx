import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import SimpleCardListing from '@package/components/Blocks/Listing/variations/SimpleCardListing';

const messages = defineMessages({
  default_title_related_items: {
    id: 'default_title_related_items',
    defaultMessage: 'Related items',
  },
});

const Body = (props) => {
  const { data, properties, isEditMode } = props;
  const intl = useIntl();

  let items = properties?.related_stories
    ? properties.related_stories
    : properties?.relatedItems
    ? properties.relatedItems
    : [];

  let itemfiltered = [];
  if (items.length > 0) {
    itemfiltered = items.filter((item) => {
      return item !== null;
    });
  }

  const title = data?.title
    ? data.title
    : intl.formatMessage(messages.default_title_related_items);

  return itemfiltered.length > 0 ? (
    <div className="block listing">
      <h3>{title}</h3>
      <SimpleCardListing
        items={itemfiltered}
        have_description={false}
        have_image={false}
        isEditMode={isEditMode}
      />
    </div>
  ) : null;
};

Body.propTypes = {
  props: PropTypes.arrayOf(PropTypes.any),
  isEditMode: PropTypes.bool,
};

export default Body;
