import {
  ROLE_LIST_PAGE_LOADED,
  ROLE_LIST_PAGE_UNLOADED,
  ROLE_LIST_PAGE_REQUESTED,
  ROLE_VIEW_PAGE_UNLOADED,
  ROLE_VIEW_PAGE_LOADED,
  ROLE_FORM_PAGE_UNLOADED,
  ROLE_FORM_PAGE_LOADED,
  ROLE_CREATE,
  ROLE_UPDATE,
  ROLE_DELETE,
} from './constants';

import { PERMISSION_LIST_PAGE_LOADED } from '../Permissions/constants';

const initialState = { roles: [], meta: { last_page: 1 }, permissions: [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case ROLE_LIST_PAGE_REQUESTED:
      return {
        ...state,
        inProgress: true,
      };
    case PERMISSION_LIST_PAGE_LOADED:
      return {
        ...state,
        permissions: action.payload.data,
        errors: action.error ? action.payload.error : null,
      };
    case ROLE_LIST_PAGE_LOADED:
      return {
        ...state,
        roles: action.payload.data,
        meta: action.payload.meta,
        link: action.payload.link,
        inProgress: false,
        errors: action.error ? action.payload.error : null,
      };
    case ROLE_VIEW_PAGE_LOADED:
      return {
        ...state,
        role: action.payload.data,
        inProgress: false,
        errors: action.error ? action.payload.error : null,
      };
    case ROLE_CREATE:
    case ROLE_UPDATE:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.error : null,
        redirectTo: action.error ? null : '/access/role',
      };
    case ROLE_FORM_PAGE_LOADED:
      return {
        ...state,
        role: action.payload ? action.payload.data : '',
        errors: action.error ? action.payload.error : null,
      };
    case ROLE_DELETE:
      return {
        ...state,
        roles: state.roles.filter(role => role.id !== action.payload.data),
      };

    case ROLE_FORM_PAGE_UNLOADED:
    case ROLE_LIST_PAGE_UNLOADED:
    case ROLE_VIEW_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
