import React from 'react';
import { Button } from 'semantic-ui-react';
import { flattenToAppURL } from '@plone/volto/helpers';
import { UniversalLink } from '@plone/volto/components';

const Body = (props) => {
  const { data, isEditMode } = props;

  return data?.links?.length > 0 ? (
    <div className="site--chips">
      {data?.links?.map((link, index) => (
        <Button
          className="site--chip site--chip-outline"
          as={UniversalLink}
          href={flattenToAppURL(link['@id'])}
          key={index}
        >
          {link.title}
        </Button>
      ))}
    </div>
  ) : isEditMode ? (
    <div>Select linked items from the sidebar</div>
  ) : (
    <></>
  );
};
export default Body;
