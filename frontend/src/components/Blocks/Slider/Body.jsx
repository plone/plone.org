import React from 'react';
import moment from 'moment';

import { useSelector } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';
import { SliderWrapper, PresetWrapper, Button } from '@package/components';
import { Container, Image } from 'semantic-ui-react';
import { UniversalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';

const messages = defineMessages({
  year: { id: 'slider_year', defaultMessage: 'Year' },
});

const Body = (data) => {
  const intl = useIntl();
  const currentContent = useSelector((state) => state.content?.data ?? {});
  moment.locale(intl.locale);

  const getSubtitle = (content) => {
    const values = [];

    if (content.date) {
      values.push(moment(content.date).format('DD.MM.YYYY'));
    }

    if (content.year) {
      values.push(intl.formatMessage(messages.year) + ' ' + content.year);
    }

    if (content.typology?.length > 0) {
      const typologies = content.typology.join(', ');
      values.push(typologies);
    }

    return values.length > 0 ? values.join(' | ') : null;
  };

  const content = data.properties ?? currentContent;

  return data?.slides ? (
    <Container>
      <div
        className={`size-${data.size || 'l'} ${
          data.fullwidth ? 'full-width' : ''
        }`}
      >
        <SliderWrapper autoplay={data.autoplay} n_items={data?.slides?.length}>
          {data.slides.map((slide, slideIndex) => {
            //image
            let slideImageURL =
              slide.image?.[0]?.image?.scales?.huge?.download ??
              slide.image?.[0]?.['@id']
                ? flattenToAppURL(slide.image?.[0]?.['@id'] + '/@@images/image')
                : null;

            if (slide.content_as_default && !slideImageURL) {
              slideImageURL = data.properties?.image?.data
                ? `data:${data.properties.image['content-type']};${data.properties.image['encoding']},${data.properties.image.data}`
                : flattenToAppURL(content.image?.scales?.huge?.download);
            }

            //title
            let title =
              slide.content_as_default && !slide.title
                ? content.title
                : slide.title;

            //subtitle
            let subtitle =
              slide.content_as_default && !slide.subtitle
                ? getSubtitle(content)
                : slide.subtitle;

            //text
            let text =
              slide.content_as_default && !slide.description
                ? content.description
                : slide.description;

            return (
              <PresetWrapper
                {...slide}
                className="single-slide-wrapper"
                key={slideIndex + 'slide'}
              >
                <div
                  className={`item title-align-${
                    slide.title_align ?? 'left'
                  } text-align-${slide.text_align ?? 'left'} button-align-${
                    slide.href_align ?? 'left'
                  } ${
                    slide.separator ? 'separator-' + slide.separator_color : ''
                  } text-width-${slide.text_fullwidth ? 'full' : 'default'}`}
                >
                  <div className="image-wrapper">
                    {slideImageURL ? (
                      <Image
                        className="bg"
                        src={slideImageURL}
                        role="presentation"
                        alt=""
                      />
                    ) : null}
                  </div>

                  <div
                    className={`text-overlay ${slide.opacity ? 'opacity' : ''}`}
                  >
                    <Container>
                      <div className="text-overlay-content">
                        {title && !slide.hide_title && (
                          <div className="item-header">
                            {slide.href?.[0] && !slide.href_title ? (
                              <UniversalLink item={slide.href[0]}>
                                {slide.title}
                              </UniversalLink>
                            ) : (
                              <>{title}</>
                            )}
                          </div>
                        )}
                        {subtitle && (
                          <div className="item-subheader">{subtitle}</div>
                        )}
                        {slide.separator && (
                          <div className="item-separator"></div>
                        )}
                        {text && (
                          <div
                            className="item-text"
                            dangerouslySetInnerHTML={{
                              __html: text,
                            }}
                          ></div>
                        )}

                        {slide.href?.[0] && slide.href_title && (
                          <div className="item-button">
                            <Button
                              size="small"
                              item={slide.href[0]}
                              as={UniversalLink}
                              arrow={slide.show_cta_arrow}
                            >
                              {slide.href_title}
                            </Button>
                          </div>
                        )}
                      </div>
                    </Container>
                  </div>
                </div>
              </PresetWrapper>
            );
          })}
        </SliderWrapper>
      </div>
    </Container>
  ) : null;
};
export default Body;
