import React from 'react';
import cx from 'classnames';
import { Card, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { UniversalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import { Button, ListingImage } from '@package/components';

const SimpleCard = (props) => {
  const {
    title,
    have_description,
    description,
    have_image,
    have_cta,
    cardLinkHref,
    cardLinkTitle,
  } = props;

  let image = have_image
    ? ListingImage({ item: props, className: 'item-image' })
    : null;

  let cardClass = cx('item', {
    'simple-card': true,
    'with-image': image != null,
  });

  let link = (
    <Button
      as={UniversalLink}
      size="small"
      href={cardLinkHref ? flattenToAppURL(cardLinkHref) : null}
      item={cardLinkHref ? null : props}
      arrow={true}
    >
      {cardLinkTitle || cardLinkHref}
    </Button>
  );

  return (
    <Card className={cardClass}>
      {image}
      <Header as="h4" className="item-header">
        <UniversalLink item={props}>{title}</UniversalLink>
      </Header>
      {have_description && <p className="item-text">{description}</p>}
      {have_cta && <div className="item-button">{link}</div>}
    </Card>
  );
};

SimpleCard.propTypes = {
  title: PropTypes.string.isRequired,
  have_description: PropTypes.bool,
  description: PropTypes.string,
  have_image: PropTypes.bool,
  have_cta: PropTypes.bool,
  image: PropTypes.any,
  linkHref: PropTypes.string,
  linkTitle: PropTypes.string,
  isEditMode: PropTypes.bool,
};

export default SimpleCard;
