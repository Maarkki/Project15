import Button from "../button/button";
import BaseModal from "./basemodal/basemodal";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import EventsService from "../../services/events/events";
import { AuthContext } from "../../lib/providers/authprovider";

function CreateEventModal({ isOpen, closeHandle, addEvent, events }) {
  const [form, setForm] = useState({
    title: "",
    description: null,
    startDate: null,
    endDate: null,
  });

  const { user } = useContext(AuthContext);
  const submitHandle = async (ev) => {
    ev.preventDefault();
    let event = await EventsService.create(
      form.title,
      form.description,
      form.startDate,
      form.endDate
    );
    event.Author = {
      username: user.username,
      name: user.name,
      soname: user.soname,
    };
    addEvent([event, ...events]);
    closeHandle();
  };

  return (
    <BaseModal
      isOpen={isOpen}
      headText="Создание мероприятия"
      closeHandle={closeHandle}
    >
      <form className="form" onSubmit={(e) => submitHandle(e)}>
        <label className="label">
          Название
          <input
            className="input"
            type="title"
            placeholder="Название"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </label>
        <label className="label">
          Описание
          <textarea
            className="input"
            name="description"
            id=""
            cols="30"
            rows="6"
            placeholder="Описание"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </label>
        <label className="label">
          Дата начала
          <input
            className="input"
            type="date"
            name="start_date"
            id="start_date"
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
          />
        </label>
        <label className="label">
          <input
            className="input"
            type="date"
            name="end_date"
            id="end_date"
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
          />
        </label>
        <div className="button__row">
          <Button
            buttonStyle={"primary"}
            buttonText={"Создать"}
            clickHande={submitHandle}
            buttonType="button"
          />
          <Button
            clickHande={() => closeHandle(false)}
            buttonStyle={"secondary"}
            buttonText={"Закрыть"}
            buttonType="button"
          />
        </div>
      </form>
    </BaseModal>
  );
}

CreateEventModal.propTypes = {
  isOpen: PropTypes.bool,
  closeHandle: PropTypes.func,
  addEvent: PropTypes.func,
  events: PropTypes.array,
};

export default CreateEventModal;
