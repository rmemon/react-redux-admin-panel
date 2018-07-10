import { requests } from 'utils/requests';

const User = {
  list: requestObj =>
    requests.get(
      `/permissions?page=${requestObj.page + 1}&orderBy=${
        requestObj.orderBy
      }&sortBy=${requestObj.sortBy}`
    ),
  get: id => requests.get(`/permissions/${id}`),
  del: id => requests.del(`/permissions/${id}`),
  create: ({ ...values }) => {
    values.assignees_roles = [values.assignees_roles];
    return requests.post('/permissions', values);
  },
  update: ({ ...values }) => {
    values.assignees_roles = [values.assignees_roles];
    return requests.put('/permissions/' + values.id, values);
  },
};

export default User;
