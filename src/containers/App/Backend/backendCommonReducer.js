import {
  BACKEND_LOGIN_PAGE_UNLOADED,
  BACKEND_REGISTER_PAGE_UNLOADED,
} from 'containers/App/Backend/Auth/constants';

import { BACKEND_REDIRECT, BACKEND_APP_LOAD } from './constant';

import {
  USER_CREATE,
  USER_UPDATE,
} from 'containers/App/Backend/Access/Users/constants';

import {
  PERMISSION_CREATE,
  PERMISSION_UPDATE,
} from 'containers/App/Backend/Access/Permissions/constants';

import {
  ROLE_CREATE,
  ROLE_UPDATE,
} from 'containers/App/Backend/Access/Roles/constants';

export default (state = {}, action) => {
  switch (action.type) {
    case BACKEND_APP_LOAD:
      return {
        ...state,
      };
    case USER_CREATE:
    case USER_UPDATE:
      return {
        ...state,
        redirectTo: action.error ? null : '/access/user',
      };
    case ROLE_CREATE:
    case ROLE_UPDATE:
      return {
        ...state,
        redirectTo: action.error ? null : '/access/role',
      };
    case PERMISSION_CREATE:
    case PERMISSION_UPDATE:
      return {
        ...state,
        redirectTo: action.error ? null : '/access/permission',
      };
    case BACKEND_LOGIN_PAGE_UNLOADED:
    case BACKEND_REGISTER_PAGE_UNLOADED:
      return { ...state, viewChangeCounter: state.viewChangeCounter + 1 };
    case BACKEND_REDIRECT:
      return { ...state, redirectTo: null };
    default:
      return state;
  }
};
