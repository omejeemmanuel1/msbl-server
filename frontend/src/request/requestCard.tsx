import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./request.css";

interface RequestResult {
  _id: string;
  clientName?: string;
  initiator?: string;
  type?: string;
  status?: string;
  narration?: string;
}

const RequestCard: React.FC = () => {
  const [requests, setRequests] = useState<RequestResult[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage = 12;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .get("http://localhost:3000/requests/fetch-all", { headers })
      .then((response) => {
        // Sort requests by descending order of _id (assuming _id is a timestamp or unique identifier)
        const sortedRequests = response.data.sort(
          (a: { _id: any }, b: { _id: string }) => b._id.localeCompare(a._id)
        );
        setRequests(sortedRequests);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [requests]);

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = requests.slice(startIndex, endIndex);

  return (
    <div className="request-results-container">
      <div className="request-resultList">
        {currentItems.map((request, index) => (
          <div
            key={index}
            className="request-result"
            style={{
              borderTop:
                request.status === "Started"
                  ? "5px solid red"
                  : request.status === "Approved"
                  ? "5px solid green"
                  : request.status === "Pending"
                  ? "5px solid orange"
                  : "5px solid navy",
            }}
          >
            <p className="request-list">
              {request.clientName && `Client Name:`}
              <span className="span"> {request.clientName}</span>
            </p>
            <p className="request-list">
              {request.initiator && `Initiator Name:`}
              <span className="span"> {request.initiator}</span>
            </p>
            <p className="request-list">
              {request.type && `Request Type:`}
              <span className="span"> {request.type}</span>
            </p>
            <p className="request-list">
              <span>Status: </span>
              <span
                style={{
                  color:
                    request.status === "Started"
                      ? "red"
                      : request.status === "Approved"
                      ? "green"
                      : request.status === "Pending"
                      ? "orange"
                      : "navy",
                  fontWeight: "bold",
                }}
              >
                {request.status}
              </span>
            </p>
            <p className="request-list">
              {request.narration && `Narration:`}
              <span className="span"> {request.narration}</span>
            </p>
            <Link to={`/singleRequest/${request._id}`} className="btn-link">
              <button className="link-view">View</button>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="pagination-container">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={Math.ceil(requests.length / itemsPerPage)}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination-link"}
          nextLinkClassName={"pagination-link"}
          disabledClassName={"pagination-disabled"}
          activeClassName={"pagination-active"}
        />
      </div>
    </div>
  );
};

export default RequestCard;
