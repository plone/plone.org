import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import {
  CheckboxWidget,
  TextWidget,
  ObjectBrowserWidget,
} from '@plone/volto/components';
import { TextBlockStyleSidebar } from '@package/components';

const messages = defineMessages({
  text6alignCenter: {
    id: 'text6alignCenter',
    defaultMessage: 'Center content',
  },
  showTitleDecoration: {
    id: 'showTitleDecoration',
    defaultMessage: 'Show title separator line',
  },
  have_cta: {
    id: 'have_cta',
    defaultMessage: 'Show CTA',
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
    defaultMessage: 'Text to show for the block CTA.',
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
});

const Sidebar = (props) => {
  const intl = useIntl();
  const {
    have_cta,
    cta_title,
    link_to,
    alignCenter,
    showTitleDecoration,
    onChange,
  } = props;
  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="Text6" defaultMessage="Text 6" />
        </h2>
      </header>
      <TextBlockStyleSidebar
        {...props}
        backgroundColorOptions={[
          { name: 'white', label: 'Bianco' },
          { name: 'light-grey', label: 'Grigio' },
          { name: 'blue', label: 'Blu' },
        ]}
      />

      <Segment className="form sidebar-listing-data">
        <CheckboxWidget
          id="showTitleDecoration"
          title={intl.formatMessage(messages.showTitleDecoration)}
          value={showTitleDecoration ?? true}
          onChange={onChange}
        />
        <CheckboxWidget
          id="alignCenter"
          title={intl.formatMessage(messages.text6alignCenter)}
          value={alignCenter ?? false}
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
          </>
        )}
      </Segment>
    </Segment.Group>
  );
};

Sidebar.propTypes = {
  bg_color: PropTypes.string,
  fullWidth: PropTypes.bool,
  have_cta: PropTypes.bool,
  cta_title: PropTypes.string,
  link_to: PropTypes.any,
  alignCenter: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Sidebar;
