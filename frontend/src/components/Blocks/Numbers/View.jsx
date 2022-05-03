import React from 'react';
import cx from 'classnames';
import { Container } from 'semantic-ui-react';
import { flattenToAppURL } from '@plone/volto/helpers';
import ViewNumberBlock from './Block/ViewBlock';

const View = ({ data }) => {
  return (
    <div className="block-numbers">
      <div
        className={cx('block-numbers-wrapper', {
          'has-background': data.backgroundImage,
          'full-width': data.fullWidth,
          ['variation-' + data.variation]: data.variation,
        })}
      >
        {data.backgroundImage && (
          <div
            className="background"
            style={{
              backgroundImage: `url(${flattenToAppURL(
                data.backgroundImage,
              )}/@@images/image)`,
            }}
          ></div>
        )}
        <Container>
          <div className="numbers-wrapper">
            {data?.numbers?.map((numberBlock, i) => (
              <ViewNumberBlock data={numberBlock} key={i} />
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default View;
