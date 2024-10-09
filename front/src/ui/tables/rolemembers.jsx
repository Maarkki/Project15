import usernameTranslator from "../../lib/translators/username.translator";
import ImgRow from "../control/imgrow/imgrow";
import styles from "./basetable.module.css";
import PropTypes from "prop-types";

const RoleMembersTable = ({ members, delFunc, tableName }) => {
  const rowMapper = () => {
    return members.map((el) => (
      <div className={styles.row} key={el.id}>
        <p className={styles.cell}>
          {usernameTranslator(el.name, el.soname, el.username)}
        </p>
        <div className={styles.cell}>
          <ImgRow
            controlObj={el}
            editFunc={undefined}
            deleteFunc={
              !(tableName == "Admin" && el.id == 1) ? delFunc : undefined
            }
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
        <p className={styles.cell}> </p>
      </div>
      {members !== null ? rowMapper() : <></>}
    </div>
  );
};

RoleMembersTable.propTypes = {
  members: PropTypes.array,
  delFunc: PropTypes.func,
  tableName: PropTypes.string,
};

export default RoleMembersTable;
