import React from 'react';
import PropTypes from 'prop-types';
import { getPresetClasses } from '@package/helpers/presets';
import { Container } from 'semantic-ui-react';

const PresetWrapper = (props) => {
  const presetClasses = getPresetClasses(props);
  const {
    className,
    bg_color,
    item_bg_color,
    title_color,
    text_color,
    button_color,
    fullWidth,
    djsButtonsAlignCenter,
    usePresetDefaults,
    ...otherProps
  } = props;

  const enabledProps = [
    'alt',
    'title',
    'onChange',
    'onClick',
    'onKeyDown',
    'onKeyUp',
    'onFocus',
    'style',
    'ref',
    'tabIndex',
    'role',
    'aria-',
  ];

  const divProps = Object.keys(otherProps).reduce((obj, key) => {
    if (enabledProps.filter((p) => p.indexOf(key) >= 0).length > 0) {
      return { ...obj, [key]: otherProps[key] };
    }
    return obj;
  });

  return (
    <div className={presetClasses} {...divProps}>
      {fullWidth ? <Container>{props.children}</Container> : props.children}
    </div>
  );
};

PresetWrapper.propTypes = {
  item_bg_color: PropTypes.string,
  title_color: PropTypes.string,
  text_color: PropTypes.string,
  button_color: PropTypes.string,
  djsButtonsAlignCenter: PropTypes.bool,
  className: PropTypes.string,
};

export default PresetWrapper;
