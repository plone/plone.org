import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { useIntl, defineMessages } from 'react-intl';
import {
  PresetWrapper,
  SimpleCard,
  ListingHeader,
  ListingLinkMore,
} from '@package/components';

const messages = defineMessages({
  cta_placeholder: {
    id: 'Read more',
    defaultMessage: 'Read more',
  },
});

const SimpleCardListing = (props) => {
  const {
    items,
    isEditMode,
    have_description = true,
    have_image = true,
    have_cta = true,
    card_link_title,
    title_align = 'center',
    cols = 3,
  } = props;
  const intl = useIntl();

  return (
    <PresetWrapper {...props} className="simple-card-listing">
      <ListingHeader {...props} />
      <Grid columns={cols} stackable>
        <Grid.Row>
          {items.map((item) => {
            return (
              <Grid.Column key={item['@id']}>
                <SimpleCard
                  key={item['@id']}
                  {...item}
                  have_image={have_image}
                  have_description={have_description}
                  have_cta={have_cta}
                  isEditMode={isEditMode}
                  cardLinkTitle={
                    card_link_title ||
                    intl.formatMessage(messages.cta_placeholder)
                  }
                ></SimpleCard>
              </Grid.Column>
            );
          })}
        </Grid.Row>
      </Grid>
      <ListingLinkMore {...props} />
    </PresetWrapper>
  );
};

SimpleCardListing.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
  title: PropTypes.string,
  linkTitle: PropTypes.string,
  linkHref: PropTypes.any,
  preset_color: PropTypes.any,
  have_description: PropTypes.bool,
  have_image: PropTypes.bool,
  have_cta: PropTypes.bool,
  card_link_title: PropTypes.string,
  cols: PropTypes.number,
};
export default SimpleCardListing;
