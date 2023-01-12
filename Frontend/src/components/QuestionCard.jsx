import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { React, useState } from "react";
import { light_yellow, dark_aqua, background } from "../constants.ts";
import pencil from "../icons/pencil.png";
import trash from "../icons/Trash.png";

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
        backgroundColor: dark_aqua,
        width: "287px",
        height: "287px",
      }}
    >
      <div className="d-flex justify-content-center p-3">
        <p
          className="question-title"
          style={{
            color: light_yellow,
          }}
        >
          {" "}
          Question{" "}
        </p>
      </div>
      <div className="d-flex justify-content-center p-3">
        <p className="body-text text-light"> {question_text}</p>
      </div>
      <div className="d-flex justify-content-center p-3">
        <p
          className="body-text"
          style={{
            color: background,
          }}
        >
          {" "}
          Created: {pub_date}
        </p>
      </div>
      <div className="d-flex justify-content-center p-3">
        <div className="row ">
          <button className="col my-btn " onClick={editItem}>
            <img src={pencil} width="30px" height="30px" alt="edit"></img>
          </button>
          <button className="col my-btn" onClick={handleShow}>
            <img src={trash} width="30px" height="30px" alt="delete"></img>
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
          .question-title {
            font-weight: 500;
          }
        `}
      </style>
    </div>
  );
};

export default Question;
