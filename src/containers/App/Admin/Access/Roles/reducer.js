import {
    ROLE_CREATE,
    ROLE_DELETE,
    ROLE_EDITOR_PAGE_LOADED,
    ROLE_EDITOR_PAGE_UNLOADED,
    ROLE_PAGE_LOADED,
    ROLE_UPDATE,
    ROLE_VIEW_PAGE_LOADED
} from './constants';

export default (state = {}, action) => {
    switch (action.type) {
        case ROLE_PAGE_LOADED:
            return {
                ...state,
                roles: action.payload.data,
                inProgress: false,
                errors: action.error ? action.payload.error : null
            };
        case ROLE_VIEW_PAGE_LOADED:
            return {
                ...state,
                role: action.payload.data,
                inProgress: false,
                errors: action.error ? action.payload.error : null
            };
        case ROLE_CREATE:
        case ROLE_UPDATE:
            return {
                ...state,
                inProgress: false,
                errors: action.error ? action.payload.error : null,
                redirectTo: action.error ? null : '/access/user',
            };
        case ROLE_EDITOR_PAGE_LOADED:
            return {
                ...state,
                role: action.payload ? action.payload.data : '',
                errors: action.error ? action.payload.error : null,
            };
        case ROLE_EDITOR_PAGE_UNLOADED:
            return {
                ...state,
                user: {}
            };
        case ROLE_DELETE:
            return {
                ...state
            };
        default:
            return state;
    }
};
