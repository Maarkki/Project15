import { Instance } from "../../lib/axios/axios.config";

const WorkGroupService = {
  async getAll() {
    const response = await Instance.get("/workgroups");
    return response.data;
  },
  async getById(id) {
    try {
      const response = await Instance.get(`/workgroups/wg-${id}`);
      return response.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  async create(title) {
    const event = await Instance.post("/workgroups", {
      title: title,
    });
    return event.data;
  },
  async update(id, title) {
    let body = {};
    if (typeof title !== "undefined") body.title = title;
    if (body == {}) return false;
    const response = await Instance.put(`/workgroups/wg-${id}`, body);
    return response.data;
  },
  async removeById(id) {
    const response = await Instance.delete(`/workgroups/wg-${id}`);
    return response;
  },
  async getUsersListByWGId(id) {
    if (id === undefined || id < 1) return null;
    try {
      const { data } = await Instance.get(`/workgroups/wg-${id}/users`);
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  async updateUsersToWG(id, userIds, create = true) {
    if (id === undefined || id < 1) return null;
    if ((Array.isArray(userIds) && userIds.length === 0) || userIds === null)
      return null;
    try {
      const { data } = await Instance.post(`/workgroups/wg-${id}/users`, {
        userIds: userIds,
        create: create,
      });
      return data;
    } catch ({ name, message }) {
      console.log(message);
    }
  },
};

export default WorkGroupService;
