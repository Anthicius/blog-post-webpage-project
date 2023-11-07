import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "./SearchBar.css";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const searchHandler = async () => {
    navigate(`/search/${searchTerm}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchHandler();
    }
  };

  return (
      <div class="search-box">
        <button class="btn-search" onClick={searchHandler}>
        <FontAwesomeIcon icon={faSearch} />
        </button>
        <input
          type="text"
          class="input-search"
          placeholder="Type to Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
  );
};

export default SearchBar;
