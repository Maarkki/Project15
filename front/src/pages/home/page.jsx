import { useEffect, useState } from "react";
import PageHead from "../../ui/control/pagehead/pagehead";
import WorkGroupService from "../../services/workgroups/workgroups";
import WorkGroupItem from "../../ui/workgroupitem/workgroupitem";

const HomePage = () => {
  const [workgroups, setWorkGroups] = useState(null);

  useEffect(() => {
    const getWorkGroups = async () => {
      setWorkGroups(await WorkGroupService.getAll());
    };

    getWorkGroups();
  }, []);

  const WGWrapper = () => {
    return workgroups.map((elem) => (
      <WorkGroupItem key={elem.id} workgroup={elem} />
    ));
  };
  return (
    <div className="global__wrapper">
      <div className="page__compose">
        <PageHead>
          <h1>Список классов</h1>
        </PageHead>
        {workgroups !== null ? WGWrapper() : <>Loading...</>}
      </div>
    </div>
  );
};

export default HomePage;
