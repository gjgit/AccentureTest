import React from "react";
import styles from "./Pop.module.css";

const Popup = (props) => {
  return (
    <div className={styles.popup} onClick={props.handleClose}>
      <div className={styles.popup_inner}>
        <span className={styles.closeicon} onClick={props.handleClose}>
          x
        </span>
        {props.content}
      </div>
    </div>
  );
};

export default Popup;
