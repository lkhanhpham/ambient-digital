import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { React, useState } from "react";

// For each created question one questioncard is rendered

const Question = ({ question_text, pub_date, deleteItem, editItem }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  return (
    <div
      className="d-inline-block custom-card m-3"
      style={{
        /* Move the element to the right by 50% of the container's width */
        // left: '50%',
        /* Calculates 50% of the element's width, and moves it by that */
        /* amount across the X-axis to the left */
        transform: "translateX(25%)",
        backgroundColor: "#D9D9D9",
        width: "287px",
        height: "287px",
      }}
    >
      <div className="d-flex justify-content-center p-3">
        <p className="question-title"> Question </p>
      </div>
      <div className="d-flex justify-content-center p-3">
        <p className="body-text"> {question_text}</p>
      </div>
      <div className="d-flex justify-content-center p-3">
        <p className="body-text text-muted"> Created: {pub_date}</p>
      </div>
      <div className="d-flex justify-content-center p-3">
        <div className="row ">
          <button className="col me-3 my-btn " onClick={editItem}>
            Edit
          </button>
          <button className="col my-btn" onClick={handleShow}>
            Delete{" "}
          </button>
        </div>
      </div>
      {/* Confirm delete */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>Do you really want to delete this question?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={deleteItem}>
            Yes!
          </Button>
          <Button variant="primary" onClick={handleClose}>
            No!
          </Button>
        </Modal.Footer>
      </Modal>
      <style jsx="true">
        {`
          .custom-card {
            border-radius: 1rem;
          }
          .my-btn {
            border-radius: 0.5rem;
            background-color: #e7e7e7;
            border-color: #e7e7e7;
            color: black;
          }

          .my-btn:hover {
            background: white;
          }
          .question-title {
            font-weight: 500;
          }
        `}
      </style>
    </div>
  );
};

export default Question;
