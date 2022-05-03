import React from 'react';
import cx from 'classnames';
import { Button as SButton } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Icon } from '@plone/volto/components';
import ctaArrowSVG from '@package/icons/cta-arrow.svg';

const Button = (props) => {
  let classColor = 'site--button-' + props.color;
  const { arrow, ...otherProps } = props;
  let buttonClass = cx({
    'site--button': true,
    'site--button-outline': props.color?.indexOf('outline') >= 0,
    'site--button-arrow': arrow,
    [classColor]: props.color,
    [props.className]: props.className != null,
  });
  return (
    <SButton {...otherProps} color={null} className={buttonClass}>
      <span>{props.children}</span>
      {props.arrow && (
        <Icon name={ctaArrowSVG} className="arrow-icon" size="16px" />
      )}
    </SButton>
  );
};

PropTypes.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
  arrow: PropTypes.bool,
};

export default Button;
