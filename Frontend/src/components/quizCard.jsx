import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../constants.ts";
import ModalWarning from "./ModalWarning";
import { Modal, Button } from "react-bootstrap";

// For each created quiz one quizcard is rendered
const Quiz = (props) => {
  const navigate = useNavigate();
  const [fields, setFields] = useState([]);
  const nr_of_categories = props.nr_of_categories;
  const nr_of_rows = props.nr_of_rows;

  const [show, setShow] = useState(false);
  const [showWarningNoTeams, setShowNoTeams] = useState(false);
  const handleCloseNoTeams = () => setShowNoTeams(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const [showWarning, setShowWarning] = useState(false);
  //close the Warning
  const handleCloseWarning = () => setShowWarning(false);
  //show the Warning
  const handleShowWarning = () => setShowWarning(true);

  const getAllFields = async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/wholequiz/` + props.id + "/"
    );
    const data = await response.json();
    if (response.ok) {
      //console.log(data.field_quiz)
      setFields(data.field_quiz);
    } else {
      //console.log(response.status)
      console.log("Failed Network request");
    }
  };

  const [teams, setTeams] = useState([]);
  const [teamNames] = useState([]);
  const getAllTeams = async () => {
    const response = await fetch(`${API_BASE_URL}/api/Teams/`);
    const data = await response.json();
    // var arr = []
    if (response.ok) {
      //console.log(data)
      data.map((team) => {
        if (team.quiz === props.id) {
          if (!teamNames.includes(team.team_name)) {
            teamNames.push(team.team_name);
            teams.push(team);
          }
        }
      });
      console.log(teams);
      // refresh();
    } else {
      //console.log(response.status)
      console.log("Failed Network request");
    }
  };

  const display = (event) => {
    if (teams.length > 1) {
      event.preventDefault();
      const status = new Array(fields.length).fill(0);
      const fieldStatus = JSON.stringify(status);
      localStorage.setItem(props.id, fieldStatus);
      var valid = true;
      fields.map((field) => {
        if (field.question_id === null) {
          valid = false;
        }
      });
      if (!valid) {
        handleShowWarning();
      } else {
        navigate("/Quiz/" + props.id + "/", {
          state: {
            id: props.id,
            title: props.title,
            nr_of_categories: nr_of_categories,
            nr_of_rows: nr_of_rows,
            fields: fields,
            teams: teams,
          },
        });
      }
    } else {
      setShowNoTeams(true);
    }
  };

  const addTeam = (event) => {
    event.preventDefault();
    navigate("/QuizCreator/TeamsCreator/", {
      state: {
        quizId: props.id,
        title: props.title,
      },
    });
  };

  useEffect(() => {
    getAllFields();
    getAllTeams();
  }, []);
  const editItem = async (event) => {
    event.preventDefault();
    navigate("/EditQuiz1/" + props.id + "/", {
      state: {
        id: props.id,
        title: props.title,
        nr_of_categories: nr_of_categories,
        nr_of_rows: nr_of_rows,
        fields: fields,
      },
    });
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
        <p className="quiz-title" onClick={display}>
          {" "}
          {props.title}{" "}
        </p>
      </div>
      <div className="d-flex justify-content-center pt-3">
        <p className="body-text"> {props.nr_of_categories} categories</p>
      </div>
      <div className="d-flex justify-content-center">
        <p className="body-text text-muted"> Created: {props.pub_date}</p>
      </div>
      <div className="d-flex justify-content-center mt-3 my-div">
        <button className="col my-btn" onClick={addTeam}>
          Teams
        </button>
      </div>
      <div className="d-flex justify-content-center mb-3 p-3">
        <div className="row ">
          <button className="col me-3 my-btn" onClick={editItem}>
            Edit
          </button>
          <button className="col my-btn" onClick={handleShow}>
            Delete
          </button>
        </div>
        <ModalWarning
          showWarning={showWarning}
          handleCloseWarning={handleCloseWarning}
          title={"Ugh! You cannot play this quiz yet."}
          body={
            "Looks like your quiz is incomplete. Edit this quiz and try again."
          }
          onclick={handleCloseWarning}
        />
        {/* Confirm delete */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>Do you really want to delete this quiz?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.deleteItem}>
              Yes!
            </Button>
            <Button variant="primary" onClick={handleClose}>
              No!
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showWarningNoTeams} onHide={handleCloseNoTeams}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            Looks like there are not teams assigned to this quiz! Please assign
            at least two to play this quiz.
          </Modal.Body>
        </Modal>
      </div>
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
          .quiz-title {
            font-weight: 500;
          }
          .quiz-title:hover {
            font-size: 1.2rem;
            color: blue;
            cursor: pointer;
          }
          .my-div {
            padding-left: 80px;
            padding-right: 80px;
          }
        `}
      </style>
    </div>
  );
};

export default Quiz;
