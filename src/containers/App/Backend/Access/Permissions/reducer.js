import {
  PERMISSION_CREATE,
  PERMISSION_DELETE,
  PERMISSION_FORM_PAGE_LOADED,
  PERMISSION_LIST_PAGE_LOADED,
  PERMISSION_UPDATE,
  PERMISSION_VIEW_PAGE_LOADED,
  PERMISSION_LIST_PAGE_REQUESTED,
  PERMISSION_FORM_PAGE_UNLOADED,
  PERMISSION_LIST_PAGE_UNLOADED,
  PERMISSION_VIEW_PAGE_UNLOADED,
} from './constants';

const initialState = { permissions: [], meta: { last_page: 1 } };

export default (state = initialState, action) => {
  switch (action.type) {
    case PERMISSION_LIST_PAGE_REQUESTED:
      return {
        ...state,
        inProgress: true,
      };
    case PERMISSION_LIST_PAGE_LOADED:
      return {
        ...state,
        permissions: action.payload.data,
        meta: action.payload.meta,
        link: action.payload.link,
        inProgress: false,
        errors: action.error ? action.payload.error : null,
      };
    case PERMISSION_VIEW_PAGE_LOADED:
      return {
        ...state,
        user: action.payload.data,
        inProgress: false,
        errors: action.error ? action.payload.error : null,
      };
    case PERMISSION_CREATE:
    case PERMISSION_UPDATE:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.error : null,
        redirectTo: action.error ? null : '/access/user',
      };
    case PERMISSION_FORM_PAGE_LOADED:
      return {
        ...state,
        user: action.payload ? action.payload.data : '',
        errors: action.error ? action.payload.error : null,
      };
    case PERMISSION_DELETE:
      return {
        ...state,
        permissions: state.permissions.filter(
          user => user.id !== action.payload.data
        ),
      };

    case PERMISSION_FORM_PAGE_UNLOADED:
    case PERMISSION_LIST_PAGE_UNLOADED:
    case PERMISSION_VIEW_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
