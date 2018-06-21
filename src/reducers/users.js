import {
    USER_PAGE_LOADED,
    USER_VIEW_PAGE_LOADED,
    USER_CREATE
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case USER_PAGE_LOADED:
            return {
                ...state,
                users: action.payload.data,
                inProgress: false,
                errors: action.error ? action.payload.error : null
            };
        case USER_VIEW_PAGE_LOADED:
            return {
                ...state,
                user: action.payload.data,
                inProgress: false,
                errors: action.error ? action.payload.error : null
            };
        case USER_CREATE:
            return {
                ...state,
                user: action.payload.data,
                inProgress: false,
                errors: action.error ? action.payload.error : null,
                redirectTo: action.error ? null : '/access/user',
            };
        default:
            return state;
    }
};
