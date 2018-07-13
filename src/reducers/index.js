import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { reducer as toastrReducer } from 'react-redux-toastr';

import common from './common';

export default function createReducer(injectedReducers) {
  return combineReducers({
    form: formReducer,
    common,
    toastr: toastrReducer,
    ...injectedReducers,
  });
}
