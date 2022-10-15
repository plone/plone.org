import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Container } from 'semantic-ui-react';

const View = ({ data }) => (
  <div className="block html">
    <div
      className={cx({
        'full-width': data.fullWidth,
        'grey-bg': data.greyBg,
      })}
    >
      <Container className="block-content">
        {data.title && <h3 className="title">{data.title}</h3>}
        <div dangerouslySetInnerHTML={{ __html: data.html }} />
      </Container>
    </div>
  </div>
);

View.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    greyBg: PropTypes.bool,
    html: PropTypes.string,
    fullWidth: PropTypes.bool,
  }).isRequired,
};

export default View;
