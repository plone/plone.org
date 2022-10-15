import React, { useEffect, useState, createRef } from 'react';
import cx from 'classnames';
//import { useSelector } from 'react-redux';
import { Container, Segment } from 'semantic-ui-react';

import {
  //Anontools,
  Logo,
  Navigation,
  LanguageSelector,
  //SearchWidget,
} from '@plone/volto/components';
import { SecondaryMenu } from 'volto-secondarymenu';
import HeaderSearch from './HeaderSearch';

const SiteHeader = ({ pathname }) => {
  //const token = useSelector((state) => state.userSession.token);
  const [sticky, setSticky] = useState(false);
  const [width, setWidth] = useState(0);
  const headerRef = createRef();
  const handleSticky = () => {
    console.log(window.scrollY);
    setSticky(window.scrollY > 64);
  };

  useEffect(() => {
    setWidth(headerRef.current.clientWidth);
    window.addEventListener('scroll', handleSticky, false);
    return () => {
      window.removeEventListener('scroll', handleSticky, false);
    };
  }, []);

  //style={sticky ? { width: width + 'px' } : {}}
  return (
    <div
      className={cx('header-wrapper', {
        'padding-bottom': sticky,
      })}
      ref={headerRef}
    >
      <div className={sticky ? 'ui fixed top sticky' : null}>
        <Segment basic className="header-wrapper" role="banner">
          <Container>
            <div className="header">
              <div className="logo-nav-wrapper">
                <div className="logo">
                  <Logo />
                </div>
              </div>

              <div className="nav-wrapper">
                <Navigation pathname={pathname} />
              </div>

              <div className="nav-secondary-search-wrapper">
                <SecondaryMenu pathname={pathname} />
                <LanguageSelector />
                <HeaderSearch />
              </div>

              {/* {!token && (
                <div className="tools">
                  <Anontools />
                </div>
              )} */}
              {/* <div className="search">
                <SearchWidget />
              </div> */}
            </div>
          </Container>
        </Segment>
      </div>
    </div>
  );
};

export default SiteHeader;
