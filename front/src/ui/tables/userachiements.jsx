import ImgRow from "../control/imgrow/imgrow";
import styles from "./basetable.module.css";
import PropTypes from "prop-types";

const UserAchievementsTable = ({ achievements, delFunc, editFunc }) => {
  const rowMapper = () => {
    return achievements.map((el) => (
      <div className={styles.row} key={el.id}>
        <p className={styles.cell}>{el.title}</p>
        <p className={styles.cell}>{Number(el.approve)}</p>
        <p className={styles.cell}>{el.Event.title}</p>
        <div className={styles.cell}>
          {el.approve ? (
            <img src="/delete.svg" />
          ) : (
            <ImgRow
              controlObj={el}
              deleteFunc={delFunc}
              editFunc={editFunc}
              firstImage={{ src: "/done.svg", alt: "Подтвердить" }}
              secondImage={{ src: "/delete.svg", alt: "Удалить" }}
            />
          )}
        </div>
      </div>
    ));
  };
  return (
    <div className={styles.table}>
      <div className={styles.thead}>
        <p className={styles.cell}>Название достижения</p>
        <p className={styles.cell}>Статус</p>
        <p className={styles.cell}>Мероприятие</p>
        <p className={styles.cell}> </p>
      </div>
      {achievements !== null ? rowMapper() : <></>}
    </div>
  );
};

UserAchievementsTable.propTypes = {
  achievements: PropTypes.array,
  delFunc: PropTypes.func,
  editFunc: PropTypes.func,
};

export default UserAchievementsTable;
