import { GET_CUSTOM_CSS } from '@package/actions/getCustomCSS';

const initialState = {
  error: null,
  hasErrror: false,
  result: '',
  loadingResults: false,
};

export const customCSSReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case `${GET_CUSTOM_CSS}_PENDING`:
      return {
        ...state,
        loadingResults: true,
      };
    case `${GET_CUSTOM_CSS}_SUCCESS`:
      return {
        ...state,
        result: action.result.data,
        loadingResults: false,
      };
    case `${GET_CUSTOM_CSS}_FAIL`:
      return {
        ...state,
        error: action.error,
        hasError: true,
        loadingResults: false,
      };
    default:
      return state;
  }
};
