import {
  USER_CREATE,
  USER_DELETE,
  USER_FORM_PAGE_LOADED,
  USER_LIST_PAGE_LOADED,
  USER_UPDATE,
  USER_VIEW_PAGE_LOADED,
  USER_LIST_PAGE_REQUESTED,
  USER_FORM_PAGE_UNLOADED,
  USER_LIST_PAGE_UNLOADED,
  USER_VIEW_PAGE_UNLOADED,
} from './constants';

const initialState = { users: [], meta: { last_page: 1 } };

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LIST_PAGE_REQUESTED:
      return {
        ...state,
        inProgress: true,
      };
    case USER_LIST_PAGE_LOADED:
      return {
        ...state,
        users: action.payload.data,
        meta: action.payload.meta,
        link: action.payload.link,
        inProgress: false,
        errors: action.error ? action.payload.error : null,
      };
    case USER_VIEW_PAGE_LOADED:
      return {
        ...state,
        user: action.payload.data,
        inProgress: false,
        errors: action.error ? action.payload.error : null,
      };
    case USER_CREATE:
    case USER_UPDATE:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.error : null,
      };
    case USER_FORM_PAGE_LOADED:
      return {
        ...state,
        user: action.payload ? action.payload.data : '',
        errors: action.error ? action.payload.error : null,
      };
    case USER_DELETE:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload.data),
      };

    case USER_FORM_PAGE_UNLOADED:
    case USER_LIST_PAGE_UNLOADED:
    case USER_VIEW_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
