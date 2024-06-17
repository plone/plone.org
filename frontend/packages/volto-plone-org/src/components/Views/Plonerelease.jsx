import React from 'react';
import { DefaultView } from '@plone/volto/components';
import { Container } from 'semantic-ui-react';

const PlonereleaseView = (props) => {
  const { content } = props;
  return (
    <>
      <Container>
        <h1 className="documentFirstHeading">Plone {content.version}</h1>
      </Container>
      <DefaultView {...props} />;
    </>
  );
};

export default PlonereleaseView;
