import { dateRangeTranslator } from "../../../lib/translators/date.translator";
import EventsService from "../../../services/events/events";
import Button from "../../button/button";
import styles from "./eventssearch.module.css";
import PropTypes from "prop-types";

const EventsSearch = ({
  setSelectEvent,
  events,
  setEvents,
  searchRow,
  setSearchRow,
}) => {
  const searchHandle = async () => {
    if (searchRow.length < 2) return;
    if (searchRow.current !== searchRow.prev) {
      setEvents(null);
      const data = await EventsService.search(searchRow.current.trim());
      if (data != false && data != null) {
        setSearchRow({ ...searchRow, prev: searchRow.current });
        setEvents(data);
      }
    }
  };

  const eventsMapper = () => {
    return events.map((el) => (
      <div key={el.id} className={styles.event_card}>
        <div>
          <p>{el.title}</p>
          <p>{dateRangeTranslator(el.start_date, el.end_date)}</p>
        </div>
        <Button
          buttonText="Выбрать"
          buttonType="button"
          clickHande={() => setSelectEvent(el)}
        />
      </div>
    ));
  };

  return (
    <div className={styles.search}>
      <label className="label">
        Введите название, описание или дату
        <div className={styles.search_row}>
          <input
            className={"input " + styles.search_input}
            value={searchRow.current}
            onChange={(e) =>
              setSearchRow({ ...searchRow, current: e.target.value })
            }
          />
          <button className={styles.search_button} onClick={searchHandle}>
            <img src="/search.svg" />
          </button>
        </div>
      </label>
      {events !== null ? (
        <div className={styles.events_list}>{eventsMapper()}</div>
      ) : (
        <></>
      )}
    </div>
  );
};

EventsSearch.propTypes = {
  setSelectEvent: PropTypes.func,
  events: PropTypes.array,
  setEvents: PropTypes.func,
  searchRow: PropTypes.object,
  setSearchRow: PropTypes.func,
};

export default EventsSearch;
