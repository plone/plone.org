import React from 'react';
import PropTypes from 'prop-types';
import { flattenToAppURL } from '@plone/volto/helpers';
import cx from 'classnames';
import { Grid, Image, Container } from 'semantic-ui-react';
import Body from './Body';

const View = (props) => {
  const { data } = props;

  return (
    <div
      className={cx('block-author', {
        'grey-bg': data.greyBg,
        'full-width': data.fullWidth,
      })}
    >
      <Container className="block-content">
        <Grid>
          <Grid.Row columns={data.url ? 2 : 1}>
            {data.url && (
              <Grid.Column computer={3} tablet={3} mobile={12}>
                <Image
                  src={`${flattenToAppURL(data.url)}/@@images/image/preview`}
                  className="block-author-image"
                />
              </Grid.Column>
            )}
            <Grid.Column
              computer={data.url ? 9 : 12}
              tablet={data.url ? 9 : 12}
              mobile={12}
            >
              <Body {...props} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
};

View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
