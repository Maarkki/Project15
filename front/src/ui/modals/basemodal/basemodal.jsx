import ReactModal from "react-modal";
import mstyles from "./basemodal.module.css";
import PropTypes from "prop-types";

function BaseModal({ children, backHandle, closeHandle, isOpen, headText }) {
  const styles = {
    overlay: {
      backgroundColor: "rgba(187, 187, 187, 0.75)",
    },
    content: {
      top: "40%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%,-50%)",
      border: "none",
      borderRadius: "8px",
      padding: "20px 20px 25px 20px",
      width: "450px",
    },
  };
  return (
    <ReactModal isOpen={isOpen} style={styles}>
      <div className={mstyles.control_row}>
        {backHandle !== undefined ? (
          <img
            className={mstyles.control_arrow}
            src="/arrowleft.svg"
            onClick={backHandle}
          />
        ) : (
          <></>
        )}
        <img
          className={mstyles.control_close}
          src="/close.svg"
          onClick={closeHandle}
        />
      </div>
      <h2 className={mstyles.modalHead}>{headText}</h2>
      <div className={mstyles.content}>{children}</div>
    </ReactModal>
  );
}

BaseModal.propTypes = {
  children: PropTypes.any,
  isOpen: PropTypes.bool,
  headText: PropTypes.string,
  backHandle: PropTypes.func,
  closeHandle: PropTypes.func,
};

export default BaseModal;
