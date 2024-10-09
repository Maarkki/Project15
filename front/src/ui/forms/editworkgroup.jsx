import PropTypes from "prop-types";
import Button from "../button/button";
import { useEffect, useState } from "react";
import WorkGroupService from "../../services/workgroups/workgroups";

const EditWGForm = ({ wgData, setWorkGroup, enable }) => {
  const [formevent, setFormEvent] = useState({
    title: "",
  });

  useEffect(() => {
    const dataSet = () => {
      setFormEvent({
        title:
          wgData.title === undefined || wgData.title === null
            ? ""
            : wgData.title,
      });
    };
    dataSet();
  }, [wgData]);

  const submit = async (e) => {
    e.preventDefault();
    const res = await WorkGroupService.update(wgData.id, formevent.title);
    if (res.update)
      setWorkGroup({
        ...wgData,
        title: formevent.title,
      });
  };
  const resetForm = (e) => {
    e.preventDefault();
    setFormEvent({
      username: wgData.title,
    });
  };

  return (
    <form className="form">
      <label className="label">
        Название
        <input
          className="input"
          disabled={!enable}
          type="text"
          placeholder="Название мероприятия"
          value={formevent.title}
          onChange={(e) =>
            setFormEvent({ ...formevent, title: e.target.value })
          }
        />
      </label>
      {enable && (
        <div className="button__row">
          <Button
            buttonStyle="primary"
            buttonText="Изменить"
            clickHande={(e) => submit(e)}
          />
          <Button
            buttonStyle="secondary"
            buttonText="Сброс"
            clickHande={(ev) => resetForm(ev)}
          />
        </div>
      )}
    </form>
  );
};

EditWGForm.propTypes = {
  wgData: PropTypes.object,
  setWorkGroup: PropTypes.func,
  enable: PropTypes.bool,
};

export default EditWGForm;
