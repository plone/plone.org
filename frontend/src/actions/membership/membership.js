/**
 * Membership actions.
 * @module actions/membership/membership
 */

import { GET_MEMBERSHIP_STATS } from '../../constants/ActionTypes';

/**
 * Get Membership Stats
 * @function listUsers
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
