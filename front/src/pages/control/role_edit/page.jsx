import { useLocation, useParams } from "react-router-dom";
import PageHead from "../../../ui/control/pagehead/pagehead";
import { useContext, useEffect, useState } from "react";
import GroupsService from "../../../services/groups/groups";
import EditRoleForm from "../../../ui/forms/editrole";
import RoleMembers from "../../../ui/control/rolemembers/rolemembers";
import RoleRights from "../../../ui/control/rolerights/rolerights";
import { AuthContext } from "../../../lib/providers/authprovider";
import ForbiddenComponent from "../../../ui/control/errors/forbidden";

const RoleEditPage = () => {
  let { id } = useParams();
  const { permissions, checkPermissions } = useContext(AuthContext);
  const rights = checkPermissions(
    [
      "roles_create",
      "roles_view",
      "roles_edit",
      "roles_remove",
      "rolerights_view",
      "rolerights_edit",
      "userroles_view",
      "userroles_edit",
      "rights_view",
    ],
    permissions
  );
  let plocation = useLocation();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await GroupsService.getById(id);
      setRole(data);
    };

    fetchData();
  }, [id]);
  if (!rights.roles_view) return <ForbiddenComponent />;
  return (
    <div className="page__compose">
      <div className="controlpage__background">
        <PageHead
          backLink={plocation.state !== null ? plocation.state.prev : undefined}
        >
          <h1>Изменение группы: {role !== null ? role.name : ""}</h1>
        </PageHead>
        {role !== null ? (
          <div className="page__body">
            <EditRoleForm
              role={role}
              setRole={setRole}
              disable={role.delete_protection || !rights.roles_edit}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      {role !== null && rights.rolerights_view && rights.rights_view ? (
        <RoleRights id={role.id} enable={rights.rolerights_edit} />
      ) : (
        <></>
      )}
      {role !== null && rights.userroles_view ? (
        <RoleMembers
          id={role.id}
          tName={role.name}
          enable={rights.userroles_edit}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default RoleEditPage;
