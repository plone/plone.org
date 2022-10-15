import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Icon } from '@plone/volto/components';
import { Button, Grid, Form } from 'semantic-ui-react';
import alignCenterSVG from '@plone/volto/icons/align-center.svg';
import alignLeftSVG from '@plone/volto/icons/align-left.svg';
import alignRightSVG from '@plone/volto/icons/align-right.svg';
import alignBottomSVG from '@plone/volto/icons/collapse-down.svg';
import alignMiddleSVG from '@package/icons/align-middle.svg';
import alignTopSVG from '@plone/volto/icons/collapse-up.svg';

import alignRightArrowSVG from '@plone/volto/icons/end.svg';
import alignLeftArrowSVG from '@plone/volto/icons/beginning.svg';

import cx from 'classnames';

const messages = defineMessages({
  align_center: {
    id: 'Align center',
    defaultMessage: 'center',
  },
  align_left: {
    id: 'Align left',
    defaultMessage: 'on left',
  },
  align_right: {
    id: 'Align right',
    defaultMessage: 'on right',
  },
  align_bottom: {
    id: 'Align bottom',
    defaultMessage: 'bottom',
  },
  align_top: {
    id: 'Align top',
    defaultMessage: 'top',
  },
  align_middle: {
    id: 'Align middle',
    defaultMessage: 'at the center vertically',
  },
});

const AlignWidget = ({
  value,
  id,
  onChange,
  alignments,
  required,
  title,
  showLabel = false,
  iconsWithArrow,
}) => {
  const intl = useIntl();
  alignments = alignments == null ? ['left', 'right', 'center'] : alignments;

  const simple_images = {
    left: alignLeftSVG,
    right: alignRightSVG,
    center: alignCenterSVG,
    top: alignTopSVG,
    middle: alignMiddleSVG,
    bottom: alignBottomSVG,
  };
  const arrow_images = {
    left: alignLeftArrowSVG,
    right: alignRightArrowSVG,
    center: alignCenterSVG,
    top: alignTopSVG,
    middle: alignMiddleSVG,
    bottom: alignBottomSVG,
  };
  const images = iconsWithArrow ? arrow_images : simple_images;

  return (
    <Form.Field inline required={required}>
      <Grid>
        <Grid.Row>
          <Grid.Column width="4">
            <div className="wrapper">
              <label htmlFor="field-align">{title}</label>
            </div>
          </Grid.Column>
          <Grid.Column width="8" className="align-tools">
            {alignments.map((a) => (
              <Button.Group key={a}>
                <Button
                  icon
                  basic
                  aria-label={intl.formatMessage(messages['align_' + a])}
                  onClick={() => onChange(id, a)}
                  active={value === a}
                  className={cx(showLabel && 'with-text')}
                >
                  <Icon name={images[a]} size="24px" />
                  {showLabel && intl.formatMessage(messages['align_' + a])}
                </Button>
              </Button.Group>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form.Field>
  );
};

AlignWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  alignments: PropTypes.array,
};

export default AlignWidget;
