import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSearch } from "react-icons/fa"; // Import the search icon from react-icons
import "./SearchBar.css"; // Import the external CSS file

interface SearchResult {
  clientName?: string;
  initiator?: string;
  type?: string;
  status?: string;
  narration?: string;
}

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const handleSearch = async () => {
    try {
      if (!searchQuery.trim()) {
        toast.error("Please enter a valid search query");
        return;
      }

      setIsLoading(true); // Start loading
      const response = await axios.get(
        `http://localhost:3000/requests/search`,
        {
          params: {
            name: searchQuery,
          },
        }
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // End loading
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
      <button
        onClick={handleSearch}
        className={`search-button ${isLoading ? "loading" : ""}`}
        disabled={isLoading}
      >
        {isLoading ? "Searching..." : <FaSearch />}{" "}
        {/* Display icon or loading text */}
      </button>
      <div>
        {/* Search results */}
        {searchResults.map((result, index) => (
          <div key={index} className="search-result">
            <p className="result-name">
              {result.clientName && `Client Name: ${result.clientName}`}
            </p>
            <p>{result.initiator && `Initiator Name: ${result.initiator}`}</p>
            <p className="result-details">
              {result.type && `Request Type: ${result.type}`}
            </p>
            <p>{result.status && `Status: ${result.status}`}</p>
            <p>{result.narration && `Narration: ${result.narration}`}</p>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default SearchBar;
