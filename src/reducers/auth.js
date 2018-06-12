import {
  LOGIN,
  REGISTER,
  LOGIN_PAGE_UNLOADED,
  REGISTER_PAGE_UNLOADED,
  ASYNC_START,
  UPDATE_FIELD_AUTH,
  LOGIN_PAGE_LOADED,
  REGISTER_PAGE_LOADED
} from '../constants/actionTypes';

export default (state = {}, action) => {  
  switch (action.type) {
    case LOGIN:
    case REGISTER:          
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.error : null
      };
    case LOGIN_PAGE_UNLOADED:
    case REGISTER_PAGE_UNLOADED:
      return {};
    case ASYNC_START:
      if (action.subtype === LOGIN || action.subtype === REGISTER) {
        return { ...state, inProgress: true };
      }
      break;
    case UPDATE_FIELD_AUTH:
      return { ...state, [action.key]: action.value };
    default:
      return state;
    case LOGIN_PAGE_LOADED:
    case REGISTER_PAGE_LOADED:
      return { ...state, [action.key]: '' };
  }

  return state;
};
