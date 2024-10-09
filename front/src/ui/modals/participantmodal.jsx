import PropTypes from "prop-types";
import BaseModal from "./basemodal/basemodal";
import Button from "../button/button";
import { useState } from "react";
import AchieventService from "../../services/achievemnts/achievements";
import UserSearch from "../search_blocks/usersearch/usersearch";
import usernameTranslator from "../../lib/translators/username.translator";

const CreateParticipantModal = ({
  isOpen,
  closeHandle,
  eventId,
  achievements,
  setAchievements,
}) => {
  const [newAchieveForm, setNewAchieveForm] = useState({
    title: "",
    error: false,
  });
  const [searchrow, setSearchRow] = useState({ current: "", prev: "" });
  const [selUser, setSelUser] = useState(null);
  const [users, setUsers] = useState(null);

  const submitForm = async (e) => {
    e.preventDefault();

    if (eventId !== undefined && eventId > 0) {
      let data = await AchieventService.add(
        selUser.id,
        eventId,
        newAchieveForm.title
      );
      if (data) {
        data.User = selUser;
        setAchievements([data, ...achievements]);
        setNewAchieveForm({ title: "", error: false });
        closeHandle(false);
        setUsers(null);
        setSearchRow({ current: "", prev: "" });
        setSelUser(null);
      } else setNewAchieveForm({ ...newAchieveForm, error: true });
    }
  };

  return (
    <BaseModal
      headText={
        selUser == null ? "Поиск пользователя" : "Добавление достижения"
      }
      isOpen={isOpen}
      closeHandle={() => closeHandle(false)}
      backHandle={
        selUser == null
          ? undefined
          : () => {
              setSelUser(null);
            }
      }
    >
      {selUser == null ? (
        <UserSearch
          users={users}
          setUsers={setUsers}
          setSearchRow={setSearchRow}
          setSelectUser={setSelUser}
          searchRow={searchrow}
        />
      ) : (
        <form className="form">
          <p>
            {usernameTranslator(selUser.name, selUser.soname, selUser.username)}
          </p>
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

CreateParticipantModal.propTypes = {
  isOpen: PropTypes.bool,
  closeHandle: PropTypes.func,
  eventId: PropTypes.string,
  achievements: PropTypes.array,
  setAchievements: PropTypes.func,
};

export default CreateParticipantModal;
