import ImgRow from "../control/imgrow/imgrow";
import styles from "./basetable.module.css";
import PropTypes from "prop-types";

const RolesTable = ({ roles, editFunc, delFunc }) => {
  const rowMapper = () => {
    return roles.map((el) => (
      <div className={styles.row} key={el.id}>
        <p className={styles.cell}>{el.name}</p>
        <div className={styles.cell}>
          <ImgRow
            controlObj={el}
            editFunc={editFunc}
            deleteFunc={!el.delete_protection ? delFunc : undefined}
            firstImage={{ src: "/edit.svg", alt: "Изменить/Подробнее" }}
            secondImage={{ src: "/delete.svg", alt: "Удалить" }}
          />
        </div>
      </div>
    ));
  };
  return (
    <div className={styles.table}>
      <div className={styles.thead}>
        <p className={styles.cell}>Название группы</p>
        <p className={styles.cell}> </p>
      </div>
      {roles !== null ? rowMapper() : <></>}
    </div>
  );
};

RolesTable.propTypes = {
  roles: PropTypes.array,
  editFunc: PropTypes.func,
  delFunc: PropTypes.func,
};

export default RolesTable;
