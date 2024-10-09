import ReactSwitch from "react-switch";
import styles from "./basetable.module.css";
import PropTypes from "prop-types";

const RightsTable = ({ rights, activeRights, setRight, disable }) => {
  const checkActive = (action) => {
    return [...activeRights].find((el) => el.action == action) !== undefined;
  };

  const rowMapper = () => {
    return rights.map((el) => (
      <div className={styles.row} key={el.id}>
        <p className={styles.cell}>{el.action}</p>
        <ReactSwitch
          onChange={() => setRight(el)}
          disabled={disable}
          checked={checkActive(el.action)}
        />
      </div>
    ));
  };

  return (
    <div className={styles.table}>
      <div className={styles.thead}>
        <p className={styles.cell}>Действие</p>
        <p className={styles.cell}> </p>
      </div>
      {rights !== null && activeRights !== null ? rowMapper() : <></>}
    </div>
  );
};

RightsTable.propTypes = {
  rights: PropTypes.array,
  activeRights: PropTypes.array,
  disable: PropTypes.bool,
  setRight: PropTypes.func,
};

export default RightsTable;
