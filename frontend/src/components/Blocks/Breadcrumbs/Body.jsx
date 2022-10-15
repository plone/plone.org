import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { Breadcrumb, Container, Segment } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { getBreadcrumbs } from '@plone/volto/actions';
import { getBaseUrl, hasApiExpander } from '@plone/volto/helpers';

const messages = defineMessages({
  home: {
    id: 'Home',
    defaultMessage: 'Home',
  },
  breadcrumbs: {
    id: 'Breadcrumbs',
    defaultMessage: 'Breadcrumbs',
  },
});

const Body = (props) => {
  const { pathname, properties, data } = props;
  const intl = useIntl();

  const root = useSelector((state) => state.breadcrumbs.root);
  const brdcitems = useSelector((state) => state.breadcrumbs.items);

  const [items, setItems] = useState([]);

  /*The request to get breadcrumns is in src/customizations/volto/components/theme/Breadcrumbs.jsx 
  because that request is also needed for the folderContents. 
  This component only takes care of showing them.*/

  useEffect(() => {
    setItems([...brdcitems]);
  }, [brdcitems]);

  useEffect(() => {
    if (pathname?.endsWith('/add')) {
      let newItems = [...brdcitems];
      if (newItems[newItems.length - 1]?.url !== null) {
        newItems.push({ title: properties.title, url: null });
      }
      newItems[newItems.length - 1].title = properties.title;
      setItems([...newItems]);
    }
    if (items.length > 0 && pathname?.endsWith('/edit')) {
      let newItems = [...items];
      newItems[newItems.length - 1].title = properties.title;
      setItems([...newItems]);
    }
  }, [properties.title, brdcitems]);

  return (
    <div className={data?.background ? 'full-width grey-bg' : ''}>
      <Segment
        role="navigation"
        aria-label={intl.formatMessage(messages.breadcrumbs)}
        className="breadcrumbs"
        vertical
      >
        <Container>
          <Breadcrumb>
            <Link
              to={root || '/'}
              className="section"
              title={intl.formatMessage(messages.home)}
            >
              Home{/* <Icon name={homeSVG} size="18px" /> */}
            </Link>
            {items.map((item, index, items) => [
              <Breadcrumb.Divider key={`divider-${item.url}`}>
                >
              </Breadcrumb.Divider>,
              index < items.length - 1 ? (
                <Link key={item.url} to={item.url} className="section">
                  {item.title}
                </Link>
              ) : (
                <Breadcrumb.Section key={item.url} active>
                  {item.title}
                </Breadcrumb.Section>
              ),
            ])}
          </Breadcrumb>
        </Container>
      </Segment>
    </div>
  );
};
export default Body;
