import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import common from './common';

export default function createReducer(injectedReducers) {  
    return combineReducers({
        form: formReducer,           
        common,        
        ...injectedReducers,
    });
}  