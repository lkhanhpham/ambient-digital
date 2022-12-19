import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import Question from "./QuestionCard";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../constants.ts";
import AuthContext from "../context/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";

const QuestionView = () => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const [questions, setQuiz] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const getAllQuestions = async () => {
    setShow(false);
    const response = await fetch(`${API_BASE_URL}/api/question`);
    const data = await response.json();
    if (response.ok) {
      setQuiz(data);
      //console.log(questions)
    } else {
      //console.log(response.status)
      console.log("Failed Network request");
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      getAllQuestions();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const deleteItem = async (questionId) => {
    axios({
      method: "DELETE",
      url: `${API_BASE_URL}/api/question/` + questionId + "/",
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      //console.log(response.data)
    });
    window.location.reload();
  };

  const editItem = async (questionId) => {
    const response = await fetch(
      `${API_BASE_URL}/api/question/` + questionId + "/"
    );
    const data = await response.json();

    if (data.question_type === "MC") {
      navigate("/QuestionCreator/EditQuestionMC", {
        state: {
          id: questionId,
        },
      });
    } else {
      navigate("/QuestionCreator/EditQuestion", {
        state: {
          id: questionId,
        },
      });
    }
  };
  var arr = [];
  function functionOwn() {
    questions.forEach((element) => {
      if (element.author === user.user_id && questions.length > 0) {
        arr.push(element);
      } else {
      }
    });
    if (arr.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  window.onload = function () {
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }
  };

  return (
    <>
      <div className="card shadow-sm top">
        <div className="card-header d-flex justify-content-between">
          <span className="small-title float-left align-self-center">
            Questions
          </span>

          <Link to="/QuestionCreator/SC">
            <button className="btn btn-primary"> Create question</button>
          </Link>
        </div>
        <div className="card-body scrollable ">
          <div className="">
            {functionOwn() ? (
              <div className="mx-auto align-items-center justify-content-center">
                <div className="d-block">
                  {arr.map((item) => (
                    <Question
                      key={item.id}
                      question_text={
                        item.question_text.length > 20 ? (
                          <>
                            {item.question_text.substring(
                              0,
                              Math.min(item.question_text.length, 20)
                            ) + "..."}
                          </>
                        ) : (
                          <>{item.question_text}</>
                        )
                      }
                      pub_date={item.pub_date.substring(0, 10)}
                      deleteItem={() => deleteItem(item.id)}
                      editItem={() => editItem(item.id)}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <p>There are no questions yet.</p>
                <p>Create a new question or quiz to get started!</p>
              </div>
            )}
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header></Modal.Header>
            <Modal.Body>
              <div className="mx-auto align-items-center justify-content-center">
                <Spinner className="spinner" animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <span> Loading...</span>
              </div>
            </Modal.Body>
          </Modal>
        </div>
        <style jsx="true">{`
          .scrollable {
            max-height: 50vh;
            overflow-x: auto;
          }
          .top {
            margin-top: 20px;
          }
          .spinner {
          }
        `}</style>
      </div>
    </>
  );
};

export default QuestionView;
