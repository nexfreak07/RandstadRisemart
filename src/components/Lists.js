import React from "react";
import JsonList from "./JsonList";
import styles from "./Lists.module.css";
const Lists = ({titleList, handleSeen, searchTerm, id}) => {
    const filteredList = titleList.filter((title) =>
        title.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const {userId} = titleList[0]

  return (
    <div>
      <div className={styles.sectionTitle}>{`Card ID_${userId}`}</div>
      <div>
       {filteredList.map((title)=> <JsonList key={title.id} title={title}  sendTitle={handleSeen}/>)}
      </div>
    </div>
  );
};

export default Lists;
