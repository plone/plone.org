import React from 'react';
import cx from 'classnames';
import redraft from 'redraft';
import { ListingLinkMore } from '@package/components';
import ViewBlock from './Block/ViewBlock';
import { Container } from 'semantic-ui-react';
import config from '@plone/volto/registry';

const View = ({ data }) => {
  const checkHasContent = (content) => {
    if (content) {
      let blocks = content.blocks.filter((block) => block?.text !== '');
      return blocks.length > 0 ? true : false;
    }
  };
  let content = (
    <>
      {(data.title || checkHasContent(data.description)) && (
        <div className="block-content-header">
          {data.title && <div className={cx('title')}>{data.title}</div>}
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
          <ViewBlock data={numberBlock} {...data} key={i} />
        ))}
      </div>
      <ListingLinkMore
        linkTitle={data.href_title}
        linkHref={data.href}
        buttonClassName="site--button-blue"
      />
    </>
  );

  const ncolumns = data.n_columns ?? 4;

  return (
    <div
      className={cx('block-icons-text', {
        'multi-rows': data.columns.length > ncolumns,
        'grey-bg': data.bg_color === 'light-grey',
        'full-width': data.fullWidth,
        'no-adapt-columns': data.noAdaptColumns,
        ['title-' + data.title_color]: data.title_color,
        ['header-align-' + data.header_align]: data.header_align ?? 'center',
        ['columns-' + [ncolumns]]: ncolumns,
      })}
    >
      {data.fullWidth ? <Container>{content}</Container> : content}
    </div>
  );
};

export default View;
