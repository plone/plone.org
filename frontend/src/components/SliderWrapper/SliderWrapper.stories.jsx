import React from 'react';
import { Container } from 'semantic-ui-react';
import { ComponentStory } from '@storybook/react';
import SliderWrapper from './SliderWrapper';

const slides = [
  {
    image:
      'https://cdn.pixabay.com/photo/2021/08/24/15/38/sand-6570980_1280.jpg',
    title: 'Slide 1',
  },
  {
    image:
      'https://cdn.pixabay.com/photo/2021/08/25/07/23/nature-6572635_1280.jpg',
    title: 'Slide 2',
  },
  {
    image:
      'https://cdn.pixabay.com/photo/2020/12/22/16/30/art-5852645_1280.jpg',
    title: 'Slide 3',
  },
  {
    image:
      'https://cdn.pixabay.com/photo/2021/08/14/04/15/mountains-6544522_1280.jpg',
    title: 'Slide 4',
  },
];

const children = (
  <>
    {slides.map((slide, index) => {
      return (
        <div className="single-slide-wrapper" key={index}>
          <div className="bg-wrapper">
            <img alt="" role="presentation" src={slide.image} loading="lazy" />
          </div>
          <div className="text-overlay">
            <Container>
              <div className="text-overlay-content">
                {slide.title && <div className="title">{slide.title}</div>}
              </div>
            </Container>
          </div>
        </div>
      );
    })}
  </>
);

const Template = (args) => <SliderWrapper {...args} />;

export const Basic = Template.bind({});

Basic.args = {
  autoplay: false,
  autoplay_speed: 2,
  slidesToShow: 1,
  show_dots: true,
  n_items: 4,
  children: children,
};

export default {
  title: 'Common/SliderWrapper',
  component: SliderWrapper,
  decorators: [(Story) => <div>{Story()}</div>],
};
