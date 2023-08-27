import React from "react";
import { useLocation, Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./SearchBar.css";
import InitiatorNav from "../initiatorDashboard/InitiatorNav";
import { TiArrowBack } from "react-icons/Ti";

interface SearchResult {
  _id: any;
  clientName?: string;
  initiator?: string;
  type?: string;
  status?: string;
  narration?: string;
}

interface LocationState {
  searchResults: SearchResult[];
}

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const { searchResults } = state;

  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = React.useState(0);
  const pageCount = Math.ceil(searchResults.length / itemsPerPage);
  const currentItems = searchResults.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <>
      <InitiatorNav />
      <Link to="/initiatorDashboard" className="b-arrow">
        <button>
          <TiArrowBack />
          Request history
        </button>
      </Link>
      <div className="search-results-container">
        <div className="search-resultList">
          {currentItems.map((result: SearchResult, index: number) => (
            <div
              key={index}
              className="search-result"
              style={{
                borderTop:
                  result.status === "Started"
                    ? "5px solid red"
                    : result.status === "Approved"
                    ? "5px solid green"
                    : result.status === "Pending"
                    ? "5px solid orange"
                    : "navy",
              }}
            >
              <p className="result-details">
                {result.clientName && `Client Name:`}
                <span className="span"> {result.clientName}</span>
              </p>
              <p className="result-details">
                {result.initiator && `Initiator Name:`}
                <span className="span"> {result.initiator}</span>
              </p>
              <p className="result-details">
                {result.type && `Request Type:`}
                <span className="span"> {result.type}</span>
              </p>
              <p className="result-details">
                <span>Status: </span>
                <span
                  style={{
                    color:
                      result.status === "Started"
                        ? "red"
                        : result.status === "Approved"
                        ? "green"
                        : result.status === "Pending"
                        ? "orange"
                        : "navy",
                    fontWeight: "bold",
                  }}
                >
                  {result.status}
                </span>
              </p>
              <p className="result-details">
                {result.narration && `Narration:`}
                <span className="span"> {result.narration}</span>
              </p>
              <Link to={`/singleRequest/${result._id}`} className="btn-link">
                <button className="link-view">View</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="pagination-container">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination-link"}
          nextLinkClassName={"pagination-link"}
          disabledClassName={"pagination-disabled"}
          activeClassName={"pagination-active"}
        />
      </div>
    </>
  );
};

export default SearchResultsPage;
