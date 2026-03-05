import { searchContent } from '@plone/volto/actions/search/search';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import SponsorCardListing from '../Blocks/Listing/variations/SponsorCardListing';
import { Button } from '@package/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import { UniversalLink } from '@plone/volto/components';

import yourLogoHereSVG from './YourLogo.svg';

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

  const sponsorItems = sponsors?.loaded
    ? sponsors.items.length > 0 &&
      sponsors.items.map((item) => {
        item['size'] = 'thumb';
        return item;
      })
    : [];

  const listingSize = 5;

  if (sponsorItems.length > 0) {
    const remainder = sponsorItems.length % listingSize;
    if (remainder > 0) {
      const placeholdersToAdd = listingSize - remainder;
      for (let i = 0; i < placeholdersToAdd; i++) {
        sponsorItems.push({
          '@id': '/foundation/sponsorship',
          title: 'Put your logo here',
          size: 'thumb',
          isPlaceholder: true,
          image: {
            scales: { thumb: { download: yourLogoHereSVG } },
          },
        });
      }
    }
  }

  return sponsors?.loaded
    ? sponsors.items.length > 0 && (
        <div className={`footer-sponsors-listing ${subrequest_key}`}>
          <div className="footer-sponsors-listing-headline">
            <h3>Powering the Future of Open Sovereignty</h3>
            <Button
              as={UniversalLink}
              primary
              size="medium"
              href={flattenToAppURL('/foundation/sponsorship')}
              arrow={true}
            >
              Become a sponsor — every contribution shapes our future!
            </Button>
          </div>
          <p>
            Plone thrives because of organizations that believe in secure,
            independent, and open technology. We are deeply grateful to our
            Platinum Sponsors for their visionary support in sustaining the
            world's most secure CMS. Join them in shaping the future of digital
            freedom.
          </p>

          <SponsorCardListing
            items={sponsorItems || []}
            cols={listingSize}
            randomize={false}
          />
        </div>
      )
    : '';
};

export default FooterSponsors;
