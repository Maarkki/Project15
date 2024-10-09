import { useContext, useEffect, useState } from "react";
import PageHead from "../../../ui/control/pagehead/pagehead";
import WorkGroupService from "../../../services/workgroups/workgroups";
import CreateWGModal from "../../../ui/modals/createworkgroup";
import { useNavigate } from "react-router-dom";
import CheckModal from "../../../ui/modals/checkmodal";
import WorkgroupsTable from "../../../ui/tables/workgroupstable";
import { AuthContext } from "../../../lib/providers/authprovider";

const WorkGroups = () => {
  const { permissions, checkPermissions } = useContext(AuthContext);
  const rights = checkPermissions(
    ["workgroups_create", "workgroups_remove"],
    permissions
  );
  let navigate = useNavigate();
  const [wgroups, setWGroups] = useState(null);
  const [createIsOpen, createSetOpen] = useState(false);
  const [delIsOpen, setDelOpen] = useState(false);
  const [selWG, setSelWG] = useState(null);
  useEffect(() => {
    const getData = async () => {
      setWGroups(await WorkGroupService.getAll());
    };
    getData();
  }, []);
  function modalOpen(wgroup) {
    setSelWG(wgroup);
    setDelOpen(true);
  }
  async function delWG() {
    await WorkGroupService.removeById(selWG.id);
    setWGroups(wgroups.filter((u) => u.id !== selWG.id));
    setDelOpen(false);
  }
  return (
    <div className="controlpage__background">
      <CreateWGModal
        isOpen={createIsOpen}
        closeHandle={() => createSetOpen(false)}
        workgroups={wgroups}
        addWG={setWGroups}
      />
      <CheckModal
        isOpen={delIsOpen}
        closeHandle={setDelOpen}
        submitHandle={delWG}
      />
      <PageHead
        createHandle={
          rights.workgroups_create ? () => createSetOpen(true) : undefined
        }
      >
        <h1>Список классов</h1>
      </PageHead>
      <div className="page__body">
        <WorkgroupsTable
          workgroups={wgroups}
          editFunc={(control) =>
            navigate(`/control/workgroups/${control.id}`, {
              state: { prev: "/control/workgroups" },
            })
          }
          delFunc={rights.workgroups_remove ? modalOpen : undefined}
        />
      </div>
    </div>
  );
};

export default WorkGroups;
