/**
 * Gallery Body component
 * @property {Array} images
 * allows you to draw a gallery inside the Text5 block
 * -> if only one image is inserted, that is shown,
 * -> if more than one is inserted it shows the Slider
 **/

import React, { useRef } from 'react';
import { flattenToAppURL } from '@plone/volto/helpers';
import { defineMessages, useIntl } from 'react-intl';
import { Image } from 'semantic-ui-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const messages = defineMessages({
  image_placeholder: {
    id: 'ImagePlaceholder',
    defaultMessage: 'Uploaded images will be placed here',
  },
});

const GalleryBody = ({ images }) => {
  const intl = useIntl();
  const gallery = useRef(null);

  let pictures;
  if (images && images.length > 0) {
    pictures = images.filter((element) => element.image);
  }

  const settings = {
    infinite: true,
    dots: true,
    slidesToShow: 1,
    arrows: false,
    slidesToScroll: 1,
    lazyLoad: true,
    customPaging: function (i) {
      return (
        <div className="slick-dot-image">
          <img
            src={`${flattenToAppURL(pictures[i]?.image)}/@@images/image/mini`}
            alt={pictures[i]?.image[0]?.title}
          />
        </div>
      );
    },
  };

  const imagePlaceholder = (
    <>
      <div className="bg-gallery-placeholder">
        <span className="bg-gallery-placeholder-text">
          {intl.formatMessage(messages.image_placeholder)}
        </span>
      </div>
    </>
  );

  return pictures ? (
    <>
      {/* immagine placeholder */}
      {images.length === 1 && !images[0]?.image && imagePlaceholder}
      {/* singola immagine */}
      {pictures.length === 1 && pictures[0]?.image ? (
        <Image
          src={`${flattenToAppURL(pictures[0]?.image)}/@@images/image/teaser`}
        />
      ) : (
        <></>
      )}
      {/* gallery con immagini sottostanti */}
      {pictures.length > 1 && (
        <Slider {...settings} ref={gallery} className="slider-gallery">
          {pictures.map((item) => (
            <div key={item['@id']}>
              {item?.image && (
                <Image
                  src={`${flattenToAppURL(item?.image)}/@@images/image/teaser`}
                />
              )}
            </div>
          ))}
        </Slider>
      )}
    </>
  ) : (
    imagePlaceholder
  );
};

export default GalleryBody;
