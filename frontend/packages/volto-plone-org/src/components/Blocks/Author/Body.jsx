import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { flattenHTMLToAppURL } from '@plone/volto/helpers';
import cx from 'classnames';

const messages = defineMessages({
  title_block: {
    id: 'Author',
    defaultMessage: 'Author',
  },
});

const Body = (props) => {
  const { properties } = props;
  const intl = useIntl();

  return properties ? (
    <div className="block-author-body">
      <h3 className="title">{intl.formatMessage(messages.title_block)}</h3>
      <h4>
        {/* Name and surname*/}
        {properties?.author_name && properties.author_name}
        {/* Role */}
        {properties?.author_role && (
          <span
            className={cx('author-role', {
              'border-left': properties.author_name,
            })}
          >
            {properties.author_role}
          </span>
        )}
      </h4>
      {/* Description */}
      {properties.text?.data && (
        <div className="author-text">
          <div
            dangerouslySetInnerHTML={{
              __html: flattenHTMLToAppURL(properties.text.data),
            }}
          />
        </div>
      )}
    </div>
  ) : (
    <></>
  );
};

export default Body;
