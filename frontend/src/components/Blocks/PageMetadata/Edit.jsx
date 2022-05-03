import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import moment from 'moment/min/moment-with-locales';
import { SidebarPortal } from '@plone/volto/components';
import Sidebar from './Sidebar';

const messages = defineMessages({
  pubblication_date: {
    id: 'pubblication_date',
    defaultMessage: 'Publication date',
  },
});

const Edit = (props) => {
  const intl = useIntl();
  moment.locale(intl.locale);
  const { properties, data } = props;

  return (
    <div className="block page-metadata">
      <article id="pagemetadata" className={data?.greyBg ? 'grey-bg' : ''}>
        <span>{intl.formatMessage(messages.pubblication_date)}:</span>{' '}
        {properties.effective &&
          moment(properties.effective).format('DD-MM-Y HH:mm')}
      </article>
      <SidebarPortal selected={props.selected}>
        <Sidebar {...props} />
      </SidebarPortal>
    </div>
  );
};

Edit.propTypes = {
  props: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Edit;
