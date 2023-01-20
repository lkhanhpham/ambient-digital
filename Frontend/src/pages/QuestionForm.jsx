import { useState, useEffect, useContext } from "react";
import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../constants.ts";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import AuthContext from "../context/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import { background } from "../constants.ts";
/**
 * Input form to create new quetions
 */
//initial value for dropdown questions type
var dropdownV = "x";

const QuestionForm = () => {
  const { user } = useContext(AuthContext);

  const [uploading, setUploading] = useState(false);

  const [questionText, setQuestionText] = useState("");
  const [defaultAnswer, setDefaultAnswer] = useState("");

  const [clickCreate, setClickCreate] = useState(false);
  const [uploadedQuesImage, setQuesImgUploaded] = useState(true);
  const [uploadedAnsw1Image, setAnsw1ImgUploaded] = useState(true);

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [toLarge, setToLarge] = useState(false);
  const [invalidInput, setinvalid] = useState(false);

  const [vidSoundAnswerOption1, setVidSoundAO] = useState(false);
  const [vidSoundQuestion, setVidSoundQues] = useState(false);

  const [question_image, setQuesImage] = useState(null);
  const [question_image_id, setQuesImageId] = useState(null);

  const [answer_image, setAnswImage] = useState(null);
  const [answer_image_id, setAnswImageId] = useState(null);

  const [question_video_id, setQuesVideoId] = useState(null);

  const [answer_video_id, setAnswVideoId] = useState(null);

  const [isShown, setIsShown] = useState(false);
  const [videoisShown, setVideoIsShown] = useState(false);

  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);
  const handleClose3 = () => setToLarge(false);
  const handleClose5 = () => {
    setinvalid(false);
    setShow2(false);
  };
  const handleClose6 = () => setUploading(false);

  const handleShow = (event) => {
    if (
      questionText.length !== 0 &&
      defaultAnswer.length !== 0 &&
      validate(event)
    ) {
      uploadVideoLinks(event);
      uploadAll(event);
      setClickCreate(true);
    } else {
      setShow2(true);
    }
  };
  const $ = require("jquery");
  const navigate = useNavigate();
  //create SC or EQ question and save in database
  function createQuestionSC(event) {
    if (dropdownV === "x") {
      dropdownV = "SC";
    } else {
      var e = document.getElementById("selectOpt");
      var value = e.value;
      dropdownV = value;
    }
    event.preventDefault();

    axios({
      method: "POST",
      url: `${API_BASE_URL}/api/question/`,
      data: {
        question_text: questionText,
        question_image: question_image_id,
        question_video: question_video_id,
        author: user.user_id,
        question_type: dropdownV,
        default_answer: {
          text: defaultAnswer,
          is_correct: true,
          answer_image: answer_image_id,
          answer_video: answer_video_id,
        },
      },
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      //console.log(response.data)
    });

    event.preventDefault();
  }
  //change question type and navigate to multiple choice side or just change value of questiontype
  function changeQuestion(value) {
    if (value === "MC") {
      navigate("/QuestionCreator/MC", {
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
  //add event listener to enter key to submit question on enter
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

  useEffect(() => {
    checkUploaded();
  }, [uploadedQuesImage, uploadedAnsw1Image]);

  function checkUploaded() {
    if (uploadsFinished()) {
      setUploading(false);
    } else {
      setUploading(true);
    }
  }
  function uploadsFinished() {
    if (uploadedQuesImage && uploadedAnsw1Image) {
      return true;
    } else {
      return false;
    }
  }
  useEffect(() => {
    checkFinishedUpload();
  }, [uploading, clickCreate]);

  function checkFinishedUpload() {
    if (uploading === false && uploadsFinished() && clickCreate) {
      setShow(true);
      setClickCreate(false);
    }
  }
  //create question befor gooing back to overview
  const backHome = (event) => {
    createQuestionSC(event);
    navigate("/Library");
  };

  const nextQuestion = (event) => {
    createQuestionSC(event);
    window.location.reload();
  };
  //change button text depending on video add or image add action
  const [btnText, setBtnText] = useState("Add Images");
  const handleClick = (event) => {
    setIsShown((current) => !current);
    if (btnText === "Add Images") {
      setBtnText("Hide Images");
    } else {
      setBtnText("Add Images");
    }
  };

  const [videobtnText, setvideoBtnText] = useState("Add Videos");
  const handleVideoClick = (event) => {
    setVideoIsShown((current) => !current);
    if (videobtnText === "Add Videos") {
      setvideoBtnText("Hide Videos");
    } else {
      setvideoBtnText("Add Videos");
    }
  };

  // the following is called when an image is added and safes it to a constant
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
  //upload all images
  function uploadAll(event) {
    for (let image_nr = 0; image_nr < 2; image_nr++) {
      var image = null;
      event.preventDefault();
      // the if assigns an image containing a constant to the variable image depending on which iteration
      if (
        image_nr === 0 &&
        question_image !== null &&
        question_image !== undefined
      ) {
        image = question_image;
        setQuesImgUploaded(false);
      } else if (
        image_nr === 1 &&
        answer_image !== null &&
        answer_image !== undefined
      ) {
        image = answer_image;
        setAnsw1ImgUploaded(false);
      }
      if (image === null || image === undefined) {
        continue;
      } else {
        setUploading(true);
      }
      // creates formdata and adds all for images necessary variables to it
      let data = new FormData();
      data.append("picture", image);
      data.append("name", image.name);
      data.append("author", user.user_id);
      // posts the formdata to images interface
      axios({
        method: "POST",
        url: `${API_BASE_URL}/api/images/`,
        headers: {
          "content-type": "multipart/form-data",
        },
        data,
      })
        .then((res) => {
          //assigns the id of the response header to a constant -> will later be used to assign this image to question/answer via foreignkey
          if (image_nr === 0) {
            setQuesImageId(res.data.id);
            setQuesImgUploaded(true);
          }
          if (image_nr === 1) {
            setAnswImageId(res.data.id);
            setAnsw1ImgUploaded(true);
          }
        })
        .catch((err) => console.log(err));
    }
  }
  //check if links for vidoes are valid
  function validate(event) {
    var valid = true;
    var input;
    for (let run = 0; run < 2; run++) {
      if (run === 0) {
        input = document.getElementById("question_vid");
      } else {
        input = document.getElementById("answer_vid");
      }
      if (input === null) {
      } else if (input.value === "") {
      } else if (
        input.value.includes("https://youtu.be/") ||
        input.value.includes("http://youtu.be/")
      ) {
      } else if (
        input.value.includes("https://www.youtube.com/watch?v=") ||
        input.value.includes("http://www.youtube.com/watch?v=")
      ) {
      } else {
        event.preventDefault();
        input.value = "";
        valid = false;
        setinvalid(true);
      }
    }
    return valid;
  }
  //upload links from videos
  function uploadVideoLinks(event) {
    for (let vid = 0; vid < 2; vid++) {
      event.preventDefault();
      var soundonly = false;
      var vidurl = null;
      if (vid === 0 && document.getElementById("question_vid") !== null) {
        vidurl = document.getElementById("question_vid").value;
        soundonly = vidSoundQuestion;
      } else if (vid === 1 && document.getElementById("answer_vid") !== null) {
        vidurl = document.getElementById("answer_vid").value;
        soundonly = vidSoundAnswerOption1;
      }
      // console.log(vidurl);
      if (vidurl === null || vidurl === "") {
        continue;
      }

      axios({
        method: "POST",
        url: `${API_BASE_URL}/api/video/`,
        data: {
          link: vidurl,
          author: user.user_id,
          sound_only: soundonly,
        },
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          if (vid === 0) {
            setQuesVideoId(response.data.id);
          }
          if (vid === 1) {
            setAnswVideoId(response.data.id);
          }
        })
        .catch((err) => console.log(err));

      event.preventDefault();
    }
  }

  return (
    <>
      <div className="text-dark d-flex justify-content-center align-self-center pt-3 pb-3">
        <h3 className="big-title">New Question</h3>
      </div>
      <div className="row justify-content-center">
        <div
          id="formidCustom"
          className="custom-card col-lg-6 col-md-8 p-5 justify-content-center align-self-center"
          style={{
            backgroundColor: background,
          }}
        >
          <form className="text-light mb-3">
            <label className="me-2" htmlFor="type">
              Choose a Type:{" "}
            </label>
            <select
              id="selectOpt"
              name="typeSelection"
              onChange={(e) => changeQuestion(e.target.value)}
            >
              <option id="ScId" value="SC">
                Single Choice
              </option>
              <option id="McId" value="MC">
                Multiple Choice
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
              required="required"
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
            {videoisShown && (
              <div>
                <div
                  className="input-group mb-3"
                  style={{ paddingTop: "15px" }}
                >
                  <span className="input-group-text" id="basic-addon3">
                    Add Youtube link:
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="question_vid"
                    name="question_vid"
                    aria-describedby="basic-addon3"
                  ></input>
                </div>
                <input
                  className="soundOnly"
                  id="soundbox1"
                  type="checkbox"
                  default={vidSoundQuestion}
                  value={vidSoundQuestion}
                  onChange={(e) => setVidSoundQues(!vidSoundQuestion)}
                  required
                ></input>
                <label id="checkbox-value3">Sound only</label>
              </div>
            )}

            <label className="mt-3 mb-2" htmlFor="exampleFormControlInput1">
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
                  maxLength="500"
                  onChange={(e) => setDefaultAnswer(e.target.value)}
                  required="required"
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
            {videoisShown && (
              <div>
                <div
                  className="input-group mb-3"
                  style={{ paddingTop: "15px" }}
                >
                  <span className="input-group-text" id="basic-addon3">
                    Add Youtube link:
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    id="answer_vid"
                    name="answer_vid"
                    aria-describedby="basic-addon3"
                  ></input>
                </div>
                <input
                  className="soundOnly"
                  id="soundbox2"
                  type="checkbox"
                  value={vidSoundAnswerOption1}
                  default={vidSoundAnswerOption1}
                  onChange={(e) => setVidSoundAO(!vidSoundAnswerOption1)}
                  required
                ></input>
                <label id="checkbox-value3">Sound only</label>
              </div>
            )}
          </form>

          <div className="d-flex justify-content-end py-4">
            <button
              className="my-btn-secondary me-2"
              onClick={handleVideoClick}
            >
              {videobtnText}
            </button>

            <button className="my-btn-secondary me-2" onClick={handleClick}>
              {btnText}
            </button>

            <button
              id="submitButton"
              onClick={handleShow}
              className="my-btn-primary me-2"
            >
              Create
            </button>

            <Link to="/Library">
              <button className="btn btn-secondary me-2">Cancel</button>
            </Link>

            <Modal show={show} onHide={handleClose} backdrop="static">
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
            <Modal show={toLarge} onHide={handleClose3}>
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                This file is too large and will not be uploaded
              </Modal.Body>
            </Modal>
            <Modal show={invalidInput} onHide={handleClose5}>
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>One is not a valid Youtube Link</Modal.Body>
            </Modal>
            <Modal show={uploading} onHide={handleClose6} backdrop="static">
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
