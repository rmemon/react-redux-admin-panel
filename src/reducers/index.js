import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth from './auth';
import common from './common';

const rootReducer = combineReducers({
	auth,
	common,
	form: formReducer,	
});

export default rootReducer;
