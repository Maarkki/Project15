import { useEffect, useState } from "react";
import PageHead from "../pagehead/pagehead";
import PropTypes from "prop-types";
import GroupsService from "../../../services/groups/groups";
import RoleMembersTable from "../../tables/rolemembers";
import AddUserToRoleModal from "../../modals/adduserstorole";
import CheckModal from "../../modals/checkmodal";

const RoleMembers = ({ id, tName, enable }) => {
  const [members, setMembers] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [delModalOpen, setDelModalOpen] = useState(false);
  const [selMember, setSelMember] = useState(null);

  useEffect(() => {
    const getData = async () => {
      if (id !== null && id !== undefined) {
        const data = await GroupsService.getMembersById(id);
        setMembers([...data].map((el) => el.User));
      }
    };
    getData();
  }, [id]);

  const openDel = (member) => {
    setSelMember(member);
    setDelModalOpen(true);
  };

  const delFunc = async () => {
    await GroupsService.removeMember(id, selMember.id);
    setMembers(members.filter((u) => u.id !== selMember.id));
    setDelModalOpen(false);
  };

  return (
    <div className="controlpage__background">
      <CheckModal
        isOpen={delModalOpen}
        closeHandle={setDelModalOpen}
        submitHandle={delFunc}
      />
      <AddUserToRoleModal
        members={members}
        isOpen={addModalOpen}
        closeHandle={setAddModalOpen}
        setMembers={setMembers}
        roleId={id}
      />
      <PageHead
        createHandle={
          members !== null && enable ? () => setAddModalOpen(true) : undefined
        }
      >
        <h2>Члены группы</h2>
      </PageHead>
      <div className="page__body">
        {members !== null ? (
          <RoleMembersTable
            members={members}
            delFunc={enable ? openDel : undefined}
            tableName={tName}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

RoleMembers.propTypes = {
  id: PropTypes.number,
  tName: PropTypes.string,
  enable: PropTypes.bool,
};

export default RoleMembers;
