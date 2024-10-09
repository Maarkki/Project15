import PropTypes from "prop-types";
import BaseModal from "./basemodal/basemodal";
import { useState } from "react";
import UserSearch from "../search_blocks/usersearch/usersearch";
import WorkGroupService from "../../services/workgroups/workgroups";

const AddWGUsersModal = ({
  isOpen,
  closeHandle,
  workgroupId,
  wgUsers,
  setWgUsers,
}) => {
  const [searchrow, setSearchRow] = useState({ current: "", prev: "" });
  const [users, setSUsers] = useState(null);

  const addUser = async (user) => {
    if (workgroupId !== undefined && workgroupId > 0 && user !== null) {
      let data = await WorkGroupService.updateUsersToWG(
        workgroupId,
        user.id,
        true
      );
      if (data) {
        setWgUsers([...wgUsers, user]);
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

AddWGUsersModal.propTypes = {
  isOpen: PropTypes.bool,
  closeHandle: PropTypes.func,
  workgroupId: PropTypes.string,
  wgUsers: PropTypes.array,
  setWgUsers: PropTypes.func,
};

export default AddWGUsersModal;
