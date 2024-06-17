import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import cx from 'classnames';

const messages = defineMessages({
  title_block: {
    id: 'tag',
    defaultMessage: 'Tag',
  },
});

const Body = (props) => {
  const { properties, data } = props;
  const intl = useIntl();

  return properties && properties?.tags?.length > 0 ? (
    <div
      className={cx('block-page-tag', {
        'grey-bg': data.greyBg,
      })}
    >
      <label>{intl.formatMessage(messages.title_block)}:</label>
      <div className="site--chips">
        {properties?.tags.map((tag, index) => {
          return (
            <span className="site--chip site--chip-outline" key={index}>
              {tag}
            </span>
          );
        })}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Body;
