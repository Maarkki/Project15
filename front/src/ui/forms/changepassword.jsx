//import { useState } from "react";
import { useState } from "react";
import Button from "../button/button";
import PropTypes from "prop-types";
import UsersService from "../../services/users/users";

function ChangePasswordForm({ user, disabled }) {
  const [passwordState, setPassword] = useState({
    password: "",
    repassword: "",
  });

  const confirm = async (e) => {
    e.preventDefault();
    await UsersService.changePass(user.id, passwordState.password);
  };

  return (
    <form className="form">
      <label className="label">
        Новый пароль
        <input
          className="input"
          type="text"
          disabled={disabled}
          value={passwordState.password}
          onChange={(e) =>
            setPassword({ ...passwordState, password: e.target.value })
          }
        />
      </label>
      <label className="label">
        Подтверждение нового пароля
        <input
          className="input"
          type="text"
          disabled={disabled}
          value={passwordState.repassword}
          onChange={(e) =>
            setPassword({ ...passwordState, repassword: e.target.value })
          }
        />
      </label>
      <Button
        disabled={disabled}
        buttonStyle="primary"
        buttonText="Изменить пароль"
        clickHande={(e) => confirm(e)}
      />
    </form>
  );
}

ChangePasswordForm.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
  disabled: PropTypes.bool,
};

export default ChangePasswordForm;
