import { useContext, useEffect, useState } from "react";
import PageHead from "../../../ui/control/pagehead/pagehead";
import GroupsService from "../../../services/groups/groups";
import RolesTable from "../../../ui/tables/roles";
import { useNavigate } from "react-router-dom";
import CreateRoleModal from "../../../ui/modals/createrole";
import CheckModal from "../../../ui/modals/checkmodal";
import { AuthContext } from "../../../lib/providers/authprovider";
import ForbiddenComponent from "../../../ui/control/errors/forbidden";

const Roles = () => {
  let navigate = useNavigate();
  const { permissions, checkPermissions } = useContext(AuthContext);
  const rights = checkPermissions(
    ["roles_create", "roles_view", "roles_remove"],
    permissions
  );
  const [groups, setGroups] = useState(null);
  const [createModalOpen, setCMOpen] = useState(false);
  const [confModalOpen, setConfModalOpen] = useState(false);
  const [selGroup, setSelGroup] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await GroupsService.getAll();
      setGroups(data);
    };

    fetchData();
  }, []);
  function modalOpen(group) {
    setSelGroup(group);
    setConfModalOpen(true);
  }

  const deleteGroup = async () => {
    const data = await GroupsService.removeById(selGroup.id);
    if (data.delete) setGroups(groups.filter((u) => u.id !== selGroup.id));
    setConfModalOpen(false);
  };
  if (!rights.roles_view) return <ForbiddenComponent />;
  return (
    <div className="controlpage__background">
      <CreateRoleModal
        isOpen={createModalOpen}
        closeHandle={() => setCMOpen(false)}
        roles={groups}
        setRole={setGroups}
      />
      <CheckModal
        isOpen={confModalOpen}
        closeHandle={() => setConfModalOpen(false)}
        submitHandle={deleteGroup}
      />
      <PageHead
        createHandle={rights.roles_create ? () => setCMOpen(true) : undefined}
      >
        <h1>Список групп</h1>
      </PageHead>
      <div className="page__body">
        <RolesTable
          roles={groups}
          editFunc={(controlObj) => {
            navigate(`/control/groups/${controlObj.id}`, {
              state: { prev: location.pathname },
            });
          }}
          delFunc={rights.roles_remove ? modalOpen : undefined}
        />
      </div>
    </div>
  );
};

export default Roles;
