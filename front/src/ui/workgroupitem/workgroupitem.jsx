import { useEffect, useState } from "react";
import PageHead from "../control/pagehead/pagehead";
import PropTypes from "prop-types";
import WorkGroupService from "../../services/workgroups/workgroups";
import ListRow from "../control/listrow/listrow";
import { Link } from "react-router-dom";

const WorkGroupItem = ({ workgroup }) => {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    const getData = async () => {
      setUsers(await WorkGroupService.getUsersListByWGId(workgroup.id));
    };
    getData();
  }, [workgroup.id]);

  const usersWrapper = () => {
    return [...users].map((elem) => (
      <ListRow key={elem.id}>
        <Link to={`/portfolio/${elem.id}`} state={{ prev: location.pathname }}>
          {elem.soname} {elem.name}
        </Link>
      </ListRow>
    ));
  };

  return (
    <div className="controlpage__background">
      <PageHead>
        <h2>{workgroup.title}</h2>
      </PageHead>
      <div className="page__body">
        {users !== null ? usersWrapper() : <>Загрузка...</>}
      </div>
    </div>
  );
};

WorkGroupItem.propTypes = {
  workgroup: PropTypes.object,
};

export default WorkGroupItem;
