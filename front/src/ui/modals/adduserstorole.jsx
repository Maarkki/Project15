import PropTypes from "prop-types";
import BaseModal from "./basemodal/basemodal";
import { useState } from "react";

import UserSearch from "../search_blocks/usersearch/usersearch";
import GroupsService from "../../services/groups/groups";

const AddUserToRoleModal = ({
  isOpen,
  closeHandle,
  roleId,
  members,
  setMembers,
}) => {
  const [searchrow, setSearchRow] = useState({ current: "", prev: "" });
  const [users, setSUsers] = useState(null);

  const addUser = async (user) => {
    if (roleId !== undefined && roleId > 0 && user !== null) {
      let data = await GroupsService.addMember(roleId, user.id);
      if (data) {
        setMembers([...members, user]);
        closeHandle(false);
        setSUsers(null);
        setSearchRow({ current: "", prev: "" });
      }
    }
  };

  return (
    <BaseModal
      headText="Добавление пользователя"
      isOpen={isOpen}
      closeHandle={() => closeHandle(false)}
    >
      <UserSearch
        users={users}
        setUsers={setSUsers}
        setSearchRow={setSearchRow}
        setSelectUser={addUser}
        searchRow={searchrow}
      />
    </BaseModal>
  );
};

AddUserToRoleModal.propTypes = {
  isOpen: PropTypes.bool,
  closeHandle: PropTypes.func,
  roleId: PropTypes.number,
  members: PropTypes.array,
  setMembers: PropTypes.func,
};

export default AddUserToRoleModal;
