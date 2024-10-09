import { useEffect, useState } from "react";
import PageHead from "../../control/pagehead/pagehead";
import UsersService from "../../../services/users/users";
import PropTypes from "prop-types";

const PortfolioInfo = ({ id }) => {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const getAchievements = async () => {
      const data = await UsersService.getPortfolio(id);
      setUserInfo(data);
    };
    if (id !== null && typeof id !== "undefined") getAchievements();
  }, [id]);

  return (
    <div className="controlpage__background">
      <PageHead>
        <h2>информация</h2>
      </PageHead>
      {userInfo !== null ? (
        <div className="page__body">
          <p>
            Фамилия:{" "}
            {userInfo.soname != null ? userInfo.soname : "Не определено"}
          </p>
          <p>Имя: {userInfo.name != null ? userInfo.name : "Не определено"}</p>
          <p>
            Описание:{" "}
            {userInfo.about != null ? userInfo.about : "Не определено"}
          </p>
        </div>
      ) : (
        <>Loading</>
      )}
    </div>
  );
};

PortfolioInfo.propTypes = {
  id: PropTypes.string,
};

export default PortfolioInfo;
