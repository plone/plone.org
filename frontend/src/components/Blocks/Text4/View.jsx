import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import redraft from 'redraft';

import { PresetWrapper, ShareButtons } from '@package/components';
import config from '@plone/volto/registry';

const View = (props) => {
  const { data } = props;
  const { title, content, content1, share_social, alignLeft } = data;

  return (
    <PresetWrapper
      {...props.data}
      usePresetDefaults={false}
      className={cx('block-text4', {
        'align-left': alignLeft,
      })}
    >
      <div className="block-content">
        <div className="block-content-header">
          {title && <h3 className="title">{title}</h3>}
          {share_social && (
            <div className="content-social">
              <ShareButtons showLabel={false} />
            </div>
          )}
        </div>

        <div className="columns-wrapper">
          <div className="column">
            {redraft(
              content,
              config.settings.richtextViewSettings.ToHTMLRenderers,
              config.settings.richtextViewSettings.ToHTMLOptions,
            )}
          </div>
          <div className="column">
            {redraft(
              content1,
              config.settings.richtextViewSettings.ToHTMLRenderers,
              config.settings.richtextViewSettings.ToHTMLOptions,
            )}
          </div>
        </div>
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
