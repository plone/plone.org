import React from 'react';
import PropTypes from 'prop-types';

import { ListingHeader, ListingLinkMore } from '@package/components';
import { ConditionalLink } from '@plone/volto/components';
import { getFileViewFormat } from '@package/helpers/files';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ListingImage, PresetWrapper } from '@package/components';

const DownloadListing = (props) => {
  const { items, isEditMode } = props;
  const defaultIcon = { lib: 'fal', name: 'file' };

  return (
    <PresetWrapper {...props} className="search-results-listing">
      <ListingHeader {...props} />

      {items.length > 0 && (
        <div className="results">
          {items.map((item, index) => {
            let icon = defaultIcon;
            if (item['@type'] === 'File' || item['@type'] === 'Image') {
              const viewFormatItem = getFileViewFormat(item);
              icon = viewFormatItem?.icon || defaultIcon;
            }
            let image = ListingImage({
              item: item,
              className: 'item-image',
              size: 'thumb',
            });

            return (
              <div key={index} className="result-item">
                <div className="preview-item">
                  {image ? (
                    image
                  ) : icon ? (
                    <FontAwesomeIcon
                      icon={[icon.lib, icon.name]}
                      className="icon"
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <div className="item-infos">
                  <ConditionalLink
                    condition={!isEditMode}
                    item={item}
                    className="item-title"
                  >
                    {item.title}
                  </ConditionalLink>
                  {item.description && (
                    <div className="item-description">{item.description}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ListingLinkMore {...props} />
    </PresetWrapper>
  );
};

DownloadListing.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

export default DownloadListing;
