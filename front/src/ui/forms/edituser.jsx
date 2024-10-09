import { useEffect, useState } from "react";
import Button from "../button/button";
import PropTypes from "prop-types";
import UsersService from "../../services/users/users";

function EditUserForm({ user, setUser, disabled }) {
  const [formuser, setFormUser] = useState({
    username: "",
    email: "",
    name: "",
    soname: "",
    about: "",
  });

  useEffect(() => {
    const dataSet = () => {
      setFormUser({
        username:
          user.username === undefined || user.username === null
            ? ""
            : user.username,
        email:
          user.email === undefined || user.email === null ? "" : user.email,
        name: user.name === null || user.name === undefined ? "" : user.name,
        soname:
          user.soname === null || user.soname === undefined ? "" : user.soname,
        about:
          user.about === null || user.about === undefined ? "" : user.about,
      });
    };
    dataSet();
  }, [user]);

  const resetForm = (ev) => {
    ev.preventDefault();
    setFormUser({
      username: user.username,
      email: user.email,
      name: user.name === null ? "" : user.name,
      soname: user.soname === null ? "" : user.soname,
      about: user.about === null ? "" : user.about,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    await UsersService.update(
      user.id,
      formuser.username.replaceAll(" ", ""),
      formuser.email.replaceAll(" ", ""),
      formuser.name,
      formuser.soname,
      formuser.about
    );
    setUser({
      username: formuser.username,
      email: formuser.email,
      name: formuser.name,
      soname: formuser.soname,
      about: formuser.about,
    });
  };
  return (
    <form className="form">
      <label className="label">
        Имя пользователя
        <input
          className="input"
          type="text"
          value={formuser.username}
          disabled={disabled}
          onChange={(e) =>
            setFormUser({ ...formuser, username: e.target.value })
          }
        />
      </label>
      <label className="label">
        Адрес электронной почты
        <input
          className="input"
          type="email"
          value={formuser.email}
          disabled={disabled}
          onChange={(e) => setFormUser({ ...formuser, email: e.target.value })}
        />
      </label>
      <label className="label">
        Фамилия
        <input
          className="input"
          type="text"
          value={formuser.soname}
          disabled={disabled}
          onChange={(e) => setFormUser({ ...formuser, soname: e.target.value })}
        />
      </label>
      <label className="label">
        Имя
        <input
          className="input"
          type="text"
          value={formuser.name}
          disabled={disabled}
          onChange={(e) => setFormUser({ ...formuser, name: e.target.value })}
        />
      </label>
      <label className="label">
        Описание
        <textarea
          className="input"
          value={formuser.about}
          disabled={disabled}
          onChange={(e) => setFormUser({ ...formuser, about: e.target.value })}
        />
      </label>
      <div className="button__row">
        <Button
          buttonStyle="primary"
          buttonText="Изменить"
          disabled={disabled}
          clickHande={(e) => submit(e)}
        />
        <Button
          buttonStyle="secondary"
          disabled={disabled}
          buttonText="Сброс"
          clickHande={(ev) => resetForm(ev)}
        />
      </div>
    </form>
  );
}

EditUserForm.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
  disabled: PropTypes.bool,
};

export default EditUserForm;
