import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

let API_ROOT = process.env.REACT_APP_DEV_API_URL;

let token = null;

// const responseBody = res => res.body;

const tokenPlugin = req => {
  if (token) {
    req.set('Authorization', `Bearer ${token}`);
  }
};

export const requests = {
  del: url => superagent.del(`${API_ROOT}${url}`).use(tokenPlugin),
  get: url => superagent.get(`${API_ROOT}${url}`).use(tokenPlugin),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin),
};

export const setToken = _token => (token = _token);

export const getToken = () => token;
