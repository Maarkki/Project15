import PropTypes from "prop-types";
import Button from "../button/button";
import { useEffect, useState } from "react";
import GroupsService from "../../services/groups/groups";

const EditRoleForm = ({ role, setRole, disable }) => {
  const [formdata, setFormData] = useState({ name: "", error: null });
  const dataSet = () => {
    setFormData({
      ...formdata,
      name: role.name === undefined || role.name === null ? "" : role.name,
    });
  };
  useEffect(() => {
    dataSet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  const resetForm = (ev) => {
    ev.preventDefault();
    dataSet();
  };

  const submit = async (ev) => {
    ev.preventDefault;
    if (
      role !== undefined &&
      formdata.name !== "" &&
      formdata.name !== role.name
    ) {
      const data = await GroupsService.update(role.id, formdata.name);
      if (data.update) {
        setRole({ ...role, name: formdata.name });
        setFormData({ ...formdata, error: "Данные успешно обновлены" });
      } else {
        setFormData({ ...formdata, error: "Не удалось обновить данные" });
      }
    }
  };
  return (
    <form className="form">
      <label className="label">
        Название роли
        <input
          className="input"
          type="text"
          value={formdata.name}
          onChange={(e) => setFormData({ ...formdata, name: e.target.value })}
          disabled={disable}
        />
      </label>
      {formdata.error && <p>{formdata.error}</p>}
      {!disable && (
        <div className="button__row">
          <Button
            buttonStyle="primary"
            buttonText="Изменить"
            buttonType="button"
            disabled={disable}
            clickHande={(e) => submit(e)}
          />
          <Button
            buttonStyle="secondary"
            disabled={disable}
            buttonType="button"
            buttonText="Сброс"
            clickHande={(ev) => resetForm(ev)}
          />
        </div>
      )}
    </form>
  );
};

EditRoleForm.propTypes = {
  role: PropTypes.object,
  setRole: PropTypes.func,
  disable: PropTypes.bool,
};

export default EditRoleForm;
