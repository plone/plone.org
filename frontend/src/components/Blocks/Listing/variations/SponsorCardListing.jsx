import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import {
  PresetWrapper,
  SponsorCard,
  ListingHeader,
  ListingLinkMore,
} from '@package/components';

const SponsorCardListing = (props) => {
  const { items, isEditMode, cols = 3 } = props;

  return (
    <PresetWrapper {...props} className="simple-card-listing">
      <ListingHeader {...props} />
      <Grid columns={cols} stackable>
        <Grid.Row>
          {items.map((item) => {
            return (
              <Grid.Column key={item['@id']}>
                <SponsorCard
                  key={item['@id']}
                  {...item}
                  isEditMode={isEditMode}
                ></SponsorCard>
              </Grid.Column>
            );
          })}
        </Grid.Row>
      </Grid>
      <ListingLinkMore {...props} />
    </PresetWrapper>
  );
};

SponsorCardListing.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
  title: PropTypes.string,
  linkTitle: PropTypes.string,
  linkHref: PropTypes.any,
  preset_color: PropTypes.any,
  cols: PropTypes.number,
};
export default SponsorCardListing;
