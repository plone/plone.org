import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import { useIntl, defineMessages } from 'react-intl';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const messages = defineMessages({
  viewImage: {
    id: 'View image',
    defaultMessage: 'View image',
  },
  play: {
    id: 'Play slider',
    defaultMessage: 'Play',
  },
  pause: {
    id: 'Pause slider',
    defaultMessage: 'Pause slider',
  },
});

const SliderWrapper = ({
  autoplay = false,
  autoplay_speed = 3,
  slides_to_show = 1,
  show_dots = true,
  n_items = 0,
  children,
}) => {
  const intl = useIntl();
  const slider = useRef(null);
  const [userAutoplay, setUserAutoplay] = useState(autoplay);
  const nSlidesToShow = parseInt(slides_to_show);

  const toggleAutoplay = () => {
    if (!slider?.current) return;
    if (userAutoplay) {
      setUserAutoplay(false);
      slider.current.slickPause();
    } else {
      setUserAutoplay(true);
      slider.current.slickPlay();
    }
  };

  const settings = {
    dots: show_dots,
    infinite: true,
    autoplay: autoplay,
    speed: 500,
    slidesToShow: nSlidesToShow,
    slidesToScroll: nSlidesToShow,
    autoplaySpeed: autoplay_speed * 1000,
    pauseOnHover: true,
    pauseOnFocus: true,
    pauseOnDotsHover: true,
    swipe: true,
    swipeToSlide: true,
    focusOnSelect: true,
    draggable: true,
    accessibility: true,
    adaptiveHeight: false,

    responsive: [
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 1,
        },
      },
    ],

    appendDots: (dots) => (
      <div>
        {n_items > nSlidesToShow && (
          <div className="play-pause-wrapper">
            <button
              onClick={() => toggleAutoplay()}
              title={
                userAutoplay
                  ? intl.formatMessage(messages.pause)
                  : intl.formatMessage(messages.play)
              }
            >
              <Icon name={userAutoplay ? 'pause' : 'play'} />
            </button>
          </div>
        )}

        <ul style={{ margin: '0px' }}> {dots} </ul>
      </div>
    ),
  };

  return n_items > 0 ? (
    <div className="slider-wrapper">
      <Slider {...settings} ref={slider}>
        {children}
      </Slider>
    </div>
  ) : null;
};

SliderWrapper.propTypes = {
  autoplay: PropTypes.bool,
  autoplay_speed: PropTypes.number,
  slides_to_show: PropTypes.number,
  show_dots: PropTypes.bool,
  n_items: PropTypes.number,
  children: PropTypes.any,
};

export default React.memo(SliderWrapper);
