import { Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../constants.ts";
import axios from "axios";

const getQuestion = async (id) => {
  let data = [];
  await axios
    .get(`${API_BASE_URL}/api/field/` + id + "/")
    .then((response) => {
      data = response.data;
      console.log(response.data);
    })
    .catch((error) => {
      //   console.log(error);
    });

  return data;
};

const ModalQuestion = (props) => {
  const [field, setField] = useState([]);
  const [question_text, setQuestion_text] = useState("");
  useEffect(() => {
    getQuestion(props.id).then((data) => {
      try {
        setField(data);
        setQuestion_text(data.question.question_text);
      } catch (error) {
        // console.error(error);
      }
    });
  }, [props.id]);
  return (
    <Modal
      size="lg"
      aria-labelledby="success"
      centered
      show={props.show}
      onHide={props.handleClose}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title id="warning">
          <p>
            Categorie {field.categorie_name} for {field.point} points!
          </p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{question_text}</p>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex">
          <button className="btn btn-primary" onClick={props.onclick}>
            Close
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalQuestion;
