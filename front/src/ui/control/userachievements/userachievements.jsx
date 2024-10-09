import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import PageHead from "../pagehead/pagehead";
import AchieventService from "../../../services/achievemnts/achievements";
import CreateAchieveModal from "../../modals/createachieve";
import UserAchievementsTable from "../../tables/userachiements";
import CheckModal from "../../modals/checkmodal";

const UserAchievements = ({ id, enableCreate }) => {
  const [achievements, setAchievements] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [delIsOpen, setDelOpen] = useState(false);
  const [selAchieve, setSelAchieve] = useState(null);
  useEffect(() => {
    const getAchievements = async () => {
      const data = await AchieventService.getAllByUserId(id);
      setAchievements(data);
    };
    if (id !== null && typeof id !== "undefined") getAchievements();
  }, [id]);

  const openDelFunc = (achievement) => {
    setSelAchieve(achievement);
    setDelOpen(true);
  };

  const delFunc = async () => {
    const del = await AchieventService.removeById(id, selAchieve.id);
    if (del.remove)
      setAchievements(achievements.filter((u) => u.id !== selAchieve.id));
    setDelOpen(false);
  };

  return (
    <>
      <CheckModal
        isOpen={delIsOpen}
        closeHandle={setDelOpen}
        submitHandle={delFunc}
      />
      <CreateAchieveModal
        isOpen={modalIsOpen}
        closeHandle={setModalIsOpen}
        achievements={achievements}
        setAchievements={setAchievements}
        userId={id}
      />
      <div className="controlpage__background">
        <PageHead
          createHandle={enableCreate ? () => setModalIsOpen(true) : undefined}
        >
          <h2>Достижения</h2>
        </PageHead>
        <div className="page__body">
          <UserAchievementsTable
            achievements={achievements}
            delFunc={openDelFunc}
          />
        </div>
      </div>
    </>
  );
};

UserAchievements.propTypes = {
  id: PropTypes.string,
  enableCreate: PropTypes.bool,
};

export default UserAchievements;
