import React from 'react';
import { DefaultView } from '@plone/volto/components';
import { Segment, Container } from 'semantic-ui-react';
import { UniversalLink } from '@plone/volto/components';

const HotfixView = (props) => {
  const { content } = props;
  return (
    <>
      <Container>
        <h1 className="documentFirstHeading">{content.id}</h1>
        <h3>Issues fixed</h3>
        {content.items.map((item) => (
          <Segment key={item.url} className="listing-item">
            <UniversalLink
              item={item}
              className="summary url"
              title={item['@type']}
            >
              {item.title}
            </UniversalLink>
          </Segment>
        ))}
      </Container>
      <DefaultView {...props} />;
    </>
  );
};

export default HotfixView;
