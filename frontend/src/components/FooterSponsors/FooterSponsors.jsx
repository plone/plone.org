import { searchContent } from '@plone/volto/actions/search/search';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import SponsorCardListing from '../Blocks/Listing/variations/SponsorCardListing';
import { Button } from '@package/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import { UniversalLink } from '@plone/volto/components';

import yourLogoHereSVG from './YourLogov2.svg';

const TEXTS = {
  sponsor: {
    title: 'Powering the Future of Open Sovereignty',
    claim:
      "Plone thrives because of organizations that believe in secure, independent, and open technology. We are deeply grateful to our Platinum Sponsors for their visionary support in sustaining the world's most secure CMS. Join in shaping the future of digital freedom.",
    url: '/foundation/sponsorship',
    urlClaim: 'Become a sponsor — every contribution shapes our future!',
  },
  contributor: {
    title: 'Powering the Future of Open Sovereignty',
    claim:
      "Plone thrives because of organizations that believe in secure, independent, and open technology. We are deeply grateful to our Community Platinum Contributors for their visionary support in building the world's most secure CMS. Join in shaping the future of digital freedom.",
    url: '/foundation/community-recognition',
    urlClaim: 'Learn about who makes Plone shine with their contributions!',
  },
};

const FooterSponsors = (props) => {
  const { type = 'platinum', text = 'sponsor' } = props;

  const sponsor_query =
    text === 'sponsor' ? { sponsorship_type: type } : { Subject: type };

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
          sort_on: 'sortable_title',
          sort_order: 'ascending',
          ...sponsor_query,
        },
        subrequest_key,
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, subrequest_key, type]);

  const sponsorItems = sponsors?.loaded
    ? sponsors.items.length > 0 &&
      sponsors.items.map((item) => {
        item['size'] = 'thumb';
        return item;
      })
    : [];

  const listingSize = sponsorItems.length + 1;

  if (sponsorItems.length > 0) {
    const remainder = sponsorItems.length % listingSize;
    if (remainder > 0) {
      const placeholdersToAdd = listingSize - remainder;
      for (let i = 0; i < placeholdersToAdd; i++) {
        sponsorItems.push({
          '@id': TEXTS[text]['url'],
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
            <h3>{TEXTS[text]['title']}</h3>

            <Button
              as={UniversalLink}
              primary
              size="medium"
              href={flattenToAppURL(TEXTS[text]['url'])}
              arrow={true}
            >
              {TEXTS[text]['urlClaim']}
            </Button>
          </div>
          <p>{TEXTS[text]['claim']}</p>

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
