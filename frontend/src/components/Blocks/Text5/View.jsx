import React from 'react';
import { defineMessages } from 'react-intl';
import PropTypes from 'prop-types';
import redraft from 'redraft';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Grid } from 'semantic-ui-react';
import { UniversalLink } from '@plone/volto/components';
import { ShareButtons, PresetWrapper, Button } from '@package/components';
import GalleryBody from './GalleryBody';
import { flattenToAppURL } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

const messages = defineMessages({
  cta_title_default: {
    id: 'cta_title_default',
    defaultMessage: 'Go to content',
  },
});

const View = (props) => {
  const { data, intl } = props;

  return (
    <PresetWrapper {...data} usePresetDefaults={false} className="block-text5">
      <div className="block-content">
        {(data.title || data.share_social) && (
          <div className="text5-header">
            {data.title && <h3 className="title">{data.title}</h3>}
            {data.share_social && <ShareButtons showLabel={false} />}
          </div>
        )}
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column computer={6} tablet={12} mobile={12}>
              <div className="description">
                {redraft(
                  data.description,
                  config.settings.richtextViewSettings.ToHTMLRenderers,
                  config.settings.richtextViewSettings.ToHTMLOptions,
                )}
              </div>

              {/* Gallery o singola immagine */}
              <div className="block-text5-gallery">
                <GalleryBody images={data?.images} />
              </div>
              <div className="block-text5-under-blocks">
                <Grid>
                  {/* blocchi sotto alla gallery */}
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      {redraft(
                        data.text1,
                        config.settings.richtextViewSettings.ToHTMLRenderers,
                        config.settings.richtextViewSettings.ToHTMLOptions,
                      )}
                    </Grid.Column>
                    <Grid.Column>
                      {redraft(
                        data.text2,
                        config.settings.richtextViewSettings.ToHTMLRenderers,
                        config.settings.richtextViewSettings.ToHTMLOptions,
                      )}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>
            </Grid.Column>
            {/* right column with social, text and cta */}
            <Grid.Column computer={6} tablet={12} mobile={12}>
              <div className="block-text5-body">
                <div className="content">
                  {redraft(
                    data.content,
                    config.settings.richtextViewSettings.ToHTMLRenderers,
                    config.settings.richtextViewSettings.ToHTMLOptions,
                  )}
                </div>
                {data.has_cta && (
                  <div className="block-text5-button">
                    <Button
                      as={UniversalLink}
                      size="small"
                      href={
                        data.link_to
                          ? flattenToAppURL(data.link_to[0]?.['@id'])
                          : data.link_to_external
                          ? data.link_to_external
                          : null
                      }
                    >
                      {data.cta_title ||
                        intl.formatMessage(messages.cta_title_default)}
                      <FontAwesomeIcon
                        style={{ marginLeft: 20 }}
                        icon={faArrowRight}
                      />
                    </Button>
                  </div>
                )}
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </PresetWrapper>
  );
};

View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
