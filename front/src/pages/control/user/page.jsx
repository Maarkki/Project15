import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UsersService from "../../../services/users/users";
import PageHead from "../../../ui/control/pagehead/pagehead";
import styles from "./user.module.css";
import EditUserForm from "../../../ui/forms/edituser";
import ChangePasswordForm from "../../../ui/forms/changepassword";
import UserAchievements from "../../../ui/control/userachievements/userachievements";
import RolesTable from "../../../ui/tables/roles";
import { AuthContext } from "../../../lib/providers/authprovider";
import ForbiddenComponent from "../../../ui/control/errors/forbidden";

const User = () => {
  const { user, permissions, checkPermissions } = useContext(AuthContext);
  const rights = checkPermissions(
    ["users_view", "users_edit", "userroles_view"],
    permissions
  );

  let { id } = useParams();
  const [cuser, setUser] = useState({});
  const [roles, setRoles] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await UsersService.getById(id);
      setUser(data);
    };

    fetchData();
  }, [id]);
  useEffect(() => {
    const fetchRoles = async () => {
      const data = await UsersService.getRoles(id);
      let roles = data.map((el) => el.Role);
      setRoles(roles);
      console.log(roles);
    };
    fetchRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  if (!rights.users_view) return <ForbiddenComponent />;
  return (
    <div className={styles.page__compose}>
      <PageHead backLink={"/control/users"}>
        <h1>Изменение пользователя</h1>
      </PageHead>
      <div className={styles.forms__wrapper}>
        <div className="controlpage__background">
          <PageHead>
            <h2>Основная информация</h2>
          </PageHead>
          <div className="page__body">
            {cuser !== null ? (
              <EditUserForm
                disabled={rights.users_edit || id == user.id ? false : true}
                user={cuser}
                setUser={setUser}
              />
            ) : (
              <>Loading</>
            )}
          </div>
        </div>
        <div className="controlpage__background">
          <PageHead>
            <h2>Изменение пароля</h2>
          </PageHead>
          <div className="page__body">
            {cuser !== null ? (
              <ChangePasswordForm
                disabled={rights.users_edit || id == user.id ? false : true}
                user={cuser}
              />
            ) : (
              <>Loading</>
            )}
          </div>
        </div>
      </div>
      {rights.userroles_view ? (
        <div className="controlpage__background">
          <PageHead>
            <h2>Группы</h2>
          </PageHead>
          <div className="page__body">
            <RolesTable roles={roles} />
          </div>
        </div>
      ) : (
        <></>
      )}
      <UserAchievements
        id={id}
        enableCreate={rights.users_edit || id == user.id}
      />
    </div>
  );
};

export default User;
