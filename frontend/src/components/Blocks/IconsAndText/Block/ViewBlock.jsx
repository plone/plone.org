/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import cx from 'classnames';
import redraft from 'redraft';
import { flattenToAppURL } from '@plone/volto/helpers';
import { UniversalLink } from '@plone/volto/components';
import { Button } from '@package/components';
import config from '@plone/volto/registry';

const ViewBlock = ({ data, bg_color }) => {
  const icon = data.iconImage; //data.icon
  return data.title || icon || (data.headerTextPosition && data.headerText) ? (
    <div
      className={cx('column-block', {
        ['divider_' + data.dividerPosition]: data.dividerPosition,
        ['header-text-' + data.headerTextPosition]: data.headerTextPosition,
      })}
    >
      <div className="column-head">
        {icon && (
          <div className={'icon size_' + data.iconSize}>
            <img
              src={flattenToAppURL(icon) + '/@@images/image/teaser'}
              alt=""
              role="presentation"
              aria-hidden="true"
            />
          </div>
        )}
        {data.headerTextPosition && (
          <div className="header-text">{data.headerText}</div>
        )}
      </div>
      {data.title && (
        <div className="column-title">
          {data.href?.length > 0 && !data.href_title ? (
            <UniversalLink item={data.href[0]}>{data.title}</UniversalLink>
          ) : (
            <>{data.title}</>
          )}
        </div>
      )}
      <div className="column-text">
        {redraft(
          data.text,
          config.settings.richtextViewSettings.ToHTMLRenderers,
          config.settings.richtextViewSettings.ToHTMLOptions,
        )}
      </div>

      {data.href_title && data.href?.length > 0 && (
        <div className="column-footer">
          <Button
            as={UniversalLink}
            color={bg_color === 'light-grey' ? 'outline-blue' : 'blue'}
            size="small"
            item={data.href[0]}
            arrow={true}
          >
            {data.href_title}
          </Button>
        </div>
      )}
    </div>
  ) : (
    <></>
  );
};

export default React.memo(ViewBlock);
