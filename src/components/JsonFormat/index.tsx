import React from "react";
import PropTypes from "prop-types";
import styles from "./index.less";
import JSONTree from "react-json-tree";
import theme from "./theme";

function JsonResult({ result }) {
  return (
    <div className={styles.testResult}>
      <div className={styles.inner}>
        {result ? (
          <JSONTree
            data={result}
            theme={theme}
            shouldExpandNode={() => {
              return true;
            }}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
JsonResult.propTypes = {
  result: PropTypes.object,
};
export default JsonResult;
