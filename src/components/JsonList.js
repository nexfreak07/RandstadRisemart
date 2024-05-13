import React, {useState} from "react";
import styles from "./JsonList.module.css";
const JsonList = ({title, sendTitle }) => {


    const [seen, setSeen] = useState(false);
    function handleClick() {
        setSeen(true);
        sendTitle(title)
      }
  return (
    
      <div className={styles.jsonBoundary} onClick={handleClick}>
        <div className={`${styles.jsonTitle} ${seen ? styles.seen : ""}`}>{title.title}</div>
      </div>
  );
};

export default JsonList;
