import React from "react";
import styles from "./Card.module.css";
const Card = ({ data, id, onSelectCard, seenTitles}) => {

      function handleClick() {
        onSelectCard(data);
      }
      if(data.length <=0)
        return null;
   
  return (
    <div className={styles.cardOuter} onClick={handleClick}>
      <div className={styles.albumCount}> {isNaN(data.length - seenTitles.length) ? data.length : data.length - seenTitles.length}</div>
      <div className={styles.cardContent}>
        <div className={styles.userId}>
            <div className={styles.userIdContent}>{`Card ID_${id}`}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
