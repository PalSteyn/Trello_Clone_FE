// components/SearchBar.jsx
import React from "react";
import styles from "./SearchBar.module.css";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className={styles.searchWrapper}>
      <label htmlFor="search" className={styles.searchLabel}>
        Search:
      </label>
      <input
        id="search"
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchBar;
