import {
    APP_LOAD,
    REDIRECT,
} from 'constants/actionTypes';

import {
    LOGIN,
    LOGIN_PAGE_UNLOADED,
    LOGOUT,
    REGISTER,
    REGISTER_PAGE_UNLOADED
} from 'containers/App/Backend/Auth/constants';

import {
    USER_CREATE,
    USER_UPDATE
} from 'containers/App/Backend/Access/Users/constants'

const defaultState = {
    appName: process.env.REACT_APP_NAME,
    token: null,
    viewChangeCounter: 0
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case USER_CREATE:
        case USER_UPDATE:
            return {
                ...state,
                redirectTo: action.error ? null : '/access/user',
            };

        case LOGIN_PAGE_UNLOADED:
        case REGISTER_PAGE_UNLOADED:
            return {...state, viewChangeCounter: state.viewChangeCounter + 1};
        default:
            return state;
    }
};
