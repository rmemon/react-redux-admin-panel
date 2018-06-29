import {
    APP_LOAD,
    LOGIN,
    LOGIN_PAGE_UNLOADED,
    LOGOUT,
    REDIRECT,
    REGISTER,
    REGISTER_PAGE_UNLOADED,
    USER_CREATE,
    USER_UPDATE
} from '../constants/actionTypes';

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
                email: '',
                password: ''
            };
        case REDIRECT:
            return {...state, redirectTo: null};
        case LOGOUT:
            return {...state, redirectTo: '/admin', token: null, currentUser: null};
        case LOGIN:
        case REGISTER:
            return {
                ...state,
                redirectTo: action.error ? null : '/admin',
                token: action.error ? null : action.payload.token,
                currentUser: action.error ? null : action.payload
            };
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
