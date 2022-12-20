import { useState, useEffect, useContext } from "react";
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../constants.ts";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import AuthContext from "../context/AuthContext";

var dropdownV = "MC";

const QuestionForm = () => {
  const [questionText, setQuestionText] = useState("");
  const [defaultAnswer, setDefaultAnswer] = useState("");
  const [author, setAuthorId] = useState("");
  const [questionAnswerOption1, setQuestionAnswerOption1] = useState("");
  const [questionAnswerOption2, setQuestionAnswerOption2] = useState("");
  const [questionAnswerOption3, setQuestionAnswerOption3] = useState("");
  const [questionAnswerOption1b, setQuestionAnswerOption1b] = useState("false");
  const [questionAnswerOption2b, setQuestionAnswerOption2b] = useState("false");
  const [questionAnswerOption3b, setQuestionAnswerOption3b] = useState("false");
  const { user } = useContext(AuthContext);

  var visible = 0;

  const [question_image, setQuesImage] = useState(null);
  const [question_image_id, setQuesImageId] = useState(null);

  const [answer1_image, setAnsw1Image] = useState(null);
  const [answer1_image_id, setAnsw1ImageId] = useState(null);

  const [answer2_image, setAnsw2Image] = useState(null);
  const [answer2_image_id, setAnsw2ImageId] = useState(null);

  const [answer3_image, setAnsw3Image] = useState(null);
  const [answer3_image_id, setAnsw3ImageId] = useState(null);

  const [answer4_image, setAnsw4Image] = useState(null);
  const [answer4_image_id, setAnsw4ImageId] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (
      questionText.length !== 0 &&
      defaultAnswer.length !== 0 &&
      questionAnswerOption1.length !== 0 &&
      questionAnswerOption2.length !== 0 &&
      questionAnswerOption3.length !== 0 &&
      questionAnswerOption1.length !== 0
    ) {
      setShow(true);
    } else {
      setShow2(true);
    }
  };
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);

  const $ = require("jquery");
  const navigate = useNavigate();

  function createQuestionMC(event) {
    event.preventDefault();

    setAuthorId(user.user_id);

    axios({
      method: "POST",
      url: `${API_BASE_URL}/api/question/`,
      data: {
        question_text: questionText,
        question_image: question_image_id,
        author: user.user_id,
        question_type: dropdownV,
        default_answer: {
          text: defaultAnswer,
          is_correct: true,
          answer_image: answer1_image_id,
        },
        question_answer_option: [
          {
            text: questionAnswerOption1,
            is_correct: questionAnswerOption1b,
            answer_image: answer2_image_id,
          },
          {
            text: questionAnswerOption2,
            is_correct: questionAnswerOption2b,
            answer_image: answer3_image_id,
          },
          {
            text: questionAnswerOption3,
            is_correct: questionAnswerOption3b,
            answer_image: answer4_image_id,
          },
        ],
      },
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      //console.log(response.data)
    });

    event.preventDefault();
  }

  function changeQuestion(value) {
    //console.log(value)

    if (value === "SC" || value === "EQ") {
      navigate("/QuestionCreator/SC", {
        state: {
          question_text: questionText,
          default_answer: {
            text: defaultAnswer,
            is_correct: true,
          },
          question_type: value,
          author: user.user_id,
        },
      });
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

  const backHome = (event) => {
    createQuestionMC(event);
    navigate("/Library");
  };

  const nextQuestion = (event) => {
    createQuestionMC(event);
    window.location.reload();
  };

  //for comments look at QuestionForm its similar
  const onImageChange = (event) => {
    if (event.target.id === "question_image") {
      setQuesImage(event.target.files[0]);
    } else if (event.target.id === "answer1_image") {
      setAnsw1Image(event.target.files[0]);
    } else if (event.target.id === "answer2_image") {
      setAnsw2Image(event.target.files[0]);
    } else if (event.target.id === "answer3_image") {
      setAnsw3Image(event.target.files[0]);
    } else if (event.target.id === "answer4_image") {
      setAnsw4Image(event.target.files[0]);
    }
  };

  const onImageSubmit = (event) => {
    event.preventDefault();
    if (event.target.id === "questionimagesubmitButton") {
      var image = question_image;
    } else if (event.target.id === "answer1imagesubmitButton") {
      var image = answer1_image;
    } else if (event.target.id === "answer2imagesubmitButton") {
      var image = answer2_image;
    } else if (event.target.id === "answer3imagesubmitButton") {
      var image = answer3_image;
    } else if (event.target.id === "answer4imagesubmitButton") {
      var image = answer4_image;
    }
    //for comments look at QuestionForm its similar
    let data = new FormData();
    data.append("picture", image);
    data.append("name", image.name);
    data.append("author", user.user_id);
    axios({
      method: "POST",
      url: "http://localhost:8000/api/images/",
      headers: {
        "content-type": "multipart/form-data",
      },
      data,
    })
      .then((res) => {
        if (event.target.id === "questionimagesubmitButton") {
          setQuesImageId(res.data.id);
        } else if (event.target.id === "answer1imagesubmitButton") {
          setAnsw1ImageId(res.data.id);
        } else if (event.target.id === "answer2imagesubmitButton") {
          setAnsw2ImageId(res.data.id);
        } else if (event.target.id === "answer3imagesubmitButton") {
          setAnsw3ImageId(res.data.id);
        } else if (event.target.id === "answer4imagesubmitButton") {
          setAnsw4ImageId(res.data.id);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="text-dark d-flex justify-content-center align-self-center pt-3 pb-3">
        <h3 className="big-title">New Question</h3>
      </div>
      <div className="row justify-content-center">
        <div
          id="formidCustom"
          className="custom-card col-lg-6 col-md-8 p-5 bg-dark justify-content-center align-self-center"
        >
          <form className="text-light">
            <label htmlFor="type">Choose a Type: </label>
            <select
              id="selectOpt"
              name="typeSelection"
              onChange={(e) => changeQuestion(e.target.value)}
            >
              <option id="McId" value="MC">
                Multiple Choice
              </option>
              <option id="ScId" value="SC">
                Single Choice
              </option>
              <option id="EqId" value="EQ">
                Estimate Question
              </option>
            </select>
          </form>

          <form className="text-light">
            <label className="mb-2" htmlFor="exampleFormControlInput1">
              Question Text
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="New Question"
              text={questionText}
              maxLength="500"
              onChange={(e) => setQuestionText(e.target.value)}
              required
            ></input>

            <div style={{ paddingTop: "15px" }}>
              <input
                type="file"
                id="question_image"
                name="question_image"
                accept="image/png, image/jpeg"
                onChange={onImageChange}
              ></input>

              <button
                id="questionimagesubmitButton"
                type="submitImage"
                onClick={onImageSubmit}
                className="btn btn-primary"
              >
                Upload
              </button>
            </div>

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
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="New Answer"
                  text={defaultAnswer}
                  onChange={(e) => setDefaultAnswer(e.target.value)}
                  maxLength="500"
                  required
                ></input>
              </div>
            </div>

            <div style={{ paddingTop: "15px" }}>
              <input
                type="file"
                id="answer1_image"
                name="answer1_image"
                accept="image/png, image/jpeg"
                onChange={onImageChange}
              ></input>

              <button
                id="answer1imagesubmitButton"
                type="submitImage"
                onClick={onImageSubmit}
                className="btn btn-primary"
              >
                Upload
              </button>
            </div>

            <div id="containerID2" className="container2">
              <label htmlFor="exampleFormControlInput2">Choice 2</label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput2"
                  placeholder="New Answer"
                  text={defaultAnswer}
                  maxLength="500"
                  onChange={(e) => setQuestionAnswerOption1(e.target.value)}
                ></input>
                <input
                  className="right"
                  id="checkbox1"
                  type="checkbox"
                  value={questionAnswerOption1b}
                  required
                ></input>
                <label id="checkbox-value1">true</label>
              </div>
            </div>

            <div style={{ paddingTop: "15px" }}>
              <input
                type="file"
                id="answer2_image"
                name="answer2_image"
                accept="image/png, image/jpeg"
                onChange={onImageChange}
              ></input>

              <button
                id="answer2imagesubmitButton"
                type="submitImage"
                onClick={onImageSubmit}
                className="btn btn-primary"
              >
                Upload
              </button>
            </div>

            <div id="containerID3" className="container3">
              <label htmlFor="exampleFormControlInput3">Choice 3</label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput3"
                  placeholder="New Answer"
                  text={defaultAnswer}
                  maxLength="500"
                  onChange={(e) => setQuestionAnswerOption2(e.target.value)}
                ></input>
                <input
                  className="right"
                  id="checkbox2"
                  type="checkbox"
                  value={questionAnswerOption2b}
                  required
                ></input>
                <label id="checkbox-value2">true</label>
              </div>
            </div>

            <div style={{ paddingTop: "15px" }}>
              <input
                type="file"
                id="answer3_image"
                name="answer3_image"
                accept="image/png, image/jpeg"
                onChange={onImageChange}
              ></input>

              <button
                id="answer3imagesubmitButton"
                type="submitImage"
                onClick={onImageSubmit}
                className="btn btn-primary"
              >
                Upload
              </button>
            </div>

            <div id="containerID4" className="container4">
              <label htmlFor="exampleFormControlInput4">Choice 4</label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput4"
                  placeholder="New Answer"
                  text={defaultAnswer}
                  maxLength="500"
                  onChange={(e) => setQuestionAnswerOption3(e.target.value)}
                ></input>
                <input
                  className="right"
                  id="checkbox3"
                  type="checkbox"
                  value={questionAnswerOption3b}
                  required
                ></input>
                <label id="checkbox-value3">true</label>
              </div>
            </div>
          </form>

          <div style={{ paddingTop: "15px" }}>
            <input
              type="file"
              id="answer4_image"
              name="answer4_image"
              accept="image/png, image/jpeg"
              onChange={onImageChange}
            ></input>

            <button
              id="answer4imagesubmitButton"
              type="submitImage"
              onClick={onImageSubmit}
              className="btn btn-primary"
            >
              Upload
            </button>
          </div>

          <div className="d-flex justify-content-end py-4">
            <Link to="/Library">
              <button className="btn btn-secondary me-2">Cancel</button>
            </Link>

            <button
              id="submitButton"
              onClick={handleShow}
              className="btn btn-primary"
            >
              Create
            </button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>Woohoo, you created a question!</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={backHome}>
                  Close and back to overview.
                </Button>
                <Button variant="primary" onClick={nextQuestion}>
                  Create next one!
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
        .right {
          text-align: right;
        }
        .rechts-oben {
          padding: 2%;
        }
      `}</style>
    </>
  );
};

export default QuestionForm;
