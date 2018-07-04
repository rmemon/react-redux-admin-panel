import { requests } from 'utils/requests';

const Role = {
    list: () =>
        requests.get('/roles'),
};

export default Role;
