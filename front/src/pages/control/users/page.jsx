import { useContext, useEffect, useState } from "react";
import UsersService from "../../../services/users/users";
import ReactModal from "react-modal";
import CheckModal from "../../../ui/modals/checkmodal";
import CreateUserModal from "../../../ui/modals/createuser";
import PageHead from "../../../ui/control/pagehead/pagehead";
import { useNavigate } from "react-router-dom";
import UsersTable from "../../../ui/tables/userstable";
import { AuthContext } from "../../../lib/providers/authprovider";
import ForbiddenComponent from "../../../ui/control/errors/forbidden";

ReactModal.setAppElement("#root");

// const statusTransform = (statusNum) => {
//   switch (statusNum) {
//     case 1:
//       return "Активен";
//     case 2:
//       return "Заблокирован";
//     case 3:
//       return "Удален";
//     default:
//       return "Ошибка";
//   }
// };

const Users = () => {
  const { permissions, checkPermissions } = useContext(AuthContext);
  const rights = checkPermissions(
    ["users_view", "users_create", "users_edit", "users_remove"],
    permissions
  );

  const navigate = useNavigate();
  const [users, setUsers] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [createIsOpen, createSetOpen] = useState(false);
  const [userModal, setUserModal] = useState(null);

  //Delete Modal
  function modalOpen(user) {
    setUserModal(user);
    setOpen(true);
  }
  const confirmHandle = async () => {
    await UsersService.removeById(userModal.id);
    setUsers(users.filter((u) => u.id !== userModal.id));
    setOpen(false);
  };
  const createModalOpen = () => {
    createSetOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await UsersService.getAll();
      setUsers(data);
    };
    if (rights.users_view) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!rights.users_view) return <ForbiddenComponent />;
  return (
    <div className="controlpage__background">
      <CheckModal
        isOpen={isOpen}
        closeHandle={setOpen}
        submitHandle={confirmHandle}
      />
      <CreateUserModal
        isOpen={createIsOpen}
        closeHandle={createSetOpen}
        addUser={setUsers}
        users={users}
      />
      <PageHead
        createHandle={rights.users_create ? createModalOpen : undefined}
      >
        <h1>Список пользователей</h1>
      </PageHead>
      <div className="page__body">
        <UsersTable
          users={users}
          delFunc={rights.users_remove ? modalOpen : undefined}
          editFunc={
            rights.users_view
              ? (control) =>
                  navigate(`/control/users/${control.id}`, {
                    state: { prev: "/control/users" },
                  })
              : undefined
          }
        />
      </div>
    </div>
  );
};

export default Users;
