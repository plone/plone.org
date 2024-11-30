/**
 * Header component.
 * @module components/theme/Header/Header
 */

import React from 'react';

import SiteHeader from 'volto-plone-org/components/layout/Header/SiteHeader';

const Header = ({ pathname }) => {
  return <SiteHeader pathname={pathname} />;
};

export default Header;
