/**
 * Addons reducer.
 * @module reducers/membership/membership
 */

import { GET_MEMBERSHIP_STATS } from '../../constants/ActionTypes';

const initialState = {
  error: null,
  total_countries: 0,
  total_members: 0,
  stats_year: [],
  stats_state: [],
  stats_country: [],
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
      return {
        ...state,
        error: null,
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
        loaded: true,
        loading: false,
      };
    case `${GET_MEMBERSHIP_STATS}_FAIL`:
      return {
        ...state,
        error: action.error,
        stats_state: [],
        stats_country: [],
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
}
