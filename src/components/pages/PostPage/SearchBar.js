// SearchBar.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "./SearchBar.css";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const searchHandler = () => {
    navigate(`/search/${searchTerm}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchHandler();
    }
  };

  return (
    <div className="search-box">
      <button className="btn-search" onClick={searchHandler}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
      <input
        type="text"
        className="input-search"
        placeholder="Type to Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default SearchBar;
