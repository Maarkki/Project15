//import { memo } from "react";
import styles from "./listrow.module.css";
import PropTypes from "prop-types";

// const ListRowComp = ({ children, isWarning = false }) => {
//   return (
//     <div className={styles.item + " " + (isWarning ? styles.warning : "")}>
//       {children}
//     </div>
//   );
// };

// ListRowComp.propTypes = {
//   children: PropTypes.any,
//   isWarning: PropTypes.bool,
// };

// const ListRow = memo(ListRowComp, []);

const ListRow = ({ children, isWarning = false }) => {
  return (
    <div className={styles.item + " " + (isWarning ? styles.warning : "")}>
      {children}
    </div>
  );
};

ListRow.propTypes = {
  children: PropTypes.any,
  isWarning: PropTypes.bool,
};

export default ListRow;
