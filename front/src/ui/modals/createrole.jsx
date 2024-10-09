import { useState } from "react";
import BaseModal from "./basemodal/basemodal";
import PropTypes from "prop-types";
import Button from "../button/button";
import GroupsService from "../../services/groups/groups";

const CreateRoleModal = ({ isOpen, closeHandle, roles, setRole }) => {
  const [formData, setFormdata] = useState({ name: "", error: null });
  const submit = async (ev) => {
    ev.preventDefault();
    if (formData.name.length < 2) {
      setFormdata({ ...formData, error: "Название меньше двух символов" });
    }
    const data = await GroupsService.create(formData.name);
    if (data) {
      setRole([...roles, data.role]);
      closeHandle();
      setFormdata({ name: "", error: null });
    }
  };
  return (
    <BaseModal
      headText="Добавление группы"
      isOpen={isOpen}
      closeHandle={closeHandle}
    >
      <form method="post" className="form">
        <label className="label">
          Название группы
          <input
            className="input"
            value={formData.name}
            onChange={(e) => setFormdata({ ...formData, name: e.target.value })}
            required
          />
        </label>
        {formData.error !== null ? formData.error : <></>}
        <Button
          clickHande={(e) => submit(e)}
          buttonText="Добавить"
          buttonStyle="primary"
          buttonType="submit"
        />
      </form>
    </BaseModal>
  );
};

CreateRoleModal.propTypes = {
  roles: PropTypes.array,
  isOpen: PropTypes.bool,
  closeHandle: PropTypes.func,
  setRole: PropTypes.func,
};

export default CreateRoleModal;
