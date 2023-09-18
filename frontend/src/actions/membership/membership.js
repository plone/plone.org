/**
 * Membership actions.
 * @module actions/membership/membership
 */

import {
  GET_MEMBERSHIP_STATS,
  OPEN_RENEWAL_CYCLE,
  CLOSE_RENEWAL_CYCLE,
  TRIGGER_REMINDER_RENEWAL_CYCLE,
} from '../../constants/ActionTypes';

/**
 * Get Membership Stats
 * @function getMembershipStats
 * @returns {Object} Get Membership Stats action
 */
export function getMembershipStats() {
  let path = '/@membership';
  return {
    type: GET_MEMBERSHIP_STATS,
    request: {
      op: 'get',
      path: path,
    },
  };
}

/**
 * Open Renewal Cycle
 * @function openRenewalCycle
 * @returns {Object} Result
 */
export function openRenewalCycle() {
  let path = '/@membership/open-renewal-cycle';
  return {
    type: OPEN_RENEWAL_CYCLE,
    request: {
      op: 'post',
      path: path,
    },
  };
}

/**
 * Close Renewal Cycle
 * @function closeRenewalCycle
 * @returns {Object} Result
 */
export function closeRenewalCycle() {
  let path = '/@membership/close-renewal-cycle';
  return {
    type: CLOSE_RENEWAL_CYCLE,
    request: {
      op: 'post',
      path: path,
    },
  };
}

/**
 * Trigger Renewal Cycle Reminders
 * @function triggerReminderRenewalCycle
 * @returns {Object} Result
 */
export function triggerReminderRenewalCycle() {
  let path = '/@membership/reminder-renewal-cycle';
  return {
    type: TRIGGER_REMINDER_RENEWAL_CYCLE,
    request: {
      op: 'post',
      path: path,
    },
  };
}
