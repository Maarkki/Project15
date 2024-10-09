import { createContext, useState } from "react";
import PropTypes from "prop-types";
import UsersService from "../../services/users/users";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const permissionLoader = () => {
    const rights = JSON.parse(localStorage.getItem("permissions"));
    if (rights !== null) return rights.data;
    return [];
  };

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [permissions, setPermissions] = useState(permissionLoader());
  const logout = async () => {
    await UsersService.logout();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("permissions");
    setUser(null);
  };

  const login = (user, token, refresh, permissionsList) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("refresh", refresh);
    localStorage.setItem(
      "permissions",
      JSON.stringify({ data: permissionsList })
    );
    setUser(user);
    setPermissions(permissionsList);
  };

  const checkPermissions = (permissionsList, applist) => {
    if (applist.find((el) => el == "all") !== undefined) {
      let response = new Map();
      permissionsList.map((el) => response.set(el, true));
      return Object.fromEntries(response);
    }
    let response = new Map();
    permissionsList.map((pel) =>
      response.set(pel, applist.find((el) => el == pel) !== undefined)
    );
    let rObj = Object.fromEntries(response);
    return rObj;
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, logout, login, permissions, checkPermissions }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};

export { AuthProvider };
