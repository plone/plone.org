import React from 'react';
import Body from './Body';
import cx from 'classnames';
import { Container } from 'semantic-ui-react';

const View = (props) => {
  const { data } = props;

  return (
    <div
      className={cx('block-linked-items', {
        'full-width': data?.fullwidth,
        'grey-bg': data?.background,
      })}
    >
      <Container>
        <div className="content-wrapper">
          {data?.title && (
            <div className="title">
              <h3>{data?.title}</h3>
            </div>
          )}
          <Body {...props} />
        </div>
      </Container>
    </div>
  );
};

export default View;
