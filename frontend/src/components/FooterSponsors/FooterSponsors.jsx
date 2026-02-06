import { searchContent } from '@plone/volto/actions/search/search';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import SponsorCardListing from '../Blocks/Listing/variations/SponsorCardListing';

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

  return sponsors?.loaded
    ? sponsors.items.length > 0 && (
        <div class={`footer-sponsors-listing ${subrequest_key}`}>
          <h3>{`Our proud ${type} sponsor${plural}`}</h3>
          <SponsorCardListing items={sponsors.items || []} />
        </div>
      )
    : '';
};

export default FooterSponsors;
