import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import reducers from './reducers';
import { promiseMiddleware , localStorageMiddleware } from './middleware';


export const store = createStore(
	reducers,	
	composeWithDevTools(applyMiddleware(promiseMiddleware, localStorageMiddleware))	
);