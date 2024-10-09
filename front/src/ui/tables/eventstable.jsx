import { dateRangeTranslator } from "../../lib/translators/date.translator";
import usernameTranslator from "../../lib/translators/username.translator";
import ImgRow from "../control/imgrow/imgrow";
import styles from "./basetable.module.css";
import PropTypes from "prop-types";

const EventsTable = ({ events, delFunc, editFunc }) => {
  const rowMapper = () => {
    return events.map((el) => (
      <div className={styles.row} key={el.id}>
        <p className={styles.cell}>{el.title}</p>
        <p className={styles.cell}>
          {dateRangeTranslator(el.start_date, el.end_date)}
        </p>
        <p className={styles.cell + " " + styles.first_queue}>
          {usernameTranslator(
            el.Author.name,
            el.Author.soname,
            el.Author.username
          )}
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
        <p className={styles.cell}>Название</p>
        <p className={styles.cell}>Дата проведения</p>
        <p className={styles.cell + " " + styles.first_queue}>Автор</p>
        <p className={styles.cell}> </p>
      </div>
      {events !== null ? rowMapper() : <></>}
    </div>
  );
};

EventsTable.propTypes = {
  events: PropTypes.array,
  delFunc: PropTypes.func,
  editFunc: PropTypes.func,
};

export default EventsTable;
