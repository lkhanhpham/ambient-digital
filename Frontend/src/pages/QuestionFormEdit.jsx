import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { React, useEffect } from "react";
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
  const [questiontype, setQuestionType] = useState("");
  const [show, setShow] = useState(false);
  const [btnText, setBtnText] = useState("Add Images");
  const [toLarge, setToLarge] = useState(false);
  const handleClose4 = () => setToLarge(false);

  const [images, setImages] = useState([]);

  const [isShown, setIsShown] = useState(false);

  const [questionImage, setQuestionImage] = useState(null);
  const [answerImage, setAnswerImage] = useState(null);

  const [question_image, setQuesImage] = useState(null);
  const [question_image_id, setQuesImageId] = useState(null);

  const [answer_image, setAnswImage] = useState(null);
  const [answer_image_id, setAnswImageId] = useState(null);

  const handleClose = () => setShow(false);
  const [show2, setShow2] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleClose2 = () => setShow2(false);
  const { user } = useContext(AuthContext);

  const handleShow2 = (event) => {
    uploadAll(event);
    if (questionText.length !== 0 && defaultAnswer.length !== 0) {
      //console.log("show2")
      setShow3(true);
    } else {
      setShow2(true);
    }
  };

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
      //console.log(data)
      setQuiz(data);
      setQuestionText(data.question_text);
      setDefaultAnswer(data.default_answer);
      setQuestionType(data.question_type);
      setAuthorId(user.user_id);
      getAllImages();
    } else {
      console.log("Failed Network request");
    }
  };

  const getAllImages = async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/imageauthor/` + user.user_id + "/"
    );
    const data = await response.json();
    if (response.ok) {
      setImages(data.image_author);
    } else {
      console.log("Failed Network request");
    }
  };

  function assignImages() {
    if (images.length === 0) {
      return;
    }
    for (let run = 0; run < images.length; run++) {
      if (images[run].id === questions.question_image) {
        setQuestionImage(images[run]);
        setQuesImageId(images[run].id);
      } else if (images[run].id === defaultAnswer.answer_image) {
        setAnswerImage(images[run]);
        setAnswImageId(images[run].id);
      }
    }
  }
  useEffect(() => {
    assignImages(); // This will be executed when `images` state changes
  }, [images]);

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
        question_image: question_image_id,
        default_answer: {
          text: defaultAnswer.text,
          is_correct: true,
          answer_image: answer_image_id,
        },
        question_type: questiontype,
        author: user.user_id,
      },
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      //console.log(response.data)
    });
    event.preventDefault();
    navigate(
      "/Library"
      // Update erfolgreich meldung einfügen
    );
  }

  function changeQuestion(value) {
    if (value === "MC") {
      navigate("/QuestionCreator/EditQuestionMC", {
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

  const handleClick = (event) => {
    setIsShown((current) => !current);
    if (btnText === "Add Images") {
      setBtnText("Hide Images");
    } else {
      setBtnText("Add Images");
    }
  };

  function deleteQuestion(event) {
    if (event === "delete_question_image") {
      setQuesImageId(null);
      setQuestionImage(null);
    } else if (event === "delete_answer_image") {
      setAnswImageId(null);
      setAnswerImage(null);
    }
  }

  const onImageChange = (event) => {
    if (event.target.files[0].size > 5242880) {
      setToLarge(true);
      var uploadField = document.getElementById(event.target.id);
      uploadField.value = "";
    } else {
      if (event.target.id === "question_image") {
        setQuesImage(event.target.files[0]);
      } else if (event.target.id === "answer_image") {
        setAnswImage(event.target.files[0]);
      }
    }
  };

  function uploadAll(event) {
    for (let image_nr = 0; image_nr < 2; image_nr++) {
      event.preventDefault();
      // the if assigns an image containing a constant to the variable image depending on which iteration
      if (image_nr === 0) {
        var image = question_image;
      } else if (image_nr === 1) {
        var image = answer_image;
      }
      if (image === null) {
        continue;
      }
      // creates formdata and adds all for images necessary variables to it
      let data = new FormData();
      data.append("picture", image);
      data.append("name", image.name);
      data.append("author", user.user_id);
      // posts the formdata to images interface
      axios({
        method: "POST",
        url: "http://localhost:8000/api/images/",
        headers: {
          "content-type": "multipart/form-data",
        },
        data,
      })
        .then((res) => {
          //assigns the id of the response header to a constant -> will later be used to assign this image to question/answer via foreignkey
          if (image_nr === 0) {
            setQuesImageId(res.data.id);
          }
          if (image_nr === 1) {
            setAnswImageId(res.data.id);
          }
        })
        .catch((err) => console.log(err));
    }
  }

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
            <label htmlFor="type">Choose a Type: </label>
            <select
              id="selectOpt"
              name="typeSelection"
              onChange={(e) => changeQuestion(e.target.value)}
              placeholder={questiontype}
              value={questiontype}
            >
              <option id="ScId" value="SC">
                Single Choice
              </option>
              <option id="EqId" value="EQ">
                Estimate Question
              </option>
            </select>
          </form>

          <form className="text-light">
            <label
              className="mb-2"
              htmlFor="exampleFormControlInput1"
              style={{ paddingTop: "15px" }}
            >
              Question Text
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder={questionText}
              text={questionText}
              maxLength="500"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            ></input>

            {isShown && (
              <div style={{ paddingTop: "15px" }}>
                <input
                  className="form-control"
                  type="file"
                  id="question_image"
                  name="question_image"
                  accept="image/png, image/jpeg"
                  onChange={onImageChange}
                ></input>
              </div>
            )}

            {questionImage && (
              <div className="py-3">
                <label
                  className="mb-2"
                  htmlFor="exampleFormControlInput1"
                  style={{ fontStyle: "italic" }}
                >
                  Current Image: {questionImage.name}
                </label>
                <button
                  type="button"
                  className="btn btn-danger btn-sm float-end"
                  id="delete_question_image"
                  onClick={(e) => deleteQuestion(e.target.id)}
                >
                  Delete
                </button>
              </div>
            )}

            <label
              className="mb-2"
              htmlFor="exampleFormControlInput1"
              style={{ paddingTop: "15px", fontWeight: "bold" }}
            >
              Answers:
            </label>

            <div className="container1">
              <label
                htmlFor="exampleFormControlInput1"
                style={{ paddingTop: "15px" }}
              >
                Choice 1 (has to be true)
              </label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder={defaultAnswer.text}
                  text={defaultAnswer.text}
                  maxLength="500"
                  value={defaultAnswer.text}
                  onChange={(e) => setdefAnswer(e.target.value, true)}
                ></input>
              </div>
            </div>

            {isShown && (
              <div style={{ paddingTop: "15px" }}>
                <input
                  className="form-control"
                  type="file"
                  id="answer_image"
                  name="answer_image"
                  accept="image/png, image/jpeg"
                  onChange={onImageChange}
                ></input>
              </div>
            )}

            {answerImage && (
              <div className="py-3">
                <label
                  className="mb-2"
                  htmlFor="exampleFormControlInput1"
                  style={{ fontStyle: "italic" }}
                >
                  Current Image: {answerImage.name}
                </label>
                <button
                  type="button"
                  className="btn btn-danger btn-sm float-end"
                  id="delete_answer_image"
                  onClick={(e) => deleteQuestion(e.target.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </form>

          <div className="d-flex justify-content-end py-3">
            <button className="btn btn-secondary me-2" onClick={handleClick}>
              {btnText}
            </button>
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

            {/* You forgot something. Wird nie geöffnet TODO*/}
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
            <Modal show={toLarge} onHide={handleClose4}>
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                This file is too large and will not be uploaded
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
      `}</style>
    </>
  );
};

export default QuestionFormEdit;
