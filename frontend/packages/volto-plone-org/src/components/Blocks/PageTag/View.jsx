import React from 'react';
import Body from './Body';

const View = (props) => {
  return props?.properties?.tags?.length > 0 ? (
    <div className="block page-tag">
      <Body {...props} />
    </div>
  ) : (
    <></>
  );
};

export default View;
