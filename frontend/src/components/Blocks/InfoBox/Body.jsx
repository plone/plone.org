import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { When, Recurrence } from '@package/components';
import { List } from 'semantic-ui-react';

const messages = defineMessages({
  date: {
    id: 'date',
    defaultMessage: 'Event date',
  },
  recurrence: {
    id: 'recurrence',
    defaultMessage: 'Recurrences',
  },
  where: {
    id: 'where',
    defaultMessage: 'Location',
  },
  contact: {
    id: 'contact',
    defaultMessage: 'Contacts',
  },
  phone: {
    id: 'phone',
    defaultMessage: 'Tel.',
  },
  website: {
    id: 'website',
    defaultMessage: 'Web site',
  },
  attendees: {
    id: 'attendees',
    defaultMessage: 'Attendees',
  },
});

const Body = (props) => {
  const { properties } = props;
  const intl = useIntl();

  return properties ? (
    <>
      {/* When */}
      <h4>{intl.formatMessage(messages.date)}</h4>
      <When
        start={properties.start}
        end={properties.end}
        whole_day={properties.whole_day}
        open_end={properties.open_end}
      />

      {/* Recurrence */}
      {properties.recurrence && (
        <>
          <h4>{intl.formatMessage(messages.recurrence)}</h4>
          <Recurrence
            recurrence={properties.recurrence}
            start={properties.start}
          />
        </>
      )}

      {/* Whee */}
      {properties.location && (
        <>
          <h4>{intl.formatMessage(messages.where)}</h4>
          <p>{properties.location}</p>
        </>
      )}

      {/* Contatcss */}
      {(properties.contact_name ||
        properties.event_url ||
        properties.contact_phone) && (
        <div className="info-box-contacts">
          <h4>{intl.formatMessage(messages.contact)}</h4>

          {properties.contact_name && (
            <>
              <p>
                {properties.contact_email ? (
                  <a href={`mailto:${properties.contact_email}`}>
                    {properties.contact_name}
                  </a>
                ) : (
                  properties.contact_name
                )}
              </p>
            </>
          )}
          {properties.contact_phone && (
            <p>
              {intl.formatMessage(messages.phone)}:{' '}
              <a href={'tel:' + properties.contact_phone}>
                {properties.contact_phone}
              </a>
              {}
            </p>
          )}
          {properties.event_url && (
            <p>
              <a
                href={properties.event_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {intl.formatMessage(messages.website)}
              </a>
            </p>
          )}
        </div>
      )}

      {/* Attendees */}
      {properties.attendees.length > 0 && (
        <>
          <h4>{intl.formatMessage(messages.attendees)}</h4>
          <List items={properties.attendees} />
        </>
      )}
    </>
  ) : (
    <></>
  );
};

export default Body;
