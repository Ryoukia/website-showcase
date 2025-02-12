import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

export const SearchBar = ({ onSearch, barCssClassName }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call supplied callback function, passing in search bar input.
    onSearch(input);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={`input-wrapper ${barCssClassName}`}>
        <FaSearch id="search-icon"></FaSearch>
        <input
          className="input"
          placeholder="Search..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          name={"sb-input".concat("-").concat(barCssClassName)}
        ></input>
      </div>
    </form>
  );
};
