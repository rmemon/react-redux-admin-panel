import {ASYNC_START, LOGIN, LOGIN_PAGE_UNLOADED, REGISTER, REGISTER_PAGE_UNLOADED} from 'constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case LOGIN:
        case REGISTER:
            return {
                ...state,
                inProgress: false,
                errors: action.error ? action.payload.error : null
            };
        case LOGIN_PAGE_UNLOADED:
        case REGISTER_PAGE_UNLOADED:
            return {};
        case ASYNC_START:
            if (action.subtype === LOGIN || action.subtype === REGISTER) {
                return {...state, inProgress: true};
            }
            break;
        default:
            return state;
    }

    return state;
};
