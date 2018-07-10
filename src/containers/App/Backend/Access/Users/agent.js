import { requests } from 'utils/requests';

const User = {
  list: requestObj =>
    requests.get(
      `/users?page=${requestObj.page + 1}&orderBy=${
        requestObj.orderBy
      }&sortBy=${requestObj.sortBy}`
    ),
  get: id => requests.get(`/users/${id}`),
  del: id => requests.del(`/users/${id}`),
  create: ({ ...values }) => {
    values.assignees_roles = [values.assignees_roles];
    return requests.post('/users', values);
  },
  update: ({ ...values }) => {
    values.assignees_roles = [values.assignees_roles];
    return requests.put('/users/' + values.id, values);
  },
};

export default User;
