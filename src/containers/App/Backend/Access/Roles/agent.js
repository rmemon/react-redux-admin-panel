import { requests } from "utils/requests";

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
    values.assignees_roles = [values.assignees_roles];
    return requests.post("/roles", values);
  },
  update: ({ ...values }) => {
    values.assignees_roles = [values.assignees_roles];
    return requests.put("/roles/" + values.id, values);
  }
};

export default Role;
