import PropTypes from "prop-types";
import PageHead from "../pagehead/pagehead";
import { useEffect, useState } from "react";
import EventsService from "../../../services/events/events";
import EventUsersTable from "../../tables/eventusers";
import CreateParticipantModal from "../../modals/participantmodal";
import CheckModal from "../../modals/checkmodal";
import AchieventService from "../../../services/achievemnts/achievements";

const EventUsers = ({ id, createEnable, deleteEnable }) => {
  const [achievements, setAchievements] = useState(null);
  const [createIsOpen, setCreateIsOpen] = useState(false);
  const [delIsOpen, setDelIsOpen] = useState(false);
  const [selAchievement, setSelAchievement] = useState(null);

  useEffect(() => {
    const getAchievements = async () => {
      if (id !== undefined)
        setAchievements(await EventsService.getAchievementsByEventId(id));
    };

    getAchievements();
  }, [id]);
  const delOpen = (achievement) => {
    setSelAchievement(achievement);
    setDelIsOpen(true);
  };

  const delHandle = async () => {
    const data = await AchieventService.removeById(
      selAchievement.UserId,
      selAchievement.id
    );
    if (data)
      setAchievements(achievements.filter((el) => el.id !== selAchievement.id));
    setDelIsOpen(false);
  };

  return (
    <div className="controlpage__background">
      <CheckModal
        isOpen={delIsOpen}
        closeHandle={setDelIsOpen}
        submitHandle={delHandle}
      />
      <CreateParticipantModal
        achievements={achievements}
        isOpen={createIsOpen}
        closeHandle={setCreateIsOpen}
        eventId={id}
        setAchievements={setAchievements}
      />
      <PageHead
        createHandle={createEnable ? () => setCreateIsOpen(true) : undefined}
      >
        <h2>Участники</h2>
      </PageHead>
      <div className="page__body">
        <EventUsersTable
          achievemnts={achievements}
          delFunc={deleteEnable ? delOpen : undefined}
        />
      </div>
    </div>
  );
};

EventUsers.propTypes = {
  id: PropTypes.string,
  createEnable: PropTypes.bool,
  deleteEnable: PropTypes.bool,
};

export default EventUsers;
