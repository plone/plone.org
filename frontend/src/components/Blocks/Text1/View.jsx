import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import { Grid } from 'semantic-ui-react';
import redraft from 'redraft';
import { flattenToAppURL } from '@plone/volto/helpers';
import { UniversalLink } from '@plone/volto/components';
import { Button, PresetWrapper, ShareButtons } from '@package/components';
import config from '@plone/volto/registry';

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

  let ctaButton = (
    <Button
      as={UniversalLink}
      color={data.buttonColor}
      size="large"
      href={flattenToAppURL(href)}
      arrow={true}
    >
      {data.cta_title ?? intl.formatMessage(messages.cta_title_default)}
    </Button>
  );

  return (
    <PresetWrapper
      {...props.data}
      usePresetDefaults={false}
      className={cx('block-text1', {
        'corner-decoration': data.showCorner,
        ['corner-' + data.cornerColor]: data.cornerColor,
      })}
    >
      <div className="block-content">
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column
              computer={6}
              tablet={6}
              mobile={16}
              className="text-break"
            >
              {data.title && <h3 className="title">{data.title}</h3>}
              {data.have_cta && (
                <div className="block-text1-desktop-btn">{ctaButton}</div>
              )}
            </Grid.Column>
            <Grid.Column computer={6} tablet={6} mobile={16}>
              <div className="content">
                {data.share_social && (
                  <div className="content-social">
                    <ShareButtons showLabel={false} />
                  </div>
                )}
                {redraft(
                  data.content,
                  config.settings.richtextViewSettings.ToHTMLRenderers,
                  config.settings.richtextViewSettings.ToHTMLOptions,
                )}
              </div>
              {data.have_cta && (
                <div className="block-text1-mobile-btn">{ctaButton}</div>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </PresetWrapper>
  );
};

View.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.object,
    share_social: PropTypes.bool,
    greyBg: PropTypes.bool,
    alignLeft: PropTypes.bool,
  }),
};

export default View;
