import React from 'react';
import PropTypes from 'prop-types';
import { useIntl, defineMessages } from 'react-intl';
import { Card, Header } from 'semantic-ui-react';
import Moment from 'moment';

import { UniversalLink } from '@plone/volto/components';
import { Button, ListingImage } from '@package/components';

const messages = defineMessages({
  readMore: {
    id: 'readMore',
    defaultMessage: 'Read more',
  },
});

const NewsCard = (props) => {
  const intl = useIntl();
  const {
    title,
    description,
    card_eyelet, // default "News"
    tags,
    effective,
    show_link_more,
    have_image,
  } = props;

  let image = have_image
    ? ListingImage({ item: props, className: 'imageCard item-image' })
    : null;

  let eyelet = tags?.length > 0 ? tags[0] : card_eyelet ?? '';

  return (
    <Card className="newsCard item">
      <div className={`card-header ${image ? 'has-image' : ''}`}>
        {image && <>{image}</>}
      </div>
      <div className="card-body">
        <div className="eyelet">{eyelet.toUpperCase()}</div>
        <Header as="h4" className="item-header">
          <UniversalLink item={props}>{title}</UniversalLink>
        </Header>
        <div className="item-content">
          <div className="item-text">
            {effective && (
              <div className="dateTime">
                {Moment(effective).format('DD/MM/YYYY')}{' '}
              </div>
            )}
            {!image && <p>{description}</p>}
          </div>

          {show_link_more && (
            <div className="item-button">
              <Button as={UniversalLink} size="small" item={props} arrow={true}>
                {intl.formatMessage(messages.readMore)}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

NewsCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  tags: PropTypes.array,
  cardEyelet: PropTypes.string,
  image: PropTypes.any,
  show_link_more: PropTypes.bool,
  effective: PropTypes.string,
};

export default NewsCard;
