import React from 'react';
import cx from 'classnames';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { UniversalLink } from '@plone/volto/components';
import { ListingImage } from 'volto-plone-org/components';

const SponsorCard = (props) => {
  let image = ListingImage({ item: props, className: 'item-image' });

  let cardClass = cx('item', {
    'sponsor-card': true,
    'with-image': image != null,
  });

  return (
    <Card className={cardClass}>
      <UniversalLink item={props}>{image}</UniversalLink>
    </Card>
  );
};

SponsorCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.any,
  linkHref: PropTypes.string,
  isEditMode: PropTypes.bool,
};

export default SponsorCard;
