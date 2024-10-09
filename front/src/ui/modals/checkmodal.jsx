import PropTypes from "prop-types";
import Button from "../button/button";
import BaseModal from "./basemodal/basemodal";

function CheckModal({ isOpen, closeHandle, submitHandle }) {
  return (
    <BaseModal
      isOpen={isOpen}
      headText="Подтвердите действие"
      closeHandle={() => closeHandle(false)}
    >
      <div className="form">
        <div className="button__row">
          <Button
            clickHande={submitHandle}
            buttonStyle={"primary"}
            buttonText={"Подтвердить"}
          />
          <Button
            clickHande={() => closeHandle(false)}
            buttonStyle={"secondary"}
            buttonText={"Отмена"}
          />
        </div>
      </div>
    </BaseModal>
  );
}

CheckModal.propTypes = {
  isOpen: PropTypes.bool,
  closeHandle: PropTypes.func,
  submitHandle: PropTypes.func,
};

export default CheckModal;
