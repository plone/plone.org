import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import {
  CheckboxWidget,
  ObjectBrowserWidget,
  TextWidget,
  SelectWidget,
} from '@plone/volto/components';
import { TextBlockStyleSidebar } from '@package/components';

const messages = defineMessages({
  has_cta: {
    id: 'has_cta',
    defaultMessage: 'Show CTA',
  },
  has_cta_description: {
    id: 'has_cta_description',
    defaultMessage:
      'Choose whether or not to show the CTA in the block, absent by default.',
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
  right: {
    id: 'right',
    defaultMessage: 'Image on right',
  },
  right_description: {
    id: 'right_description',
    defaultMessage: "Align image on right, by default it'is left aligned.",
  },
  img_column_width: {
    id: 'img_column_width',
    defaultMessage: 'Image width',
  },
});

const Sidebar = (props) => {
  const intl = useIntl();
  const {
    has_cta,
    cta_title,
    right,
    link_to,
    img_column_width,
    onChange,
  } = props;
  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="text7" defaultMessage="Text 7" />
        </h2>
      </header>
      <TextBlockStyleSidebar {...props} />

      <Segment className="form sidebar-listing-data">
        <CheckboxWidget
          id="right"
          title={intl.formatMessage(messages.right)}
          value={right}
          onChange={onChange}
        />
        <SelectWidget
          id="img_column_width"
          title={intl.formatMessage(messages.img_column_width)}
          choices={[
            ['1', '8%'],
            ['2', '16%'],
            ['3', '25%'],
            ['4', '33%'],
            ['5', '41%'],
            ['6', '50%'],
            ['7', '58%'],
            ['8', '66%'],
            ['9', '75%'],
            ['10', '83%'],
            ['11', '91%'],
          ]}
          value={img_column_width ?? 6}
          onChange={onChange}
        />
      </Segment>
      <Segment className="form sidebar-listing-data">
        <CheckboxWidget
          id="has_cta"
          title={intl.formatMessage(messages.has_cta)}
          value={has_cta}
          onChange={onChange}
        />
        {has_cta && (
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
              required={has_cta}
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
  has_cta: PropTypes.bool,
  right: PropTypes.bool,
  link_to: PropTypes.any,
  link_to_external: PropTypes.string,
  cta_title: PropTypes.string,
  onChange: PropTypes.func,
  intl: PropTypes.any,
};
export default Sidebar;
