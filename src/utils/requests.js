import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

let API_ROOT = process.env.REACT_APP_DEV_API_URL;

const responseBody = res => res.body;

let token = null;

const tokenPlugin = req => {
    if (token) {
        req.set('Authorization', `Bearer ${token}`);
    }
}

export const requests = {
    del: url =>
        superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    get: url =>
        superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    put: (url, body) =>
        superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
    post: (url, body) =>
        superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
};

export const setToken = _token => token = _token;

export const getToken = () => token;