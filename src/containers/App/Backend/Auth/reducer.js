import {ASYNC_START} from 'constants/actionTypes';

import {BACKEND_LOGIN, BACKEND_LOGIN_PAGE_UNLOADED, BACKEND_REGISTER, BACKEND_REGISTER_PAGE_UNLOADED} from './constants';

export default (state = {}, action) => {
    switch (action.type) {
        case BACKEND_LOGIN:
        case BACKEND_REGISTER:
            return {
                ...state,
                inProgress: false,
                errors: action.error ? action.payload.error : null
            };
        case BACKEND_LOGIN_PAGE_UNLOADED:
        case BACKEND_REGISTER_PAGE_UNLOADED:
            return {};
        case ASYNC_START:
            if (action.subtype === BACKEND_LOGIN || action.subtype === BACKEND_REGISTER) {
                return {...state, inProgress: true};
            }
            break;
        default:
            return state;
    }

    return state;
};
