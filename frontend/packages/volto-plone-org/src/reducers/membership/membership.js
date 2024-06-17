/**
 * Addons reducer.
 * @module reducers/membership/membership
 */

import {
  GET_MEMBERSHIP_STATS,
  OPEN_RENEWAL_CYCLE,
  CLOSE_RENEWAL_CYCLE,
  TRIGGER_REMINDER_RENEWAL_CYCLE,
} from '../../constants/ActionTypes';

const initialState = {
  error: null,
  total_countries: 0,
  total_members: 0,
  stats_year: [],
  stats_state: [],
  stats_country: [],
  downloads: [],
  actions: [],
  msg: '',
  loaded: false,
  loading: false,
};

/**
 * Membership reducer.
 * @function membershipReducer
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export function membershipReducer(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_MEMBERSHIP_STATS}_PENDING`:
    case `${OPEN_RENEWAL_CYCLE}_PENDING`:
    case `${CLOSE_RENEWAL_CYCLE}_PENDING`:
    case `${TRIGGER_REMINDER_RENEWAL_CYCLE}_PENDING`:
      return {
        ...state,
        error: null,
        msg: '',
        loaded: false,
        loading: true,
      };
    case `${GET_MEMBERSHIP_STATS}_SUCCESS`:
      return {
        ...state,
        error: null,
        total_countries: action.result.stats.total_countries,
        total_members: action.result.stats.total_members,
        stats_year: action.result.stats.year,
        stats_state: action.result.stats.state,
        stats_country: action.result.stats.country,
        downloads: action.result.downloads,
        actions: action.result.actions,
        loaded: true,
        loading: false,
      };
    case `${OPEN_RENEWAL_CYCLE}_SUCCESS`:
    case `${CLOSE_RENEWAL_CYCLE}_SUCCESS`:
    case `${TRIGGER_REMINDER_RENEWAL_CYCLE}_SUCCESS`:
      return {
        ...state,
        error: null,
        msg: action.result.msg,
        loaded: true,
        loading: false,
      };
    case `${GET_MEMBERSHIP_STATS}_FAIL`:
    case `${OPEN_RENEWAL_CYCLE}_FAIL`:
    case `${CLOSE_RENEWAL_CYCLE}_FAIL`:
    case `${TRIGGER_REMINDER_RENEWAL_CYCLE}_FAIL`:
      return {
        ...state,
        error: action.error,
        stats_state: [],
        stats_country: [],
        msg: action.error,
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
}
