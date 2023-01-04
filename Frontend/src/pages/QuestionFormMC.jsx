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

  const [vidSoundAnswerOption4, setVidSoundAO4] = useState(false);
  const [vidSoundAnswerOption3, setVidSoundAO3] = useState(false);
  const [vidSoundAnswerOption2, setVidSoundAO2] = useState(false);
  const [vidSoundAnswerOption1, setVidSoundAO1] = useState(false);
  const [vidSoundQuestion, setVidSoundQues] = useState(false);

  const [isShown, setIsShown] = useState(false);
  const [toLarge, setToLarge] = useState(false);
  const [invalidInput, setinvalid] = useState(false);
  const handleClose3 = () => setToLarge(false);
  const [btnText, setBtnText] = useState("Add Images");

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

  const [question_video_id, setQuesVideoId] = useState(null);

  const [answer1_video_id, setAnsw1VideoId] = useState(null);
  const [answer2_video_id, setAnsw2VideoId] = useState(null);
  const [answer3_video_id, setAnsw3VideoId] = useState(null);
  const [answer4_video_id, setAnsw4VideoId] = useState(null);

  const [videoisShown, setVideoIsShown] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (event) => {
    uploadAll(event);
    if (
      questionText.length !== 0 &&
      defaultAnswer.length !== 0 &&
      questionAnswerOption1.length !== 0 &&
      questionAnswerOption2.length !== 0 &&
      questionAnswerOption3.length !== 0 &&
      validate(event)
    ) {
      uploadVideoLinks(event);
      setShow(true);
    } else {
      setShow2(true);
    }
  };
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleClose5 = () => {
    setinvalid(false);
    setShow2(false);
  };

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
        question_video: question_video_id,
        author: user.user_id,
        question_type: dropdownV,
        default_answer: {
          text: defaultAnswer,
          is_correct: true,
          answer_image: answer1_image_id,
          answer_video: answer1_video_id,
        },
        question_answer_option: [
          {
            text: questionAnswerOption1,
            is_correct: questionAnswerOption1b,
            answer_image: answer2_image_id,
            answer_video: answer2_video_id,
          },
          {
            text: questionAnswerOption2,
            is_correct: questionAnswerOption2b,
            answer_image: answer3_image_id,
            answer_video: answer3_video_id,
          },
          {
            text: questionAnswerOption3,
            is_correct: questionAnswerOption3b,
            answer_image: answer4_image_id,
            answer_video: answer4_video_id,
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

  const onImageChange = (event) => {
    if (event.target.files[0].size > 5242880) {
      setToLarge(true);
      var uploadField = document.getElementById(event.target.id);
      uploadField.value = "";
    } else {
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
    }
  };
  function uploadAll(event) {
    for (let image_nr = 0; image_nr < 5; image_nr++) {
      event.preventDefault();
      // the if assigns an image containing a constant to the variable image depending on which iteration
      if (image_nr === 0) {
        var image = question_image;
      } else if (image_nr === 1) {
        var image = answer1_image;
      } else if (image_nr === 2) {
        var image = answer2_image;
      } else if (image_nr === 3) {
        var image = answer3_image;
      } else if (image_nr === 4) {
        var image = answer4_image;
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
          } else if (image_nr === 1) {
            setAnsw1ImageId(res.data.id);
          } else if (image_nr === 2) {
            setAnsw2ImageId(res.data.id);
          } else if (image_nr === 3) {
            setAnsw3ImageId(res.data.id);
          } else if (image_nr === 4) {
            setAnsw4ImageId(res.data.id);
          }
        })
        .catch((err) => console.log(err));
    }
  }
  function validate(event) {
    var valid = true;
    var input;
    for (let run = 0; run < 5; run++) {
      if (run === 0) {
        input = document.getElementById("question_vid");
      } else if (run === 1) {
        input = document.getElementById("answer1_vid");
      } else if (run === 2) {
        input = document.getElementById("answer2_vid");
      } else if (run === 3) {
        input = document.getElementById("answer3_vid");
      } else {
        input = document.getElementById("answer4_vid");
      }
      if (input === null) {
      } else if (
        input.value.includes("https://www.youtube.com/watch?v=") ||
        input.value.includes("http://www.youtube.com/watch?v=")
      ) {
      } else if (
        input.value.includes("https://youtu.be/") ||
        input.value.includes("http://youtu.be/")
      ) {
      } else if (input.value === "") {
      } else {
        event.preventDefault();
        input.value = "";
        valid = false;
        setinvalid(true);
      }
    }
    return valid;
  }
  function uploadVideoLinks(event) {
    var vidurl;
    var soundonly = false;
    for (let vid = 0; vid < 5; vid++) {
      var vidurl = null;
      var soundonly = false;
      event.preventDefault();
      if (vid === 0 && document.getElementById("question_vid") !== null) {
        vidurl = document.getElementById("question_vid").value;
        soundonly = vidSoundQuestion;
      } else if (vid === 1 && document.getElementById("answer1_vid") !== null) {
        vidurl = document.getElementById("answer1_vid").value;
        soundonly = vidSoundAnswerOption1;
      } else if (vid === 2 && document.getElementById("answer2_vid") !== null) {
        vidurl = document.getElementById("answer2_vid").value;
        soundonly = vidSoundAnswerOption2;
      } else if (vid === 3 && document.getElementById("answer3_vid") !== null) {
        vidurl = document.getElementById("answer3_vid").value;
        soundonly = vidSoundAnswerOption3;
      } else if (vid === 4 && document.getElementById("answer4_vid") !== null) {
        vidurl = document.getElementById("answer4_vid").value;
        soundonly = vidSoundAnswerOption4;
      }
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
          console.log(response.data);
          if (vid === 0) {
            setQuesVideoId(response.data.id);
          } else if (vid === 1) {
            setAnsw1VideoId(response.data.id);
          } else if (vid === 2) {
            setAnsw2VideoId(response.data.id);
          } else if (vid === 3) {
            setAnsw3VideoId(response.data.id);
          } else if (vid === 4) {
            setAnsw4VideoId(response.data.id);
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
              placeholder="New Question"
              text={questionText}
              maxLength="500"
              onChange={(e) => setQuestionText(e.target.value)}
              required
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
                  value={vidSoundQuestion}
                  default={vidSoundQuestion}
                  onChange={(e) => setVidSoundQues(!vidSoundQuestion)}
                  required
                ></input>
                <label id="checkbox-value3">Sound only</label>
              </div>
            )}

            <label
              className="mb-2"
              htmlFor="exampleFormControlInput1"
              style={{ paddingTop: "15px" }}
            >
              Answers:
            </label>

            <div className="container1" style={{ paddingTop: "15px" }}>
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

            {isShown && (
              <div style={{ paddingTop: "15px" }}>
                <input
                  className="form-control"
                  type="file"
                  id="answer1_image"
                  name="answer1_image"
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
                    id="answer1_vid"
                    name="answer1_vid"
                    aria-describedby="basic-addon3"
                  ></input>
                </div>
                <input
                  className="soundOnly"
                  id="soundbox2"
                  type="checkbox"
                  value={vidSoundAnswerOption1}
                  default={vidSoundAnswerOption1}
                  onChange={(e) => setVidSoundAO1(!vidSoundAnswerOption1)}
                  required
                ></input>
                <label id="checkbox-value3">Sound only</label>
              </div>
            )}

            <div
              id="containerID2"
              className="container2"
              style={{ paddingTop: "35px" }}
            >
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
              </div>
            </div>

            {isShown && (
              <div style={{ paddingTop: "15px" }}>
                <input
                  className="form-control"
                  type="file"
                  id="answer2_image"
                  name="answer2_image"
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
                    id="answer2_vid"
                    name="answer2_vid"
                    aria-describedby="basic-addon3"
                  ></input>
                </div>
                <input
                  className="soundOnly"
                  id="soundbox3"
                  type="checkbox"
                  value={vidSoundAnswerOption2}
                  default={vidSoundAnswerOption2}
                  onChange={(e) => setVidSoundAO2(!vidSoundAnswerOption2)}
                  required
                ></input>
                <label id="checkbox-value3">Sound only</label>
              </div>
            )}
            <input
              className="right"
              id="checkbox1"
              type="checkbox"
              value={questionAnswerOption1b}
              required
            ></input>
            <label id="checkbox-value1">Answer is correct</label>

            <div
              id="containerID3"
              className="container3"
              style={{ paddingTop: "15px" }}
            >
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
              </div>
            </div>

            {isShown && (
              <div style={{ paddingTop: "15px" }}>
                <input
                  className="form-control"
                  type="file"
                  id="answer3_image"
                  name="answer3_image"
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
                    id="answer3_vid"
                    name="answer3_vid"
                    aria-describedby="basic-addon3"
                  ></input>
                </div>
                <input
                  className="soundOnly"
                  id="soundbox4"
                  type="checkbox"
                  value={vidSoundAnswerOption3}
                  default={vidSoundAnswerOption3}
                  onChange={(e) => setVidSoundAO3(!vidSoundAnswerOption3)}
                  required
                ></input>
                <label id="checkbox-value3">Sound only</label>
              </div>
            )}

            <input
              className="right"
              id="checkbox2"
              type="checkbox"
              value={questionAnswerOption2b}
              required
            ></input>
            <label id="checkbox-value2">Answer is correct</label>

            <div
              id="containerID4"
              className="container4"
              style={{ paddingTop: "15px" }}
            >
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
              </div>
            </div>

            {isShown && (
              <div style={{ paddingTop: "15px" }}>
                <input
                  className="form-control"
                  type="file"
                  id="answer4_image"
                  name="answer4_image"
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
                    id="answer4_vid"
                    name="answer4_vid"
                    aria-describedby="basic-addon3"
                  ></input>
                </div>
                <input
                  className="soundOnly"
                  id="soundbox5"
                  type="checkbox"
                  value={vidSoundAnswerOption4}
                  default={vidSoundAnswerOption4}
                  onChange={(e) => setVidSoundAO4(!vidSoundAnswerOption4)}
                  required
                ></input>
                <label id="checkbox-value3">Sound only</label>
              </div>
            )}
            <input
              className="right"
              id="checkbox3"
              type="checkbox"
              value={questionAnswerOption3b}
              required
            ></input>
            <label id="checkbox-value3">Answer is correct</label>
          </form>

          <div className=" d-flex justify-content-end py-4">
            <button
              className="btn btn-secondary me-2"
              onClick={handleVideoClick}
            >
              {videobtnText}
            </button>
            <button className="btn btn-secondary me-2" onClick={handleClick}>
              {btnText}
            </button>

            <button
              id="submitButton"
              onClick={handleShow}
              className="btn btn-primary me-2"
            >
              Create
            </button>

            <Link to="/Library">
              <button className="btn btn-secondary me-2 ">Cancel</button>
            </Link>

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
