import { memo } from "react";
import styles from "./imgrow.module.css";
import PropTypes from "prop-types";

const ImgRows = ({
  controlObj,
  editFunc,
  deleteFunc,
  firstImage,
  secondImage,
}) => {
  return (
    <div className={styles.group}>
      {editFunc ? (
        <img
          onClick={() => editFunc(controlObj)}
          className={styles.item}
          src={firstImage.src}
          alt={firstImage.alt}
          width="24"
          height="24"
          title={firstImage.alt}
        />
      ) : (
        <></>
      )}
      {deleteFunc ? (
        <img
          className={styles.item}
          onClick={() => deleteFunc(controlObj)}
          src={secondImage.src}
          alt={secondImage.alt}
          width="24"
          height="24"
          title={secondImage.alt}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

ImgRows.propTypes = {
  controlObj: PropTypes.object,
  deleteFunc: PropTypes.func,
  editFunc: PropTypes.func,
  firstImage: PropTypes.object,
  secondImage: PropTypes.object,
};

const ImgRow = memo(ImgRows);

export default ImgRow;
