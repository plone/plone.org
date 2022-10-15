import React from 'react';
import Body from './Body';

const View = (props) => {
  return (
    <div className={'block breadcrumbs'}>
      <Body {...props} pathname={props.path} />
    </div>
  );
};

export default View;
