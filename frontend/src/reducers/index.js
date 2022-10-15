/**
 * Root reducer.
 * @module reducers/root
 */

import defaultReducers from '@plone/volto/reducers';
import { customCSSReducer } from './customCSSReducer';
/**
 * Root reducer.
 * @function
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
const reducers = {
  ...defaultReducers,
  // Add your reducers here
  customCSS: customCSSReducer,
};

export default reducers;
