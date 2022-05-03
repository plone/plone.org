import React from 'react';
import cx from 'classnames';
import redraft from 'redraft';
import { ListingLinkMore } from '@package/components';
import ViewColumn from './Block/ViewBlock';
import { Container } from 'semantic-ui-react';
import config from '@plone/volto/registry';

const View = ({ data }) => {
  const checkHasContent = (content) => {
    if (content) {
      let blocks = content.blocks.filter((block) => block?.text !== '');
      return blocks.length > 0 ? true : false;
    }
  };

  const content = (
    <>
      {(data.title || checkHasContent(data.description)) && (
        <div className="block-content-header">
          {data.title && (
            <div
              className={cx('title', {
                'hide-decoration': data.showTitleDecoration === false,
              })}
            >
              {data.title}
            </div>
          )}
          {checkHasContent(data.description) && (
            <div className="description">
              {redraft(
                data.description,
                config.settings.richtextViewSettings.ToHTMLRenderers,
                config.settings.richtextViewSettings.ToHTMLOptions,
              )}
            </div>
          )}
        </div>
      )}

      <div className="columns-wrapper">
        {data?.columns?.map((numberBlock, i) => (
          <ViewColumn data={numberBlock} index={i} />
        ))}
      </div>

      <ListingLinkMore
        linkTitle={data.href_title}
        linkHref={data.href}
        buttonClassName="site--button-blue"
      />
    </>
  );
  return (
    <div
      className={cx('block-image-columns', {
        ['columns-' + [data.n_columns ?? 4]]: data.n_columns ?? 4,
        'multi-rows': data.columns?.length > data.n_columns ?? 4,
        'full-width': data.fullWidth,
        'grey-bg': data.bg_color === 'light-grey',
      })}
    >
      {data.fullWidth ? <Container>{content}</Container> : content}
    </div>
  );
};

export default View;
