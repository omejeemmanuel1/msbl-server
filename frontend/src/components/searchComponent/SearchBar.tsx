import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

interface SearchResult {
  _id: any;
  clientName?: string;
  initiator?: string;
  type?: string;
  status?: string;
  narration?: string;
}

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
  };

  const handleSearch = async () => {
    try {
      if (!searchQuery.trim()) {
        toast.error("Please enter a valid search query");
        return;
      }
      const token = getTokenFromLocalStorage();

      const response = await axios.get(
        `http://localhost:3000/requests/search`,
        {
          params: {
            name: searchQuery,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/search-results", {
        state: { searchResults: response.data.results },
      });
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
        placeholder="Search by client name, initiator, request type or status"
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        <FaSearch />
      </button>
      <ToastContainer />
    </div>
  );
};

export default SearchBar;
