import { searchContent } from '@plone/volto/actions/search/search';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import SponsorCardListing from '../Blocks/Listing/variations/SponsorCardListing';
import { Button } from '@package/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import { UniversalLink } from '@plone/volto/components';

const FooterSponsors = (props) => {
  const { type = 'platinum' } = props;
  const subrequest_key = `${type}_sponsors`;

  const sponsors = useSelector(
    (state) => state.search['subrequests'][subrequest_key],
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      searchContent(
        '/',
        {
          portal_type: 'FoundationSponsor',
          review_state: 'approved',
          sponsorship_type: type,
          sort_on: 'sortable_title',
          sort_order: 'ascending',
        },
        subrequest_key,
      ),
    );
  }, [dispatch, subrequest_key, type]);

  const plural = sponsors?.items.length > 1 ? 's' : '';
  const capitalizedType = String(type[0]).toUpperCase() + String(type).slice(1);
  return sponsors?.loaded
    ? sponsors.items.length > 0 && (
        <div className={`footer-sponsors-listing ${subrequest_key}`}>
          <div className="footer-sponsors-listing-headline">
            <h3>{`Our proud ${capitalizedType} Sponsor${plural}`}</h3>
            <Button
              as={UniversalLink}
              primary
              size="medium"
              href={flattenToAppURL('/foundation/sponsorship')}
              arrow={true}
            >
              Become a Sponsor
            </Button>
          </div>
          <SponsorCardListing items={sponsors.items || []} />
        </div>
      )
    : '';
};

export default FooterSponsors;
