import React from 'react';
import {
  usePanelConfigAndPreferences,
  GDPRCookies,
} from 'volto-gdpr-privacy/helpers';
import CookieBanner from 'volto-gdpr-privacy/components/CookieBanner/CookieBanner';
import GdprPrivacyManagerIncludeComponents from 'volto-gdpr-privacy/components/GdprPrivacyManager/GdprPrivacyManagerIncludeComponents';

const GdprPrivacyManager = () => {
  const cookies = new GDPRCookies();

  usePanelConfigAndPreferences(cookies); //to init data from panel

  return (
    <>
      <CookieBanner cookies={cookies} />
      <GdprPrivacyManagerIncludeComponents cookies={cookies} />
    </>
  );
};
export default GdprPrivacyManager;
