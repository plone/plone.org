import React from 'react';
import cx from 'classnames';
import { ListingLinkMore } from '@package/components';
import ViewBlock from './Block/ViewBlock';
import { Container } from 'semantic-ui-react';
import { TextBlockView } from '@plone/volto-slate/blocks/Text';

const View = ({ data }) => {
  let content = (
    <>
      {(data.title || data.description) && (
        <div className="block-content-header">
          {data.title && <div className={cx('title')}>{data.title}</div>}
          {data.description && (
            <div className="description">
              <TextBlockView data={{ value: data.description }} />
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
        'mobile-block': data.mobileStyles,
      })}
    >
      {data.fullWidth ? <Container>{content}</Container> : content}
    </div>
  );
};

export default View;
