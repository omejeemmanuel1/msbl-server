import React, { useState } from "react";
import axios from "axios";
import "./SearchBar.css"; // Import the external CSS file

interface SearchResult {
  // Define the structure of the search results here
  // Assuming full name is in 'clientName'
  clientName?: string;
  type?: string;
  status?: string;
  date?: string;
  // Add other properties as needed for displaying full details
}

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/requests/search`,
        {
          params: {
            name: searchQuery,
            date: searchQuery,
            status: searchQuery,
            type: searchQuery,
          },
        }
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
      <div>
        {searchResults.map((result, index) => (
          <div key={index} className="search-result">
            <p className="result-name">
              {result.clientName && `Full Name: ${result.clientName}`}
            </p>
            <p className="result-details">
              {result.type && `Type: ${result.type}`}
              {result.status && `Status: ${result.status}`}
              {result.date && `Date: ${result.date}`}
              {/* Display additional result details here */}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
