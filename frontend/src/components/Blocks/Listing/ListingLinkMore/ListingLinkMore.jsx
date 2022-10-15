import React from 'react';
import PropTypes from 'prop-types';
import { flattenToAppURL } from '@plone/volto/helpers';
import { UniversalLink } from '@plone/volto/components';

import { Button } from '@package/components';

const ListingLinkMore = ({ linkTitle, linkHref, buttonClassName }) => {
  let href = linkHref?.[0]?.['@id'];

  return href?.length > 0 ? (
    <div className="site--listing-link-more">
      <Button
        as={UniversalLink}
        primary
        size="small"
        href={flattenToAppURL(href)}
        className={buttonClassName}
        arrow={true}
      >
        {linkTitle || href}
      </Button>
    </div>
  ) : (
    <></>
  );
};

ListingLinkMore.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};
export default ListingLinkMore;
