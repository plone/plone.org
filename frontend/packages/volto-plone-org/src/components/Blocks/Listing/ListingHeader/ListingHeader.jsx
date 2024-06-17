import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

/**
 * 'show_title_decoration' è utilizzato solo nel blocco NewsCardListing
 **/

const ListingHeader = ({ headerTitle, show_title_decoration, description }) => {
  return headerTitle?.length > 0 || description?.length > 0 ? (
    <div className="site--listing-header site--preset-header">
      {headerTitle && (
        <h2
          className={cx('site--listing-header-title', {
            'hide-decoration': show_title_decoration === false,
          })}
        >
          {headerTitle}
        </h2>
      )}
      {description && (
        <div className="site--listing-header-description">{description}</div>
      )}
    </div>
  ) : (
    <></>
  );
};

ListingHeader.propTypes = {
  headerTitle: PropTypes.string,
  show_title_decoration: PropTypes.bool,
  description: PropTypes.string,
};
export default ListingHeader;
