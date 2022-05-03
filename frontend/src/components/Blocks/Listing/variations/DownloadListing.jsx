import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import moment from 'moment';
import { useIntl } from 'react-intl';
import {
  ListingHeader,
  ListingLinkMore,
  PresetWrapper,
} from '@package/components';
import { ConditionalLink } from '@plone/volto/components';
import { getFileViewFormat } from '@package/helpers/files';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DownloadListing = (props) => {
  const intl = useIntl();
  moment.locale(intl.locale);
  const { items, isEditMode } = props;
  const defaultIcon = { lib: 'far', name: 'file' };

  /* 
  the property props['@type'] outside the list block is not returned,
  we use it in favor of the "Veneer search" block to set our default appearance
  */

  return (
    <PresetWrapper
      {...props}
      className={cx('download-listing', { show_date: props.show_date })}
    >
      <div className="block-content">
        <ListingHeader {...props} />

        {items.length > 0 && (
          <ul
            className={cx('site--download-link', {
              'list-style': props.show_bullet_list || !props['@type'],
            })}
          >
            {items.map((item, index) => {
              let icon = null;
              if (item['@type'] === 'File' || item['@type'] === 'Image') {
                const viewFormatItem = getFileViewFormat(item);
                icon = viewFormatItem?.icon || defaultIcon;
              }

              return (
                <li key={index}>
                  <div className="infos">
                    {icon && (props.show_icon || !props['@type']) && (
                      <FontAwesomeIcon icon={[icon.lib, icon.name]} />
                    )}
                    <ConditionalLink condition={!isEditMode} item={item}>
                      {item.title}
                    </ConditionalLink>
                  </div>
                  {props.show_date && item.Date && (
                    <div className="date">
                      {moment(item.Date).format('DD.MM.YYYY')}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        <ListingLinkMore {...props} />
      </div>
    </PresetWrapper>
  );
};

DownloadListing.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

export default DownloadListing;
