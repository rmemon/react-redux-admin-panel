import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

import reducers from './reducers';
import {localStorageMiddleware, promiseMiddleware} from './middleware';


export const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(promiseMiddleware, localStorageMiddleware))
);