import { requests } from 'utils/requests';

const Permission = {
  list: requestObj =>
    requests.get(
      `/permissions?page=${requestObj.page + 1}&orderBy=${
        requestObj.orderBy
      }&sortBy=${requestObj.sortBy}`
    ),
  get: id => requests.get(`/permissions/${id}`),
  del: id => requests.del(`/permissions/${id}`),
  create: ({ ...values }, callback) => {
    return requests.post('/permissions', values).then(() => callback());
  },
  update: ({ ...values }) => {
    return requests.put('/permissions/' + values.id, values);
  },
};

export default Permission;
