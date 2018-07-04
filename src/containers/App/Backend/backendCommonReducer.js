import {
    BACKEND_LOGIN_PAGE_UNLOADED,
    BACKEND_REGISTER_PAGE_UNLOADED,
} from 'containers/App/Backend/Auth/constants';

import {
    BACKEND_REDIRECT
} from './constant';

import {
    USER_CREATE,
    USER_UPDATE
} from 'containers/App/Backend/Access/Users/constants'

export default (state = {}, action) => {
    switch (action.type) {
        case USER_CREATE:
        case USER_UPDATE:
            return {
                ...state,
                redirectTo: action.error ? null : '/access/user',
            };

        case BACKEND_LOGIN_PAGE_UNLOADED:
        case BACKEND_REGISTER_PAGE_UNLOADED:
            return {...state, viewChangeCounter: state.viewChangeCounter + 1};
        case BACKEND_REDIRECT:
            return { ...state, redirectTo: null };
        default:
            return state;
    }
};
