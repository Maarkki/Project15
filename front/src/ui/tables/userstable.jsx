import ImgRow from "../control/imgrow/imgrow";
import styles from "./basetable.module.css";
import PropTypes from "prop-types";

const UsersTable = ({ users, delFunc, editFunc }) => {
  const userMapper = () => {
    return users.map((el) => (
      <div className={styles.row} key={el.id}>
        <p className={styles.cell}>{el.username}</p>
        <p className={styles.cell}>{el.email}</p>
        <p className={styles.cell + " " + styles.first_queue}>{el.status}</p>
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
        <p className={styles.cell}>Имя пользователя</p>
        <p className={styles.cell}>Email</p>
        <p className={styles.cell + " " + styles.first_queue}>Статус</p>
        <p className={styles.cell}> </p>
      </div>
      {users !== null ? userMapper() : <></>}
    </div>
  );
};

UsersTable.propTypes = {
  users: PropTypes.array,
  delFunc: PropTypes.func,
  editFunc: PropTypes.func,
};

export default UsersTable;
