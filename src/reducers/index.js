import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth from './auth';
import common from './common';
import users from './users';

const rootReducer = combineReducers({
	auth,
	common,
	form: formReducer,	
	users
});

export default rootReducer;
