import {
    APP_LOAD,
    REDIRECT,
} from 'constants/actionTypes';

import {
    BACKEND_LOGIN,
    BACKEND_LOGIN_PAGE_UNLOADED,
    BACKEND_LOGOUT,
    BACKEND_REGISTER,
    BACKEND_REGISTER_PAGE_UNLOADED
} from 'containers/App/Backend/Auth/constants';

const defaultState = {
    appName: process.env.REACT_APP_NAME,
    token: null,
    viewChangeCounter: 0
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case APP_LOAD:
            return {
                ...state,
                token: action.token || null,
                appLoaded: true,
                currentUser: action.payload ? action.payload : null,
            };
        case REDIRECT:
            return { ...state, redirectTo: null };
        case BACKEND_LOGOUT:
            return { ...state, redirectTo: '/', token: null, currentUser: null };
        case BACKEND_LOGIN:
        case BACKEND_REGISTER:
            return {
                ...state,
                redirectTo: action.error ? null : '/',
                token: action.error ? null : action.payload.token,
                currentUser: action.error ? null : action.payload
            };
        case BACKEND_LOGIN_PAGE_UNLOADED:
        case BACKEND_REGISTER_PAGE_UNLOADED:
            return { ...state, viewChangeCounter: state.viewChangeCounter + 1 };
        default:
            return state;
    }
};
