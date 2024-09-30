import React from "react";
import { Circles } from "react-loader-spinner";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loaderOverlay}>
      <Circles
        height="80"
        width="80"
        color="#ffffff"
        ariaLabel="circles-loading"
        visible={true}
      />
    </div>
  );
};

export default Loader;
