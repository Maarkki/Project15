import PropTypes from "prop-types";
import PageHead from "../pagehead/pagehead";
import { useEffect, useState } from "react";
import RightsService from "../../../services/rights/rights";
import RightsTable from "../../tables/rightstable";
import GroupsService from "../../../services/groups/groups";
import Button from "../../button/button";

const RoleRights = ({ id, enable }) => {
  const [rights, setRights] = useState(null);
  const [curRights, setCurRights] = useState(null);
  const [curRightsT, setCurRightsT] = useState(null);
  useEffect(() => {
    const getData = async () => {
      if (id !== null) setRights(await RightsService.getAll());
    };
    getData();
  }, [id]);
  useEffect(() => {
    const getCurRights = async () => {
      if (id !== null) {
        const rightsD = await GroupsService.getRightsById(id);
        setCurRights(rightsD);
        setCurRightsT(rightsD);
      }
    };
    getCurRights();
  }, [id]);

  const setRight = (el) => {
    if (curRightsT.find((rel) => rel.id == el.id) === undefined)
      setCurRightsT([...curRightsT, el]);
    else setCurRightsT(curRightsT.filter((rel) => rel.id !== el.id));
  };

  const reset = () => {
    setCurRightsT(curRights);
  };

  const saveRights = async () => {
    const data = await GroupsService.updateRights(
      id,
      curRightsT.map((el) => el.id)
    );
    if (data.update) {
      setCurRights(curRightsT);
    }
  };

  return (
    <div className="controlpage__background">
      <PageHead>
        <h2>Разрешения {id}</h2>
      </PageHead>
      <div className="page__body">
        {rights !== null ? (
          <RightsTable
            rights={rights}
            activeRights={curRightsT}
            setRight={setRight}
            disable={!enable}
          />
        ) : (
          <></>
        )}
        {enable && (
          <div className="button__row">
            <Button
              buttonStyle="primary"
              buttonText="Изменить"
              buttonType="button"
              clickHande={() => saveRights()}
            />
            <Button
              buttonStyle="secondary"
              buttonType="button"
              buttonText="Сброс"
              clickHande={() => reset()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

RoleRights.propTypes = {
  id: PropTypes.number,
  enable: PropTypes.bool,
};

export default RoleRights;
