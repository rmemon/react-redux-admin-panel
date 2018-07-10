import agent from './agent';
import {
  BACKEND_LOGIN,
  BACKEND_LOGIN_PAGE_UNLOADED,
  BACKEND_REGISTER,
  BACKEND_REGISTER_PAGE_UNLOADED,
} from './constants';

export const onLoginSubmit = values => {
  return {
    type: BACKEND_LOGIN,
    payload: agent.login(values),
  };
};

export const onRegisterSubmit = values => {
  const payload = agent.register(values);

  return {
    type: BACKEND_REGISTER,
    payload,
  };
};

export const onLoginUnload = () => {
  return {
    type: BACKEND_LOGIN_PAGE_UNLOADED,
  };
};

export const onRegisterUnload = () => {
  return {
    type: BACKEND_REGISTER_PAGE_UNLOADED,
  };
};
