import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import cx from 'classnames';
import { defineMessages, useIntl } from 'react-intl';
import { RRule, rrulestr } from 'rrule';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

const messages = defineMessages({
  eventFrom: {
    id: 'eventFrom',
    defaultMessage: 'From',
  },
  eventFromV: {
    id: 'eventFromV',
    defaultMessage: 'From',
  },
  eventFromG: {
    id: 'eventFromG',
    defaultMessage: 'from',
  },
  eventToG: {
    id: 'eventToG',
    defaultMessage: 'to',
  },
  eventTo: {
    id: 'eventTo',
    defaultMessage: 'to',
  },
  eventToV: {
    id: 'eventToV',
    defaultMessage: 'to',
  },
  eventFromTime: {
    id: 'eventFromTime',
    defaultMessage: 'from',
  },
  eventToTime: {
    id: 'eventToTime',
    defaultMessage: 'to',
  },
  time: {
    id: 'time',
    defaultMessage: 'time',
  },
});

export const datesForDisplay = (start, end, moment) => {
  const mStart = moment(start);
  const mEnd = moment(end);
  if (!mStart.isValid() || !mEnd.isValid()) {
    return null;
  }
  const sameDay = mStart.isSame(mEnd, 'day');
  const sameTime = mStart.isSame(mEnd, 'minute');
  return {
    sameDay,
    sameTime,
    startDate: mStart.format('ll'),
    startTime: mStart.format('LT'),
    endDate: mEnd.format('ll'),
    endTime: mEnd.format('LT'),
  };
};

const When_ = ({ start, end, whole_day, open_end, moment: momentlib }) => {
  const intl = useIntl();

  const moment = momentlib.default;
  moment.locale(intl.locale);

  const datesInfo = datesForDisplay(start, end, moment);
  if (!datesInfo) {
    return;
  }

  const checkStartDay = moment(start).format('D');
  const checkEndDay = moment(end).format('D');

  return (
    <p
      className={cx('event-when', {
        'same-day': datesInfo.sameDay,
        'same-time': datesInfo.sameTime,
        'whole-day': whole_day,
        'open-end': open_end,
      })}
    >
      {!datesInfo.sameDay ? (
        <>
          {!open_end &&
            (checkStartDay === '1' ||
            checkStartDay === '8' ||
            checkStartDay === '11'
              ? intl.formatMessage(messages.eventFromV) + ' '
              : intl.formatMessage(messages.eventFrom) + ' ')}
          <span className="start">
            <span className="start-date">{datesInfo.startDate}</span>
            {!whole_day && (
              <>
                <span>&nbsp;{intl.formatMessage(messages.time)}&nbsp;</span>
                <span className="start-time">{datesInfo.startTime}</span>
              </>
            )}
          </span>
          {!open_end && (
            <>
              &nbsp;
              {checkEndDay === '1' ||
              checkEndDay === '8' ||
              checkEndDay === '11'
                ? intl.formatMessage(messages.eventToV)
                : intl.formatMessage(messages.eventTo)}{' '}
              <span className="end">
                <span className="end-date">{datesInfo.endDate}</span>
                {!whole_day && (
                  <>
                    <span>&nbsp;{intl.formatMessage(messages.time)}&nbsp;</span>
                    <span className="end-time">{datesInfo.endTime}</span>
                  </>
                )}
              </span>
            </>
          )}
        </>
      ) : (
        <>
          {whole_day && (
            <span className="start-date">{datesInfo.startDate}</span>
          )}
          {open_end && !whole_day && (
            <>
              <span className="start-date">{datesInfo.startDate}</span>
              &nbsp;{intl.formatMessage(messages.eventFromG)}&nbsp;
              <span className="start-time">{datesInfo.startTime}</span>
            </>
          )}
          {!(whole_day || open_end) && (
            <>
              <span className="start-date">{datesInfo.startDate}&nbsp;</span>
              {intl.formatMessage(messages.eventFromG)}{' '}
              <span className="start-time">{datesInfo.startTime}&nbsp;</span>
              {intl.formatMessage(messages.eventToG)}{' '}
              <span className="end-time">{datesInfo.endTime}</span>
            </>
          )}
        </>
      )}
    </p>
  );
};

export const When = injectLazyLibs(['moment'])(When_);

When.propTypes = {
  start: PropTypes.string.isRequired,
  end: PropTypes.string,
  whole_day: PropTypes.bool,
  open_end: PropTypes.bool,
};

export const Recurrence_ = ({ recurrence, start, moment: momentlib }) => {
  const moment = momentlib.default;
  if (recurrence.indexOf('DTSTART') < 0) {
    var dtstart = RRule.optionsToString({
      dtstart: new Date(start),
    });
    recurrence = dtstart + '\n' + recurrence;
  }
  const rrule = rrulestr(recurrence, { unfold: true, forceset: true });

  return (
    <List
      items={rrule
        .all()
        .map((date) => datesForDisplay(date, undefined, moment))
        .map((date) => date.startDate)}
    />
  );
};
export const Recurrence = injectLazyLibs(['moment'])(Recurrence_);

Recurrence.propTypes = {
  recurrence: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
};
