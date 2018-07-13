import { requests } from 'utils/requests';

const Role = {
  list: requestObj =>
    requests.get(
      `/roles?page=${requestObj.page + 1}&orderBy=${
        requestObj.orderBy
      }&sortBy=${requestObj.sortBy}`
    ),
  get: id => requests.get(`/roles/${id}`),
  del: id => requests.del(`/roles/${id}`),
  create: ({ ...values }) => {
    if (values.permissions !== '') {
      values.permissions = values.permissions.split(',');
      values.permissions.forEach((value, index) => {
        values[`permissions[${value}]`] = value;
      });
    }
    values.permissions = 1;
    values.associated_permissions = 'custom';
    return requests.post('/roles', values);
  },
  update: ({ ...values }) => {
    values.assignees_roles = [values.assignees_roles];
    return requests.put('/roles/' + values.id, values);
  },
};

export default Role;
