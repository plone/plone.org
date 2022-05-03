import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import {
  ListingHeader,
  ListingLinkMore,
  NewsCard,
  PresetWrapper,
} from '@package/components';

const NewsCardListing = (props) => {
  const {
    items,
    isEditMode,
    show_item_more_button,
    have_image,
    cols = 4,
  } = props;

  return (
    <PresetWrapper {...props} className="listing news-card-template">
      <ListingHeader {...props} />
      <Grid stackable>
        <Grid.Row>
          {items.map((item) => {
            return (
              <Grid.Column
                computer={12 / cols}
                tablet={6}
                mobile={16}
                key={item['@id']}
              >
                <NewsCard
                  key={item['@id']}
                  {...item}
                  have_image={have_image}
                  isEditMode={isEditMode}
                  card_eyelet={'NEWS'}
                  show_link_more={show_item_more_button}
                />
              </Grid.Column>
            );
          })}
        </Grid.Row>
      </Grid>

      <ListingLinkMore {...props} />
    </PresetWrapper>
  );
};
NewsCardListing.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  linkHref: PropTypes.any,
  linkTitle: PropTypes.string,
};

export default NewsCardListing;
