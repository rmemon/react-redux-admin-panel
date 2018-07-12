import { requests } from 'utils/requests';

const initialRequestObj = {
  page: 0,
  orderBy: '',
  sortBy: '',
};
const Permission = {
  list: (requestObj = initialRequestObj) =>
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
  update: ({ ...values }, callback) => {
    return requests
      .put('/permissions/' + values.id, values)
      .then(() => callback());
  },
};

export default Permission;
