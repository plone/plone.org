import React from 'react';
import Body from './Body';

const View = (props) => {
  return (
    <div className="related-items">
      <Body {...props} isEditMode={false} />
    </div>
  );
};

export default View;
