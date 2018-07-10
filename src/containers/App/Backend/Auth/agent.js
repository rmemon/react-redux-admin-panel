import { requests, getToken } from 'utils/requests';
import { parseJwt } from 'utils';

const Auth = {
  login: values => requests.post('/auth/login', values),
  register: values => requests.post('/auth/register', values),
  current: () => parseJwt(getToken()),
};

export default Auth;
