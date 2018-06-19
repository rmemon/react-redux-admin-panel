import {
    USER_PAGE_LOADED,
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
        default:
            return state;
    }
};
