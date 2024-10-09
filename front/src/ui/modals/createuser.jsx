import PropTypes from "prop-types";
import Button from "../button/button";
import { useState } from "react";
import UsersService from "../../services/users/users";
import BaseModal from "./basemodal/basemodal";

function CreateUserModal({ isOpen, closeHandle, addUser, users }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repassword: "",
  });

  const submitHandle = async (ev) => {
    ev.preventDefault();
    const user = await UsersService.create(
      formData.username,
      formData.email,
      formData.password,
      formData.repassword
    );
    addUser([...users, user.user]);
    closeHandle();
    setFormData({
      username: "",
      email: "",
      password: "",
      repassword: "",
    });
  };

  return (
    <BaseModal
      isOpen={isOpen}
      headText="Создание пользователя"
      closeHandle={() => closeHandle()}
    >
      <form method="post" className="form">
        <label className="label">
          Имя пользователя
          <input
            className="input"
            type="text"
            placeholder="username"
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            value={formData.username}
          />
        </label>
        <label className="label">
          Адрес электронной почты
          <input
            className="input"
            type="email"
            name="email"
            placeholder="email"
            id="email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            value={formData.email}
          />
        </label>
        <label className="label">
          Пароль
          <input
            className="input"
            type="text"
            name="password"
            placeholder="Пароль"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            value={formData.password}
          />
        </label>
        <label className="label">
          Подтверждение пароля
          <input
            className="input"
            type="text"
            name="repassword"
            placeholder="Подтверждение пароля"
            onChange={(e) =>
              setFormData({ ...formData, repassword: e.target.value })
            }
            value={formData.repassword}
          />
        </label>
        <Button
          buttonStyle={"primary"}
          buttonText={"Создать"}
          clickHande={submitHandle}
          buttonType="button"
        />
      </form>
    </BaseModal>
  );
}

CreateUserModal.propTypes = {
  isOpen: PropTypes.bool,
  closeHandle: PropTypes.func,
  addUser: PropTypes.func,
  users: PropTypes.any,
};

export default CreateUserModal;
