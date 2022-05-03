import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import { ColorListWidget } from '@package/components/Widgets';
import { TextBlockStyleSidebar } from '@package/components';
import {
  CheckboxWidget,
  TextWidget,
  ObjectBrowserWidget,
} from '@plone/volto/components';

const messages = defineMessages({
  text1: {
    id: 'Text1',
    defaultMessage: 'Text 1',
  },

  have_cta: {
    id: 'have_cta',
    defaultMessage: 'Show CTA',
  },
  cta_color: {
    id: 'cta_color',
    defaultMessage: 'CTA colorr',
  },
  cta_title: {
    id: 'cta_title',
    defaultMessage: 'CTA text',
  },
  cta_title_default: {
    id: 'cta_title_default',
    defaultMessage: 'Go to content',
  },
  cta_title_description: {
    id: 'cta_title_description',
    defaultMessage: 'Text to show for CTA',
  },
  link_to: {
    id: 'link_to',
    defaultMessage: 'CTA link',
  },
  link_to_description: {
    id: 'link_to_description',
    defaultMessage:
      "Enter a link for the block's CTA. You can type an external URL or select content.",
  },
  showCorner: {
    id: 'showCorner',
    defaultMessage: 'Show graphic sign on top left corner',
  },
  cornerColor: {
    id: 'cornerColor',
    defaultMessage: 'Graphic sign color',
  },
});

const Sidebar = (props) => {
  const intl = useIntl();
  const {
    have_cta,
    cta_title,
    link_to,
    buttonColor,
    showCorner,
    onChange,
    cornerColor,
  } = props;

  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="text1" defaultMessage="Text 1" />
        </h2>
      </header>
      <TextBlockStyleSidebar {...props} />
      <Segment className="form sidebar-listing-data">
        <CheckboxWidget
          id="showCorner"
          title={intl.formatMessage(messages.showCorner)}
          value={showCorner ?? false}
          onChange={onChange}
        />
        <ColorListWidget
          id="cornerColor"
          title={intl.formatMessage(messages.cornerColor)}
          colors={[
            { name: 'blue', label: 'Blue' },
            { name: 'grey', label: 'Grey' },
          ]}
          value={cornerColor ?? 'blue'}
          onChange={onChange}
        />
      </Segment>

      <Segment className="form sidebar-listing-data">
        <CheckboxWidget
          id="have_cta"
          title={intl.formatMessage(messages.have_cta)}
          value={have_cta ?? false}
          onChange={onChange}
        />
        {have_cta && (
          <>
            <TextWidget
              id="cta_title"
              title={intl.formatMessage(messages.cta_title)}
              description={intl.formatMessage(messages.cta_title_description)}
              value={cta_title ?? ''}
              onChange={onChange}
              placeholder={intl.formatMessage(messages.cta_title_default)}
            />
            <ObjectBrowserWidget
              id="link_to"
              title={intl.formatMessage(messages.link_to)}
              description={intl.formatMessage(messages.link_to_description)}
              mode="link"
              required={have_cta}
              value={link_to}
              onChange={onChange}
              allowExternals={true}
            />
            <ColorListWidget
              id="buttonColor"
              title={intl.formatMessage(messages.cta_color)}
              colors={[
                { name: 'blue', label: 'Blue' },
                { name: 'outline-blue', label: 'Outline blue' },
              ]}
              value={buttonColor ?? 'blue'}
              onChange={onChange}
            />
          </>
        )}
      </Segment>
    </Segment.Group>
  );
};

Sidebar.propTypes = {
  greyBg: PropTypes.bool,
  fullWidth: PropTypes.bool,
  have_cta: PropTypes.bool,
  cta_title: PropTypes.string,
  link_to: PropTypes.any,
  buttonColor: PropTypes.string,
  titlePrimary: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default Sidebar;
