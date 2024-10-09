import usernameTranslator from "../../lib/translators/username.translator";
import ImgRow from "../control/imgrow/imgrow";
import styles from "./basetable.module.css";
import PropTypes from "prop-types";

const WorkgroupUsersTable = ({ wgusers, delFunc, editFunc }) => {
  const rowMapper = () => {
    return wgusers.map((el) => (
      <div className={styles.row} key={el.id}>
        <p className={styles.cell + " " + styles.first_queue}>
          {usernameTranslator(el.name, el.soname, el.username)}
        </p>
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
        <p className={styles.cell + " " + styles.first_queue}>
          Фимилия Имя пользователя
        </p>
        <p className={styles.cell}> </p>
      </div>
      {wgusers !== null ? rowMapper() : <></>}
    </div>
  );
};

WorkgroupUsersTable.propTypes = {
  wgusers: PropTypes.array,
  delFunc: PropTypes.func,
  editFunc: PropTypes.func,
};

export default WorkgroupUsersTable;
