import React from 'react';
import cx from 'classnames';
import { Container } from 'semantic-ui-react';
import { ListingLinkMore } from '@package/components';
import ViewNumberBlock from './Block/ViewBlock';
import { TextBlockView } from '@plone/volto-slate/blocks/Text';

const View = ({ data }) => {
  return (
    <div className="block icons_and_numbers ">
      <div
        className={cx('block-icons-numbers-wrapper', {
          'full-width': data.fullwidth,
          ['bg-' + data.background_color]: data.background_color,
        })}
      >
        <Container>
          <div className="content-wrapper">
            {data.title && <div className="title">{data.title}</div>}
            {data.description && (
              <div className="description">
                <TextBlockView data={{ value: data.description }} />
              </div>
            )}
            <div className="columns-wrapper">
              {data?.columns?.map((numberBlock, i) => (
                <ViewNumberBlock data={numberBlock} key={i} />
              ))}
            </div>

            <ListingLinkMore
              linkTitle={data.href_title}
              linkHref={data.href}
              buttonClassName={
                data.background_color === 'blue'
                  ? 'site--button-white'
                  : 'site--button-blue'
              }
            />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default View;
