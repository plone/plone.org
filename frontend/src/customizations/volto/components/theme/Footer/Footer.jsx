/**
 * Header component.
 * @module components/theme/Header/Header
 */

import React from 'react';

import SiteFooter from '@package/components/layout/Footer/SiteFooter';

const Footer = ({ pathname }) => {
  return <SiteFooter pathname={pathname} />;
};

export default Footer;
