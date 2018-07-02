import {
    USER_CREATE,
    USER_DELETE,
    USER_EDITOR_PAGE_LOADED,
    USER_EDITOR_PAGE_UNLOADED,
    USER_PAGE_LOADED,
    USER_UPDATE,
    USER_VIEW_PAGE_LOADED
} from './constants';

export default (state = {users: { data:[], pages:1,meta: {last_page : 1}}}, action) => {
    switch (action.type) {
        case USER_PAGE_LOADED:
        return {
                ...state,
                users: action.payload,
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
        case USER_UPDATE:
            return {
                ...state,
                inProgress: false,
                errors: action.error ? action.payload.error : null,
                redirectTo: action.error ? null : '/access/user',
            };
        case USER_EDITOR_PAGE_LOADED:
            return {
                ...state,
                user: action.payload ? action.payload.data : '',
                errors: action.error ? action.payload.error : null,
            };
        case USER_EDITOR_PAGE_UNLOADED:
            return {
                ...state,
                user: {}
            };
        case USER_DELETE:
            return {
                ...state
            };
        default:
            return state;
    }
};
