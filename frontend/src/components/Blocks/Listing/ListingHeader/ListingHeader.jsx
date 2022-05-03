import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

/**
 * 'show_title_decoration' è utilizzato solo nel blocco NewsCardListing
 **/

const ListingHeader = ({ title, show_title_decoration, description }) => {
  return title?.length > 0 || description?.length > 0 ? (
    <div className="site--listing-header site--preset-header">
      {title && (
        <h2
          className={cx('site--listing-header-title', {
            'hide-decoration': show_title_decoration === false,
          })}
        >
          {title}
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
  title: PropTypes.string,
  show_title_decoration: PropTypes.bool,
  description: PropTypes.string,
};
export default ListingHeader;
