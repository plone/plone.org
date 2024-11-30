import cx from 'classnames';
import React from 'react';

export default (props) => {
  const { active, children, ...otherProps } = props;

  return (
    <div className={cx('tab-content', { active: active })} {...otherProps}>
      {children}
    </div>
  );
};
