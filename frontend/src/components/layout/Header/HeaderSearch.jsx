import React, { useState, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import cx from 'classnames';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SearchWidget } from '@plone/volto/components';
import { useIntl, defineMessages } from 'react-intl';

const messages = defineMessages({
  close: { id: 'close-search', defaultMessage: 'Close search' },
  search_site_title: {
    id: 'search_site_title',
    defaultMessage: 'Search site',
  },
  searchSite: {
    //serve per fare l'override del placeholder di SearchWidget
    id: 'Search Site',
    defaultMessage: 'Type a keyword...',
  },
});

const HeaderSearch = () => {
  const intl = useIntl();
  const location = useLocation();
  const [viewSearch, setViewSearch] = useState(false);

  const handleESC = (e) => {
    if (e.keyCode === 27) {
      //escape press
      setViewSearch(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', handleESC);

    return () => {
      document.body.removeEventListener('keydown', handleESC);
    };
  }, []);

  useEffect(() => {
    setViewSearch(false);
  }, [location]);

  useEffect(() => {
    if (viewSearch) {
      let input = document.querySelector(
        ".searchbox input[name='SearchableText']",
      );
      if (input) {
        input.focus();
      }
    }
  }, [viewSearch]);

  return (
    <div className="header-search">
      <button
        onClick={() => setViewSearch(!viewSearch)}
        className="search-form-open"
      >
        <FontAwesomeIcon icon={['far', 'search']} />
      </button>
      <div
        className={cx('search-form-wrapper', {
          open: viewSearch,
        })}
      >
        {viewSearch && (
          <>
            <Container>
              <h2>{intl.formatMessage(messages.search_site_title)}</h2>
              <SearchWidget pathname={location.pathname} />
            </Container>
            <button
              className="search-form-close"
              onClick={() => setViewSearch(false)}
              aria-label={intl.formatMessage(messages.close)}
            >
              <FontAwesomeIcon icon={['fas', 'times']} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default HeaderSearch;
