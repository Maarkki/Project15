import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./layout.module.css";
import { useContext } from "react";
import { AuthContext } from "../../lib/providers/authprovider";
import ForbiddenComponent from "../../ui/control/errors/forbidden";
import cn from "classnames";

const links = [
  { id: 1, to: "/control/", alias: "Главная", right: "" },
  {
    id: 2,
    to: `/control/events`,
    alias: "Мероприятия",
    right: "events_view",
  },
  { id: 3, to: `/control/groups`, alias: "Группы", right: "roles_view" },
  {
    id: 4,
    to: `/control/users`,
    alias: "Пользователи",
    right: "users_view",
  },
  {
    id: 5,
    to: `/control/workgroups`,
    alias: "Классы",
    right: "",
  },
];

const ControlLayout = () => {
  const { user, permissions, checkPermissions } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const rights = checkPermissions(
    ["roles_view", "events_view", "users_view", "dashboard_view"],
    permissions
  );

  const checkLocation = (id) => {
    let nloc = location.pathname.split("/");
    let resstr = `/${nloc[1]}/`;
    if (nloc.length > 2) resstr += nloc[2];
    let find = links.find((fi) => fi.to == resstr);
    return find !== undefined ? find.id == id : false;
  };
  const checkRight = (el) => {
    return rights[el.right] || el.right === "";
  };

  console.log(rights["events_view"]);
  const linkMapper = () => {
    return links
      .filter((el) => checkRight(el) == true)
      .map((el) => (
        <div
          className={cn(styles.nav__item, {
            [styles.nav__active]: checkLocation(el.id),
          })}
          key={el.id}
          onClick={() => navTo(el.to)}
        >
          {el.alias}
        </div>
      ));
  };

  console.log(rights);
  if (user === null || user == []) return <Navigate to="/login" />;
  if (!rights.dashboard_view) {
    return (
      <main className={styles.main__wrapper}>
        <ForbiddenComponent />
      </main>
    );
  }

  const navTo = (to) => {
    navigate(to);
  };
  //if (permissions.length == 0) return <Navigate to="/" />;
  return (
    <main className={styles.main__wrapper}>
      <aside>
        <div className={styles.nav}>{linkMapper()}</div>
      </aside>
      <Outlet />
    </main>
  );
};

export default ControlLayout;
