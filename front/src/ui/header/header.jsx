import { Link, useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import { useContext } from "react";
import { AuthContext } from "../../lib/providers/authprovider";
import Button from "../button/button";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout, permissions, checkPermissions } =
    useContext(AuthContext);

  const rights = checkPermissions(["dashboard_view"], permissions);
  return (
    <header className={styles.header}>
      <div className={`global__wrapper ` + styles.header__wrapper}>
        <Link to="/">
          <img src="/vite.svg" alt="App logo"></img>
        </Link>

        <ul className={styles.nav}>
          {user !== null ? (
            <>
              {rights.dashboard_view ? (
                <li className={styles.nav__item}>
                  <Link to="/control">Панель управления</Link>
                </li>
              ) : (
                <></>
              )}
              <li className={styles.nav__item}>
                <Link to={`portfolio/` + user.id}>Мое портфолио</Link>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
        <Button
          clickHande={() => (user === null ? navigate("/login") : logout())}
          buttonText={user === null ? "Вход" : "Выход"}
          buttonType="button"
          buttonStyle="secondary"
        />
      </div>
    </header>
  );
};

export default Header;
