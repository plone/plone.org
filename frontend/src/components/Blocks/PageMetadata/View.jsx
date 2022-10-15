import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import moment from 'moment/min/moment-with-locales';

const messages = defineMessages({
  pubblication_date: {
    id: 'pubblication_date',
    defaultMessage: 'Publication date',
  },
});

const View = (props) => {
  const intl = useIntl();
  moment.locale(intl.locale);
  const { properties, data } = props;

  return properties.effective ? (
    <div className="block page-metadata">
      <article id="pagemetadata" className={data?.greyBg ? 'grey-bg' : ''}>
        <span>{intl.formatMessage(messages.pubblication_date)}:</span>{' '}
        {moment(properties.effective).format('DD-MM-Y HH:mm')}
      </article>
    </div>
  ) : (
    <></>
  );
};

View.propTypes = {
  props: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
