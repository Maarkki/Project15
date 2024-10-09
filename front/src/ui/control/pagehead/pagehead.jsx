import { Link } from "react-router-dom";
import Button from "../../button/button";
import styles from "./pagehead.module.css";
import PropTypes from "prop-types";

const PageHead = ({ children, createHandle, backLink }) => {
  return (
    <div className={styles.page__header}>
      {backLink !== undefined && (
        <Link to={backLink} className={styles.arrow}>
          <img src="/arrowleft.svg" />
        </Link>
      )}
      <div className={styles.headblock}>
        {children}
        {createHandle !== undefined && (
          <Button
            buttonStyle="primary"
            buttonText="Добавить"
            clickHande={createHandle}
          />
        )}
      </div>
    </div>
  );
};

PageHead.propTypes = {
  children: PropTypes.any,
  createHandle: PropTypes.func,
  backLink: PropTypes.string,
};

export default PageHead;
