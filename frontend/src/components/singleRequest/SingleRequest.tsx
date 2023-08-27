import React, { useState, useEffect } from "react";
import "./SingleRequest.css";
import InitiatorNav from "../initiatorDashboard/InitiatorNav";
import { Link, useParams } from "react-router-dom"; // Import useParams
import axios from "axios";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import { PiArrowSquareOutBold } from "react-icons/Pi";
import { TiArrowBack } from "react-icons/Ti";

const SingleRequest: React.FC = () => {
  const [requestDetails, setRequestDetails] = useState<any>({ comments: [] });
  const [commentText, setCommentText] = useState("");

  const { _id } = useParams();

  const userToken = localStorage.getItem("token");

  useEffect(() => {
    if (userToken && _id) {
      axios
        .get(`http://localhost:3000/requests/fetch/${_id}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((response) => {
          setRequestDetails(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [userToken, _id]);

  const addComment = async (event: React.FormEvent) => {
    console.log("addComment function called");
    try {
      const response = await axios.post(
        `http://localhost:3000/requests/add-comment/${_id}`,
        { comment: commentText },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const newComment = {
        ...response.data,
        formattedTimestamp: format(
          new Date(new Date(response.data.timestamp).getTime()),
          "MMMM d, yyyy HH:mm:ss"
        ),
      };

      setRequestDetails((prevDetails: any) => ({
        ...prevDetails,
        comments: [...prevDetails.comments, newComment],
      }));
      setCommentText("");

      return false; // Prevent default form submission behavior
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  let formattedCreatedAt = "Invalid Date";
  if (requestDetails.createdAt) {
    const parsedCreatedAt = parseISO(requestDetails.createdAt);
    formattedCreatedAt = format(parsedCreatedAt, "MMMM d, yyyy HH:mm:ss");
  }

  const formatDate = (dateString: string) => {
    const parsedDate = new Date(dateString);
    const distance = formatDistanceToNow(parsedDate, { addSuffix: true });
    return distance;
  };

  return (
    <>
      <InitiatorNav />
      <div className="single-request-container">
        <Link to="/initiatorDashboard" className="b-arrow">
          <button>
            <TiArrowBack />
            Request history
          </button>
        </Link>
        <div className="request-head">
          <h2 className="request-title">Request</h2>
          <h1>SHARE TRANSFER FORM (ALLOTMENT)</h1>
          <p className="status-d">
            <span>Status: </span>
            <span
              style={{
                color:
                  requestDetails.status === "Started"
                    ? "red"
                    : requestDetails.status === "Approved"
                    ? "green"
                    : requestDetails.status === "Pending"
                    ? "orange"
                    : "navy",
                fontWeight: "bold",
              }}
            >
              {requestDetails.status}
            </span>
          </p>
        </div>
        <div className="request-details">
          <div className="client">
            <p className="detail">
              Client Name: <br /> <strong>{requestDetails.clientName}</strong>
            </p>
            <p className="detail">
              Client Email: <br /> <strong>{requestDetails.clientEmail}</strong>
            </p>
            <p className="detail">
              Client Phone Number: <br />
              <strong>{requestDetails.clientPhone}</strong>
            </p>
          </div>
          <div className="initiator-d">
            <p className="detail">
              Initiator: <br />
              <strong>{requestDetails.initiator}</strong>
            </p>
            <p className="detail">
              Request ID: <br />
              <strong>{requestDetails._id}</strong>
            </p>
            <p className="detail">
              Narration: <br />
              <strong>{requestDetails.narration}</strong>
            </p>
            <p className="detail">
              Request Date & Time: <br />
              <strong>{formattedCreatedAt || "Invalid Date"}</strong>
            </p>
          </div>
        </div>
        <div className="main-stages">
          <div className="comment-list">
            <h4>Comments:</h4>
            <div className="comment-body">
              {requestDetails.comments.map((comment: any) => {
                return (
                  <div className="comment-item" key={comment._id}>
                    <p className="comment-text">{comment.text}</p>
                    <p className="comment-meta">
                      ~{comment.user} on {formatDate(comment.timestamp)}
                    </p>
                    <hr />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="stage-one">
            <div className="stages">
              <p className="detail">
                Stage: <br />
                <strong>{requestDetails.stage}</strong>
              </p>
              <p className="detail">
                Required Documents: <br />
                <Link to={requestDetails.docURL}>
                  <strong>docs</strong>
                  <PiArrowSquareOutBold />
                </Link>
              </p>
              <p className="detail">
                Debit Authorization url: <br />
                <Link to={requestDetails.authURL}>
                  <strong>Zanibal Url</strong>
                  <PiArrowSquareOutBold />
                </Link>
              </p>
            </div>
            <div className="comment">
              <form className="comment-form" onSubmit={addComment}>
                <div className="comment-input">
                  <label htmlFor="comment-label">
                    Comment:
                    <br />
                  </label>
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                </div>
                <button className="comment-btn" type="submit">
                  Add Comment
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="buttons-container">
          <button className="action-button">Update Request</button>
        </div>
      </div>
    </>
  );
};

export default SingleRequest;
