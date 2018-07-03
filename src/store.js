import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';

import createReducer from 'reducers';
import {localStorageMiddleware, promiseMiddleware} from 'middleware';

export default function configureStore(initialState = {}) {
    // Create the store with two middlewares
    // 1. sagaMiddleware: Makes redux-sagas work
    // 2. routerMiddleware: Syncs the location/URL path to the state
    // const middlewares = [sagaMiddleware, routerMiddleware(history)];
  
    // const enhancers = [applyMiddleware(...middlewares)];
  
    // If Redux DevTools Extension is installed use it, otherwise use Redux compose
    /* eslint-disable no-underscore-dangle, indent */
    // const composeEnhancers =
    //   process.env.NODE_ENV !== 'production' &&
    //   typeof window === 'object' &&
    //   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    //     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    //         // TODO: Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
    //         // Prevent recomputing reducers for `replaceReducer`
    //         shouldHotReload: false,
    //       })
    //     : compose;
    /* eslint-enable */
  
    const store = createStore(
      createReducer(),
      composeWithDevTools(applyMiddleware(promiseMiddleware, localStorageMiddleware))
    //   fromJS(initialState),
    //   composeEnhancers(...enhancers),
    );
  
    // Extensions
    // store.runSaga = sagaMiddleware.run;
    store.injectedReducers = {}; // Reducer registry
    // store.injectedSagas = {}; // Saga registry
  
    // Make reducers hot reloadable, see http://mxs.is/googmo
    /* istanbul ignore next */
    if (module.hot) {
      module.hot.accept('./reducers', () => {        
        store.replaceReducer(createReducer(store.injectedReducers));
      });
    }
  
    return store;
  }
  