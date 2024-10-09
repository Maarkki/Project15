import { Instance } from "../../lib/axios/axios.config";

const UsersService = {
  async getAll() {
    const response = await Instance.get("/users");
    return response.data;
  },
  async getById(id) {
    const response = await Instance.get(`/users/u-${id}`);
    return response.data;
  },
  async removeById(id) {
    const response = await Instance.delete(`/users/u-${id}`);
    return response;
  },
  async create(username, email, password, repassword) {
    const response = await Instance.post("/users/add", {
      username: username,
      email: email,
      password: password,
      repassword: repassword,
    });
    console.log(response.data);
    return response.data;
  },
  async getRoles(id) {
    const response = await Instance.get(`/users/u-${id}/roles`);
    return response.data;
  },
  async getRights(id) {
    const response = await Instance.get(`/users/u-${id}/rights`);
    return response.data;
  },
  async changePass(id, password) {
    const response = await Instance.post(`/users/u-${id}/changepass`, {
      password: password,
    });
    return response.data.update;
  },
  async update(id, username, email, name, soname, about) {
    let body = {};
    if (typeof username !== "undefined") body.username = username;
    if (typeof email !== "undefined") body.email = email;
    if (typeof name !== "undefined") body.name = name;
    if (typeof soname !== "undefined") body.soname = soname;
    if (typeof about !== "undefined") body.about = about;
    if (body == {}) return false;

    const response = await Instance.put(`/users/u-${id}`, body);
    return response.data;
  },
  async login(email, password) {
    try {
      const response = await Instance.post(`/users/signin`, {
        email: email,
        password: password,
      });
      //console.log(email, password);
      console.log(response);
      return response.data;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  async logout() {
    return Instance.post("/users/logout")
      .then(function (data) {
        console.log(data);
        return;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  async getPortfolio(id) {
    try {
      const response = await Instance.get(`/users/u-${id}/portfolio`);
      return response.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
  async search(searchString) {
    if (searchString === "" || searchString === undefined) return null;
    try {
      const response = await Instance.get("/users/search", {
        params: { q: searchString },
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};

export default UsersService;
