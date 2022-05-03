import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { CheckboxWidget } from '@plone/volto/components';
import { ColorListWidget } from '@package/components/Widgets';

const messages = defineMessages({
  titleColor: {
    id: 'titleColor',
    defaultMessage: 'Title color',
  },
  bgColor: {
    id: 'bgColor',
    defaultMessage: 'Background color',
  },
  bgFullWidth: {
    id: 'bgFullWidth',
    defaultMessage: 'Set full-width background',
  },

  shareSocial: {
    id: 'shareSocial',
    defaultMessage: 'Show social sharing buttons',
  },
  djsButtonsAlignCenter: {
    id: 'Draftjs buttons align center',
    defaultMessage: 'Center align buttons in text',
  },
});

const TextBlocksStyleSidebar = ({
  share_social,
  bg_color,
  title_color,
  fullWidth,
  onChange,
  djsButtonsAlignCenter,

  backgroundColorOptions = [
    { name: 'white', label: 'White' },
    { name: 'light-grey', label: 'Light grey' },
    { name: 'light-blue', label: 'Light blue' },
  ],
  titleColorOptions = [
    { name: 'grey', label: 'Grey' },
    { name: 'blue', label: 'Blue' },
  ],
}) => {
  const intl = useIntl();

  return (
    <>
      <Segment className="form sidebar-listing-data">
        <CheckboxWidget
          id="share_social"
          title={intl.formatMessage(messages.shareSocial)}
          value={share_social ?? false}
          onChange={onChange}
        />
      </Segment>
      <Segment className="form sidebar-listing-data">
        <ColorListWidget
          id="bg_color"
          title={intl.formatMessage(messages.bgColor)}
          colors={backgroundColorOptions}
          value={bg_color ?? backgroundColorOptions[0].name}
          onChange={onChange}
        />
        <CheckboxWidget
          id="fullWidth"
          title={intl.formatMessage(messages.bgFullWidth)}
          value={fullWidth ?? false}
          onChange={onChange}
        />
      </Segment>
      {titleColorOptions?.length > 0 && (
        <Segment className="form sidebar-listing-data">
          <ColorListWidget
            id="title_color"
            title={intl.formatMessage(messages.titleColor)}
            colors={titleColorOptions}
            value={title_color ?? titleColorOptions[0].name}
            onChange={onChange}
          />
        </Segment>
      )}
      <Segment className="form sidebar-listing-data">
        <CheckboxWidget
          id="djsButtonsAlignCenter"
          title={intl.formatMessage(messages.djsButtonsAlignCenter)}
          value={djsButtonsAlignCenter ?? false}
          onChange={onChange}
        />
      </Segment>
    </>
  );
};

TextBlocksStyleSidebar.propTypes = {
  bg_color: PropTypes.string,
  title_color: PropTypes.string,
  share_social: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default TextBlocksStyleSidebar;
