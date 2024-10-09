import { Instance } from "../../lib/axios/axios.config";

const GroupsService = {
  async getAll() {
    const response = await Instance.get("/roles");
    return response.data;
  },
  async getById(id) {
    const response = await Instance.get(`/roles/r-${id}`);
    return response.data;
  },
  async removeById(id) {
    try {
      const response = await Instance.delete(`/roles/r-${id}`);
      return response.data;
    } catch ({ name, message }) {
      console.log(message);
      return { delete: false };
    }
  },
  async create(name) {
    const response = await Instance.post("/roles", {
      name: name,
    });
    console.log(response.data);
    return response.data;
  },
  async update(id, name) {
    if (id === undefined || name === "") return;
    try {
      const response = await Instance.put(`/roles/r-${id}`, { name: name });
      return response.data;
    } catch (err) {
      console.log(err);
      return;
    }
  },
  async getMembersById(id) {
    if (id === undefined || id < 1) return;
    try {
      const response = await Instance.get(`/roles/r-${id}/users`);
      return response.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  async addMember(roleId, userId) {
    if (
      roleId === undefined ||
      roleId < 1 ||
      userId === undefined ||
      userId < 1
    )
      return null;
    try {
      const response = await Instance.post(`/roles/r-${roleId}/users`, {
        userId: userId,
      });
      return response.data;
    } catch (err) {
      return null;
    }
  },
  async removeMember(roleId, userId) {
    if (
      roleId === undefined ||
      roleId < 1 ||
      userId === undefined ||
      userId < 2
    )
      return null;
    try {
      console.log(userId);
      const response = await Instance.put(`/roles/r-${roleId}/users/delete`, {
        userId: userId,
      });
      return response;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  async getRightsById(id) {
    if (id === undefined || id < 1) return null;
    try {
      const response = await Instance.get(`/roles/r-${id}/rights`);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  },
  async updateRights(roleId, rightsArray) {
    if (roleId === undefined || roleId < 2 || rightsArray === undefined)
      return { update: false };
    try {
      const response = await Instance.put(`/roles/r-${roleId}/rights`, {
        rights: rightsArray,
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return { update: false };
    }
  },
};

export default GroupsService;
