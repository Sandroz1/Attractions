import { useState } from "react";
import "./SearchAndFilters.scss";

const SearchAndFilters = ({ search, setSearch, setFilter, setSort }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeSort, setActiveSort] = useState(null);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    setFilter(filter);
  };

  const handleSortClick = (sortType) => {
    if (activeSort === sortType) {
      setActiveSort(null);
      setSort(null);
    } else {
      setActiveSort(sortType);
      setSort(sortType);
    }
  };

  return (
    <div className="main__header">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />

      <div className="main__header__filter__container">
        <button
          className={activeFilter === "all" ? "active" : ""}
          onClick={() => handleFilterClick("all")}
        >
          Все
        </button>
        <button
          className={activeFilter === "Ewd" ? "active" : ""}
          onClick={() => handleFilterClick("Ewd")}
        >
          Большая посещаемость
        </button>
        <button
          className={activeFilter === "Adw" ? "active" : ""}
          onClick={() => handleFilterClick("Adw")}
        >
          Малая посещаемость
        </button>
      </div>

      <div className="sort__panel">
        <button
          className={activeSort === "popularity" ? "active" : ""}
          onClick={() => handleSortClick("popularity")}
        >
          Популярность
        </button>
        <button
          className={activeSort === "name" ? "active" : ""}
          onClick={() => handleSortClick("name")}
        >
          Алфавит
        </button>
      </div>
    </div>
  );
};

export default (SearchAndFilters); 
