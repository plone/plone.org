/**
 * Logo component.
 * @module components/theme/Logo/Logo
 */

import React from 'react';
import { Link } from 'react-router-dom';

import { Image } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import config from '@plone/volto/registry';

import LogoImage from '@package/components/layout/images/logo.svg';

/**
 * Logo component class.
 * @function Logo
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component.
 */
const Logo = () => {
  const { settings } = config;
  const lang = useSelector((state) => state.intl.locale);

  return (
    <Link to={settings.isMultilingual ? `/${lang}` : '/'} title="Plone.org">
      <Image
        src={LogoImage}
        alt="Plone.org logo"
        title="Plone.org logo"
        height={40}
      />
    </Link>
  );
};

export default Logo;
