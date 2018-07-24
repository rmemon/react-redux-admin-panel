import { ASYNC_END, ASYNC_START, PROGRESSEVENT } from 'constants/actionTypes';
import {
  BACKEND_LOGIN,
  BACKEND_LOGOUT,
  BACKEND_REGISTER,
} from './containers/App/Backend/Auth/constants';
import { setToken } from 'utils/requests';
import { serverDownError } from 'utils';

const promiseMiddleware = store => next => action => {
  if (action && action.payload && action.payload.on) {
    action.payload.on('progress', e => {
      store.dispatch({ type: PROGRESSEVENT, payload: { progress: e } });
      console.log(e.percent);
    });
  }

  if (isPromise(action.payload)) {
    store.dispatch({ type: ASYNC_START, subtype: action.type });

    const currentView = store.getState().viewChangeCounter;
    const skipTracking = action.skipTracking;

    action.payload.then(
      res => {
        const currentState = store.getState();
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return;
        }
        action.payload = res;
        store.dispatch({ type: ASYNC_END, promise: action.payload });
        store.dispatch(action);
      },
      error => {
        const currentState = store.getState();
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return;
        }
        action.error = true;
        if (error.status === undefined) {
          action.payload = serverDownError;
        } else {
          action.payload = error.response.body;
        }
        if (action.payload.error && action.payload.error.status_code === 401) {
          store.dispatch({ type: BACKEND_LOGOUT });
        }
        if (!action.skipTracking) {
          store.dispatch({ type: ASYNC_END, promise: action.payload.error });
        }
        store.dispatch(action);
      },
    );

    return;
  }

  next(action);
};

function isPromise(v) {
  return v && typeof v.then === 'function';
}

const localStorageMiddleware = store => next => action => {
  if (action.type === BACKEND_REGISTER || action.type === BACKEND_LOGIN) {
    if (!action.error) {
      window.localStorage.setItem(
        'backend-jwt-token',
        action.payload.token || action.payload.data.token,
      );
      setToken(action.payload.token || action.payload.data.token);
    }
  } else if (action.type === BACKEND_LOGOUT) {
    window.localStorage.setItem('backend-jwt-token', '');
    setToken(null);
  }

  next(action);
};

export { promiseMiddleware, localStorageMiddleware };
