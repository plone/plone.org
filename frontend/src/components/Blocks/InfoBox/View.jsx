import React from 'react';
import Body from './Body';

const View = (props) => {
  return (
    <div className={'block info-box'}>
      <Body {...props} />
    </div>
  );
};

export default View;
