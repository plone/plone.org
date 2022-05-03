import React from 'react';
import PropTypes from 'prop-types';
import { flattenToAppURL } from '@plone/volto/helpers';
import DefaultImageSVG from '@plone/volto/components/manage/Blocks/Listing/default-image.svg';

const ListingImage = (props) => {
  const {
    item,
    size = 'preview',
    show_default = false,
    getSrc = false,
    ...attrs
  } = props;

  const image = item?.['image_field']
    ? flattenToAppURL(
        `${item?.['@id']}/@@images/${item?.['image_field']}/${size}`,
      )
    : flattenToAppURL(item?.['image']?.scales?.[size]?.download);

  if (getSrc) {
    return image;
  }

  return image ? (
    <img
      src={image}
      alt={item?.['title']}
      loading="lazy"
      {...attrs}
      key={image}
    />
  ) : show_default ? (
    <img
      src={DefaultImageSVG}
      alt={item?.['title']}
      loading="lazy"
      {...attrs}
    />
  ) : null;
};

ListingImage.propTypes = {
  item: PropTypes.object,
  size: PropTypes.string,
  show_default: PropTypes.bool,
};
export default ListingImage;
