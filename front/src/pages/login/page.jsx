import { useContext, useState } from "react";
import { AuthContext } from "../../lib/providers/authprovider";
import { Navigate } from "react-router-dom";
import styles from "./login.module.css";
import Button from "../../ui/button/button";
import UsersService from "../../services/users/users";

const LoginPage = () => {
  const { user, login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    error: null,
  });
  if (user !== null) return <Navigate to="/" />;

  const submitHandle = async (event) => {
    event.preventDefault();
    const response = await UsersService.login(
      formData.email,
      formData.password
    );
    if (response)
      login(
        response.user,
        response.access_token,
        response.refresh,
        response.permissions
      );
    else {
      setFormData({ ...formData, error: "Ошибка во время входа" });
    }
  };

  return (
    <div className={styles.form__wrapper}>
      <form className={styles.form}>
        <label className="label">
          email
          <input
            type="email"
            value={formData.email}
            required
            placeholder="Email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </label>
        <label className="label">
          Пароль
          <input
            type="password"
            value={formData.password}
            required
            placeholder="Пароль"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </label>
        {formData.error === null ? <></> : <p>{formData.error}</p>}
        <Button
          clickHande={(e) => submitHandle(e)}
          buttonText="Войти"
          buttonStyle="primary"
        />
      </form>
    </div>
  );
};

export default LoginPage;
