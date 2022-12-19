import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { React, useEffect, useContext } from "react";
import { API_BASE_URL } from "../constants.ts";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import AuthContext from "../context/AuthContext";

const QuestionFormEdit = (id) => {
  var dropdownV = "ScId";
  const location = useLocation();
  const idQuestion = location.state.id;

  const url = `${API_BASE_URL}/api/question/` + idQuestion + "/";

  const [questions, setQuiz] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [defaultAnswer, setDefaultAnswer] = useState("");
  const [author, setAuthorId] = useState("");
  const { user } = useContext(AuthContext);

  const [questiontype, setQuestionType] = useState("MC");
  const [questionAnswerOption1, setQuestionAnswerOption1] = useState("");
  const [questionAnswerOption2, setQuestionAnswerOption2] = useState("");
  const [questionAnswerOption3, setQuestionAnswerOption3] = useState("");
  const [questionAnswerOption1b, setQuestionAnswerOption1b] = useState("");
  const [questionAnswerOption2b, setQuestionAnswerOption2b] = useState("");
  const [questionAnswerOption3b, setQuestionAnswerOption3b] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleClose2 = () => setShow2(false);
  const handleShow2 = (event) => {
    if (
      questionText.length !== 0 &&
      defaultAnswer.length !== 0 &&
      questionAnswerOption1.length !== 0 &&
      questionAnswerOption2.length !== 0 &&
      questionAnswerOption3.length !== 0 &&
      questionAnswerOption1.length !== 0
    ) {
      setShow3(true);
    } else {
      setShow2(true);
    }
  };

  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);

  const $ = require("jquery");
  const navigate = useNavigate();

  function deleteItem(event) {
    event.preventDefault();
    axios({
      method: "DELETE",
      url: url,
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      //console.log(response.data)
    });

    navigate("/Library");
  }

  const getAllQuestions = async () => {
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      setQuiz(data);
      setQuestionText(data.question_text);
      setDefaultAnswer(data.default_answer);
      setAuthorId(user.user_id);
      setQuestionType(data.question_type);

      setQuestionAnswerOption1(data.question_answer_option[0].text);
      setQuestionAnswerOption2(data.question_answer_option[1].text);
      setQuestionAnswerOption3(data.question_answer_option[2].text);
      setQuestionAnswerOption1b(data.question_answer_option[0].is_correct);
      setQuestionAnswerOption2b(data.question_answer_option[1].is_correct);
      setQuestionAnswerOption3b(data.question_answer_option[2].is_correct);
    } else {
      //console.log(response.status)
      console.log("Failed Network request");
    }
  };
  useEffect(() => {
    getAllQuestions();
  }, []);
  function editQuestion(event) {
    event.preventDefault();
    axios({
      method: "PUT",
      url: url,
      data: {
        question_text: questionText,
        default_answer: defaultAnswer,
        question_type: questiontype,
        author: user.user_id,
        question_answer_option: [
          {
            text: questionAnswerOption1,
            is_correct: questionAnswerOption1b,
          },
          {
            text: questionAnswerOption2,
            is_correct: questionAnswerOption2b,
          },
          {
            text: questionAnswerOption3,
            is_correct: questionAnswerOption3b,
          },
        ],
      },
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      //console.log(response.data)
    });
    setAuthorId(1);
    event.preventDefault();
    navigate(
      "/Library"
      // Update erfolgreich meldung einfügen
    );
  }

  function changeQuestion(value) {
    if (value === "SC" || value === "EQ") {
      navigate("/QuestionCreator/EditQuestion", {
        state: {
          id: idQuestion,
          question_text: questionText,
          default_answer: {
            text: defaultAnswer.text,
            is_correct: defaultAnswer.is_correct,
          },
          question_type: value,
          author: user.user_id,
        },
      });
    } else {
      setQuestionType(value);
    }
    dropdownV = value;
  }

  $("#checkbox1").on("change", function () {
    if ($(this).is(":checked")) {
      setQuestionAnswerOption1b(true);
    } else {
      setQuestionAnswerOption1b(false);
    }
  });

  $("#checkbox2").on("change", function () {
    if ($(this).is(":checked")) {
      setQuestionAnswerOption2b(true);
    } else {
      setQuestionAnswerOption2b(false);
    }
  });

  $("#checkbox3").on("change", function () {
    if ($(this).is(":checked")) {
      setQuestionAnswerOption3b(true);
    } else {
      setQuestionAnswerOption3b(false);
    }
  });

  function setdefAnswer(defAnswer, bDefAnswer) {
    const data = {
      text: defAnswer,
      is_correct: bDefAnswer,
    };
    setDefaultAnswer(data);
  }

  const eventListener = async () => {
    var input = document.getElementById("formidCustom");
    input.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        $("#submitButton").click();
        //console.log("asyncFunktiom")
      }
    });
  };
  useEffect(() => {
    eventListener();
  }, []);

  return (
    <>
      <div className="text-dark d-flex justify-content-center align-self-center pt-3 pb-3">
        <h3 className="big-title">Edit Question</h3>
      </div>
      <div className="row justify-content-center">
        <div
          id="formidCustom"
          className="custom-card col-lg-6 col-md-8 p-5 bg-dark justify-content-center align-self-center"
        >
          <form className="text-light">
            <label for="type">Choose a Type: </label>
            <select
              id="selectOpt"
              name="typeSelection"
              onChange={(e) => changeQuestion(e.target.value)}
            >
              <option id="McId" value="MC">
                Multiple Choice
              </option>
            </select>
          </form>

          <form className="text-light">
            <label className="mb-2" htmlFor="exampleFormControlInput1">
              Question Text
            </label>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder={questionText}
              text={questionText}
              maxLength="500"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            ></input>
            <label className="mb-2" htmlFor="exampleFormControlInput1">
              Answers{" "}
            </label>

            <div className="container1">
              <label htmlFor="exampleFormControlInput1">
                Choice 1 (has to be true)
              </label>
              <div>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder={defaultAnswer.text}
                  text={defaultAnswer.text}
                  value={defaultAnswer.text}
                  maxLength="500"
                  onChange={(e) => setdefAnswer(e.target.value, true)}
                ></input>
              </div>
            </div>
            <div id="containerID2" className="container2">
              <label htmlFor="exampleFormControlInput2">Choice 2</label>
              <div>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput2"
                  placeholder={questionAnswerOption1}
                  text={questionAnswerOption1}
                  value={questionAnswerOption1}
                  maxLength="500"
                  onChange={(e) => setQuestionAnswerOption1(e.target.value)}
                ></input>
                <input
                  className="right"
                  id="checkbox1"
                  type="checkbox"
                  value={questionAnswerOption1b}
                  checked={questionAnswerOption1b}
                  onChange={(e) =>
                    setQuestionAnswerOption1b(!questionAnswerOption1b)
                  }
                ></input>
                <label id="checkbox-value1">true</label>
              </div>
            </div>
            <div id="containerID3" className="container3">
              <label htmlFor="exampleFormControlInput3">Choice 3</label>
              <div>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput3"
                  placeholder={questionAnswerOption2}
                  maxLength="500"
                  text={questionAnswerOption2}
                  value={questionAnswerOption2}
                  onChange={(e) => setQuestionAnswerOption2(e.target.value)}
                ></input>
                <input
                  className="right"
                  id="checkbox2"
                  type="checkbox"
                  value={questionAnswerOption2b}
                  checked={questionAnswerOption2b}
                  onChange={(e) =>
                    setQuestionAnswerOption2b(!questionAnswerOption2b)
                  }
                ></input>
                <label id="checkbox-value2">true</label>
              </div>
            </div>
            <div id="containerID4" className="container4">
              <label htmlFor="exampleFormControlInput4">Choice 4</label>
              <div>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput4"
                  placeholder={questionAnswerOption3}
                  text={questionAnswerOption3}
                  maxLength="500"
                  value={questionAnswerOption3}
                  onChange={(e) => setQuestionAnswerOption3(e.target.value)}
                ></input>
                <input
                  className="right"
                  id="checkbox3"
                  type="checkbox"
                  value={questionAnswerOption3b}
                  checked={questionAnswerOption3b}
                  onChange={(e) =>
                    setQuestionAnswerOption3b(!questionAnswerOption3b)
                  }
                ></input>
                <label id="checkbox-value3">true</label>
              </div>
            </div>
          </form>

          <div className="d-flex justify-content-end p-3">
            <button className="btn btn-secondary me-2" onClick={handleShow}>
              Delete
            </button>
            <Link to="/Library">
              <button className="btn btn-secondary me-2">Cancel</button>
            </Link>
            <button
              id="submitButton"
              className="btn btn-primary"
              onClick={handleShow2}
            >
              Update
            </button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                Do you really want to delete this question?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={deleteItem}>
                  Yes!
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  No!
                </Button>
              </Modal.Footer>
            </Modal>
            {/* You forgot something */}
            <Modal show={show2} onHide={handleClose2}>
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                You forgot something. Please fill in every field.
              </Modal.Body>
            </Modal>
            {/* Update Sucess */}
            <Modal show={show3} onHide={handleClose3}>
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>Your Update was sucessfull.</Modal.Body>
              <Modal.Footer>
                <Link>
                  <Button variant="primary" onClick={editQuestion}>
                    {" "}
                    Back to Libary
                  </Button>
                </Link>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        label {
          font-size: 18px;
        }
        .custom-card {
          border-radius: 1rem;
        }
      `}</style>
    </>
  );
};

export default QuestionFormEdit;
