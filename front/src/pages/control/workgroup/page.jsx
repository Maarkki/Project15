import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./workgroup.module.css";
import PageHead from "../../../ui/control/pagehead/pagehead";
import WorkGroupService from "../../../services/workgroups/workgroups";
import EditWGForm from "../../../ui/forms/editworkgroup";
import WGUsers from "../../../ui/control/wgusers/wgusers";
import { AuthContext } from "../../../lib/providers/authprovider";

const WorkGroup = () => {
  let { id } = useParams();
  const { permissions, checkPermissions } = useContext(AuthContext);
  const rights = checkPermissions(
    ["workgroups_edit", "workgroups_remove"],
    permissions
  );
  const [workgroup, setWorkGroup] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await WorkGroupService.getById(id);
      setWorkGroup(data);
    };

    fetchData();
  }, [id]);

  return (
    <div className={styles.page__compose}>
      <PageHead backLink="/control/workgroups">
        <h1>Изменение класса</h1>
      </PageHead>
      <div className="controlpage__background">
        <PageHead>
          <h2>Основная информация</h2>
        </PageHead>
        <div className="page__body">
          {workgroup !== null ? (
            <EditWGForm
              wgData={workgroup}
              setWorkGroup={setWorkGroup}
              enable={rights.workgroups_edit}
            />
          ) : (
            <>Загрузка...</>
          )}
        </div>
      </div>
      <WGUsers
        id={workgroup !== null ? id : null}
        enableEdit={rights.workgroups_edit}
      />
    </div>
  );
};

export default WorkGroup;
