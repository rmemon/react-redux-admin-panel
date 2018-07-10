import { requests } from "utils/requests";

const Role = {
  list: requestObj =>
    requests.get(
      `/roles?page=${requestObj.page + 1}&orderBy=${
        requestObj.orderBy
      }&sortBy=${requestObj.sortBy}`
    )
};

export default Role;
