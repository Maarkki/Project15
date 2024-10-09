import PropTypes from "prop-types";
import BaseModal from "./basemodal/basemodal";
import Button from "../button/button";
import { useState } from "react";
import AchieventService from "../../services/achievemnts/achievements";
import EventsSearch from "../search_blocks/eventssearch/eventssearch";

const CreateAchieveModal = ({
  isOpen,
  closeHandle,
  userId,
  achievements,
  setAchievements,
}) => {
  const [newAchieveForm, setNewAchieveForm] = useState({
    title: "",
    error: false,
  });
  const [searchrow, setSearchRow] = useState({ current: "", prev: "" });
  const [selEvent, setSelEvent] = useState(null);
  const [events, setEvents] = useState(null);

  const submitForm = async (e) => {
    e.preventDefault();
    if (userId !== undefined && userId > 0) {
      let data = await AchieventService.add(
        userId,
        selEvent.id,
        newAchieveForm.title
      );
      if (data) {
        data.Event = selEvent;
        setAchievements([data, ...achievements]);
        setNewAchieveForm({ title: "", error: false });
        closeHandle(false);
        setEvents(null);
        setSearchRow({ current: "", prev: "" });
        setSelEvent(null);
      } else setNewAchieveForm({ ...newAchieveForm, error: true });
    }
  };

  return (
    <BaseModal
      headText={
        selEvent == null ? "Поиск мероприятия" : "Добавление достижения"
      }
      isOpen={isOpen}
      closeHandle={() => closeHandle(false)}
      backHandle={
        selEvent == null
          ? undefined
          : () => {
              setSelEvent(null);
            }
      }
    >
      {selEvent == null ? (
        <EventsSearch
          events={events}
          setEvents={setEvents}
          setSearchRow={setSearchRow}
          setSelectEvent={setSelEvent}
          searchRow={searchrow}
        />
      ) : (
        <form className="form">
          <p>{selEvent.title}</p>
          <label className="label">
            Название достижения
            <input
              className="input"
              placeholder="title"
              value={newAchieveForm.title}
              onChange={(e) =>
                setNewAchieveForm({ ...newAchieveForm, title: e.target.value })
              }
            />
          </label>
          {newAchieveForm.error ? <p>Что-то пошло не так</p> : <></>}
          <Button
            buttonText="Добавить"
            clickHande={(e) => submitForm(e)}
            buttonType="button"
          />
        </form>
      )}
    </BaseModal>
  );
};

CreateAchieveModal.propTypes = {
  isOpen: PropTypes.bool,
  closeHandle: PropTypes.func,
  userId: PropTypes.string,
  achievements: PropTypes.array,
  setAchievements: PropTypes.func,
};

export default CreateAchieveModal;
