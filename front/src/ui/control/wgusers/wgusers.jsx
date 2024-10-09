import { useEffect, useState } from "react";
import PageHead from "../pagehead/pagehead";
import PropTypes from "prop-types";
import WorkGroupService from "../../../services/workgroups/workgroups";
import AddWGUsersModal from "../../modals/addwgusers";
import WorkgroupUsersTable from "../../tables/workgroupusers";
import CheckModal from "../../modals/checkmodal";

const WGUsers = ({ id, enableEdit }) => {
  const [users, setUsers] = useState(null);
  const [createIsOpen, setCreateIsOpen] = useState(false);
  const [dleteIsOpen, setDelIsOpen] = useState(false);
  const [selUser, setSelUser] = useState(null);

  useEffect(() => {
    const getData = async () => {
      if (id !== null) setUsers(await WorkGroupService.getUsersListByWGId(id));
    };
    getData();
  }, [id]);

  const delOpen = (user) => {
    setSelUser(user);
    setDelIsOpen(true);
  };
  const delHandle = async () => {
    const data = await WorkGroupService.updateUsersToWG(id, selUser.id, false);
    if (data) setUsers(users.filter((u) => u.id !== selUser.id));
    setDelIsOpen(false);
  };

  return (
    <div className="controlpage__background">
      <CheckModal
        isOpen={dleteIsOpen}
        closeHandle={setDelIsOpen}
        submitHandle={delHandle}
      />

      <AddWGUsersModal
        isOpen={createIsOpen}
        closeHandle={setCreateIsOpen}
        wgUsers={users}
        setWgUsers={setUsers}
        workgroupId={id}
      />
      <PageHead
        createHandle={enableEdit ? () => setCreateIsOpen(true) : undefined}
      >
        <h2>Ученики</h2>
      </PageHead>
      <div className="page__body">
        {users !== null ? (
          <WorkgroupUsersTable
            wgusers={users}
            delFunc={enableEdit ? delOpen : undefined}
          />
        ) : (
          <>Загрузка...</>
        )}
      </div>
    </div>
  );
};

WGUsers.propTypes = {
  id: PropTypes.string,
  enableEdit: PropTypes.bool,
};

export default WGUsers;
