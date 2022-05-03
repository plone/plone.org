import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import redraft from 'redraft';
import { Grid, Image } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { flattenToAppURL } from '@plone/volto/helpers';
import { UniversalLink } from '@plone/volto/components';

import { PresetWrapper, ShareButtons } from '@package/components';
import CustomButton from '@package/components/Button/Button';
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

  const img_column_width = data.img_column_width
    ? parseInt(data.img_column_width)
    : 6;

  return (
    <PresetWrapper
      {...props.data}
      usePresetDefaults={false}
      className="block-text7"
    >
      {data.share_social && (
        <div className="content-social">
          <ShareButtons showLabel={false} />
        </div>
      )}
      <Grid className="block-content" verticalAlign="middle">
        <Grid.Row
          columns={2}
          className={cx({
            'block-right': data.right,
          })}
        >
          <Grid.Column computer={img_column_width} tablet={12} mobile={12}>
            {data.url && (
              <Image
                src={`${flattenToAppURL(props.data.url)}/@@images/image/larger`}
                className="block-text7-image"
              />
            )}
          </Grid.Column>
          <Grid.Column computer={12 - img_column_width} tablet={12} mobile={12}>
            <div className="block-text7-body">
              {data.title && <h3 className="title">{data.title}</h3>}
              <div className="content">
                {redraft(
                  data.content,
                  config.settings.richtextViewSettings.ToHTMLRenderers,
                  config.settings.richtextViewSettings.ToHTMLOptions,
                )}
              </div>
              {data.has_cta && (
                <div className="buttonBottom">
                  <CustomButton
                    as={UniversalLink}
                    size="small"
                    href={
                      data.link_to
                        ? flattenToAppURL(data.link_to[0]?.['@id'])
                        : data.link_to_external
                        ? data.link_to_external
                        : null
                    }
                    arrow={true}
                  >
                    {data.cta_title ||
                      intl.formatMessage(messages.cta_title_default)}
                  </CustomButton>
                </div>
              )}
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </PresetWrapper>
  );
};

View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
