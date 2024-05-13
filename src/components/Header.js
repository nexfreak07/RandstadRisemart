import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
const Header = ({setSearchTerm}) => {
  const [search, setSearch] = useState("");

  const searchHandler = (e) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    setSearchTerm(search);
  }, [search, setSearchTerm]);

    
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <h1>Logo</h1>
      </div>
      <div className={styles.searchBox}>
        <input type="text" placeholder="Search" value={search} onChange={searchHandler} />
      </div>
    </div>
  );
};

export default Header;
