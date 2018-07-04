import { requests, getToken } from 'utils/requests';
import { parseJwt } from 'utils';

const Auth = {
    login: (values) =>
        requests.post('/auth/login', values),
    register: (values) =>
        requests.post('/auth/register', values),
    current: () => {
        console.log(getToken())
        console.log(parseJwt)
        console.log(parseJwt(getToken()))
        return parseJwt(getToken());
    }
};

export default Auth;