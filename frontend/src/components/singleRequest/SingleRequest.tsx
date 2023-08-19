import React from "react";
import "./SingleRequest.css"; // Import external CSS file

const SingleRequest: React.FC = () => {
  const requestDetails = {
    status: "started",
    clientName: "SUWAID SUWAID SAID",
    clientEmail: "suwaidsaid@gmail.com",
    clientPhoneNumber: "08034536034",
    initiator: "Blessing Boyede",
    requestID: "45aae8a0-049e-472a-b216-debad02037a8",
    narration:
      "Kindly process attached STF of WAPCO,FTNCOCOA,TRANSCORP for SUWAID SUWAID SAID",
    requestDateTime: "18-8-2023 | 1:02:50PM",
    stage: "Request Sent",
    requiredDocuments: "docs",
    debitAuthorizationUrl: "Zanibal Url",
  };

  const comments = [
    {
      content:
        "FEEDBACK FROM CENTURION: We are no longer handling C & I Leasing. Kindly reach out to Cordros Registrars for further information and instructions.",
      author: "BlessingIsong",
      date: "18-8-2023 1:31:25PM",
    },
    // Add more comment objects as needed
  ];

  return (
    <div className="single-request-container">
      <div className="request-head">
        <h2 className="request-title">Request</h2>
        <h1>SHARE TRANSFER FORM (ALLOTMENT)</h1>
        <p className="status-d">
          Status: <strong>{requestDetails.status}</strong>
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
            <strong>{requestDetails.clientPhoneNumber}</strong>
          </p>
        </div>
        <div className="initiator-d">
          <p className="detail">
            Initiator: <br />
            <strong>{requestDetails.initiator}</strong>
          </p>
          <p className="detail">
            Request ID: <br />
            <strong>{requestDetails.requestID}</strong>
          </p>
          <p className="detail">
            Narration: <br />
            <strong>{requestDetails.narration}</strong>
          </p>
          <p className="detail">
            Request Date & Time: <br />
            <strong>{requestDetails.requestDateTime}</strong>
          </p>
        </div>
      </div>
      <div className="main-stages">
        <div className="comment-list">
          <h4>Comments:</h4>
          <div className="comment-body">
            {comments.map((comment, index) => (
              <div key={index}>
                <p>{comment.content}</p>
                <p>
                  ~{comment.author} on {comment.date}
                </p>
              </div>
            ))}
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
              <strong>{requestDetails.requiredDocuments}</strong>
            </p>
            <p className="detail">
              Debit Authorization url: <br />
              <strong>{requestDetails.debitAuthorizationUrl}</strong>
            </p>
          </div>
          <div className="comment">
            <form action="" className="comment-form">
              <div className="comment-input">
                <label htmlFor="comment-label">
                  Comment:
                  <br />
                </label>
                <input type="text" />
              </div>
              <button className="comment-btn">Add Comment</button>
            </form>
          </div>
        </div>
      </div>
      <div className="buttons-container">
        <button className="action-button">Update Request</button>
      </div>
    </div>
  );
};

export default SingleRequest;
