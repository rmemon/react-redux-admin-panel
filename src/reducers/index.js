import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import auth from './auth';
import common from './common';
import users from './users';
import roles from './roles';

const rootReducer = combineReducers({
    auth,
    common,
    users,
    roles,
    form: formReducer
});

export default rootReducer;
