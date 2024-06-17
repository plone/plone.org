import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import { Grid, Button } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';

const messages = defineMessages({
  Color: {
    id: 'Color',
    defaultMessage: 'Color',
  },
});

class ColorListWidget extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    required: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
    colors: PropTypes.array,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    required: false,
    value: null,
    onChange: null,
    colors: [],
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const {
      id,
      title,
      required,
      value,
      onChange,
      intl,
      colors,
      className,
    } = this.props;

    return colors.length > 0 ? (
      <Form.Field
        inline
        required={required}
        className={className}
        id={'field-' + id}
      >
        <Grid>
          <Grid.Row>
            <Grid.Column
              width="12"
              className="color-list-widget"
              verticalAlign="middle"
            >
              <div className="wrapper">
                <label htmlFor={`field-${id}`}>
                  {title ? title : intl.formatMessage(messages.Color)}
                </label>

                <div className="buttons">
                  {colors.map((color) => {
                    return (
                      <Button
                        key={id + color.name}
                        className={color.name}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onChange(id, color.name);
                        }}
                        active={value === color.name}
                        circular
                        aria-label={color.label}
                        title={color.label}
                      />
                    );
                  })}
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form.Field>
    ) : null;
  }
}

export default injectIntl(ColorListWidget);
