/**
 * Custom CSS action.
 * @module monet-volto/actions/getCustomCSS
 */
export const GET_CUSTOM_CSS = 'GET_CUSTOM_CSS';

/**
 * Get custom CSS
 * @function getSocialSettings
 * @returns {Object}  Get custom CSS action
 */
export function getCustomCSS() {
  return {
    type: GET_CUSTOM_CSS,
    request: {
      op: 'get',
      path: `/@custom-css`,
    },
  };
}
