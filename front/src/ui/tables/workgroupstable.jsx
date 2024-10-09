import ImgRow from "../control/imgrow/imgrow";
import styles from "./basetable.module.css";
import PropTypes from "prop-types";

const WorkgroupsTable = ({ workgroups, editFunc, delFunc }) => {
  const rowMapper = () => {
    return workgroups.map((el) => (
      <div className={styles.row} key={el.id}>
        <p className={styles.cell}>{el.title}</p>
        <div className={styles.cell}>
          <ImgRow
            controlObj={el}
            deleteFunc={delFunc}
            editFunc={editFunc}
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
        <p className={styles.cell}>Название</p>
        <p className={styles.cell}> </p>
      </div>
      {workgroups !== null ? rowMapper() : <></>}
    </div>
  );
};

WorkgroupsTable.propTypes = {
  workgroups: PropTypes.array,
  delFunc: PropTypes.func,
  editFunc: PropTypes.func,
};

export default WorkgroupsTable;
