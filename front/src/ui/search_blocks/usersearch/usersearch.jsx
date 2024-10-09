import usernameTranslator from "../../../lib/translators/username.translator";
import UsersService from "../../../services/users/users";
import Button from "../../button/button";
import styles from "../search.module.css";
import PropTypes from "prop-types";

const UserSearch = ({
  setSelectUser,
  users,
  setUsers,
  searchRow,
  setSearchRow,
}) => {
  const searchHandle = async () => {
    if (searchRow.length < 2) return;
    if (searchRow.current !== searchRow.prev) {
      setUsers(null);
      const data = await UsersService.search(searchRow.current.trim());

      if (data != false && data != null) {
        setSearchRow({ ...searchRow, prev: searchRow.current });
        setUsers(data);
      }
    }
  };

  const resultMapper = () => {
    return users.map((el) => (
      <div key={el.id} className={styles.result__card}>
        <div>
          <p>{usernameTranslator(el.name, el.soname, el.username)}</p>
          <p>{el.email}</p>
        </div>
        <Button
          buttonText="Выбрать"
          buttonType="button"
          clickHande={() => setSelectUser(el)}
        />
      </div>
    ));
  };

  return (
    <div className={styles.search}>
      <label className="label">
        Введите Имя, Фамилию или адрес почты
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
      {users !== null ? (
        <div className={styles.result_list}>{resultMapper()}</div>
      ) : (
        <></>
      )}
    </div>
  );
};

UserSearch.propTypes = {
  setSelectUser: PropTypes.func,
  users: PropTypes.array,
  setUsers: PropTypes.func,
  searchRow: PropTypes.object,
  setSearchRow: PropTypes.func,
};

export default UserSearch;
