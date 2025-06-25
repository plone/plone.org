import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import { flattenToAppURL } from '@plone/volto/helpers';
import { UniversalLink } from '@plone/volto/components';
import { PresetWrapper, ShareButtons, Button } from '@package/components';
import { TextBlockView } from '@plone/volto-slate/blocks/Text';

const messages = defineMessages({
  cta_title_default: {
    id: 'cta_title_default',
    defaultMessage: 'Go to content',
  },
});

const View = (props) => {
  const intl = useIntl();
  const { data } = props;
  let href = data.link_to?.[0]?.['@id'];

  return (
    <PresetWrapper
      {...props.data}
      usePresetDefaults={false}
      className={cx('block-text6', {
        'text-center': data.alignCenter,
      })}
    >
      <div className="block-content">
        {(data.title || data.share_social) && (
          <div className="block-content-header">
            {data.title && (
              <h3
                className={cx('title', {
                  'hide-decoration': data.showTitleDecoration === false,
                })}
              >
                {data.title}
              </h3>
            )}
            {data.share_social && (
              <div className="content-social">
                <ShareButtons showLabel={false} />
              </div>
            )}
          </div>
        )}

        {data.content && (
          <div className="content">
            <TextBlockView data={{ value: data.content }} />
          </div>
        )}
        {data.have_cta && (
          <div className="box-cta">
            <Button
              as={UniversalLink}
              color={data.bg_color === 'blue' ? 'white' : 'blue'}
              size="large"
              href={flattenToAppURL(href)}
              arrow={true}
            >
              {data.cta_title ?? intl.formatMessage(messages.cta_title_default)}
            </Button>
          </div>
        )}
      </div>
    </PresetWrapper>
  );
};

View.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.object,
    bg_color: PropTypes.string,
    fullWidth: PropTypes.bool,
    have_cta: PropTypes.bool,
    share_social: PropTypes.bool,
    cta_title: PropTypes.string,
    link_to: PropTypes.any,
    alignCenter: PropTypes.bool,
  }),
};

export default View;
