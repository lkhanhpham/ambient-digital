import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { React, useEffect } from "react";
import { API_BASE_URL } from "../constants.ts";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import AuthContext from "../context/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import { background } from "../constants.ts";
/**
 * edit form to edit single choice and estimation questions
 *
 * @param {integer} id
 * @returns QuestionFormEdit
 */
const QuestionFormEdit = (id) => {
  const location = useLocation();
  const idQuestion = location.state.id;
  //build url for speciic question
  const url = `${API_BASE_URL}/api/question/` + idQuestion + "/";

  //constants to store question attributes
  const [questions, setQuiz] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [defaultAnswer, setDefaultAnswer] = useState("");
  const [questiontype, setQuestionType] = useState("");
  const [show, setShow] = useState(false);
  const [btnText, setBtnText] = useState("Add Images");
  const [toLarge, setToLarge] = useState(false);
  const handleClose4 = () => setToLarge(false);

  const [images, setImages] = useState([]);
  const [video, setVideos] = useState([]);

  const [isShown, setIsShown] = useState(false);
  const [videoisShown, setVideoIsShown] = useState(false);

  const [invalidInput, setinvalid] = useState(false);

  const [vidSoundAnswerOption1, setVidSoundAO] = useState(false);
  const [vidSoundQuestion, setVidSoundQues] = useState(false);

  const [questionImage, setQuestionImage] = useState(null);
  const [answerImage, setAnswerImage] = useState(null);

  const [questionvid, setQuestionvid] = useState(null);
  const [answervid, setAnswervid] = useState(null);

  const [question_image, setQuesImage] = useState(null);
  const [question_image_id, setQuesImageId] = useState(null);

  const [answer_image, setAnswImage] = useState(null);
  const [answer_image_id, setAnswImageId] = useState(null);

  const [question_video_id, setQuesVideoId] = useState(null);
  const [answer_video_id, setAnswVideoId] = useState(null);

  const [uploading, setUploading] = useState(false);

  const [clickCreate, setClickCreate] = useState(false);
  const [uploadedQuesImage, setQuesImgUploaded] = useState(true);
  const [uploadedAnsw1Image, setAnsw1ImgUploaded] = useState(true);

  //Modal handle constants
  const handleClose6 = () => setUploading(false);

  const handleClose = () => setShow(false);
  const [show2, setShow2] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleClose2 = () => setShow2(false);
  const { user } = useContext(AuthContext);
  const handleClose5 = () => {
    setinvalid(false);
    setShow2(false);
  };

  const handleShow2 = (event) => {
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
      setShow3(true);
      setClickCreate(false);
    }
  }

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
  //fetch question from backend
  const getAllQuestions = async () => {
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      //console.log(data)
      setQuiz(data);
      setQuestionText(data.question_text);
      setDefaultAnswer(data.default_answer);
      setQuestionType(data.question_type);
      //setAuthorId(user.user_id);
      getAllImages();
      getAllVideos();
    } else {
      console.log("Failed Network request");
    }
  };
  //fetch images to question from backend
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
  const getAllVideos = async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/videoauthor/` + user.user_id + "/"
    );
    const data = await response.json();
    if (response.ok) {
      setVideos(data.video_author);
    } else {
      console.log("Failed Network request");
    }
  };

  useEffect(() => {
    assignImages(); // This will be executed when `images` state changes
  }, [images]);

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
    assignVideo();
  }, [video]);

  function assignVideo() {
    if (video.length === 0) {
      return;
    }
    for (let run = 0; run < video.length; run++) {
      if (video[run].id === questions.question_video) {
        setQuestionvid(video[run]);
        setQuesVideoId(video[run].id);
        setVidSoundQues(video[run].sound_only);
      } else if (video[run].id === defaultAnswer.answer_video) {
        setAnswervid(video[run]);
        setAnswVideoId(video[run].id);
        setVidSoundAO(video[run].sound_only);
      }
    }
  }

  useEffect(() => {
    getAllQuestions();
  }, []);
  //update question in backend
  function editQuestion(event) {
    event.preventDefault();
    axios({
      method: "PUT",
      url: url,
      data: {
        question_text: questionText,
        question_image: question_image_id,
        question_video: question_video_id,
        default_answer: {
          text: defaultAnswer.text,
          is_correct: true,
          answer_image: answer_image_id,
          answer_video: answer_video_id,
        },
        question_type: questiontype,
        author: user.user_id,
      },
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      //console.log(response.data)
    });
    event.preventDefault();
    navigate("/Library");
  }
  //change question type to EQ or SC
  function changeQuestion(value) {
    if (value === "MC") {
      //following should never happen
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
  }
  function setdefAnswer(defAnswer, bDefAnswer) {
    const data = {
      text: defAnswer,
      is_correct: bDefAnswer,
    };
    setDefaultAnswer(data);
  }
  //add eventlistener to enter to submit question
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
  //handle Button text depending on image add or not
  const handleClick = (event) => {
    setIsShown((current) => !current);
    if (btnText === "Add Images") {
      setBtnText("Hide Images");
    } else {
      setBtnText("Add Images");
    }
  };
  const [videobtnText, setvideoBtnText] = useState("Edit Videos");
  const handleVideoClick = (event) => {
    setVideoIsShown((current) => !current);
    if (videobtnText === "Edit Videos") {
      setvideoBtnText("Don't Change Videos");
    } else {
      setvideoBtnText("Edit Videos");
    }
  };
  //delete question in backend
  function deleteQuestion(event) {
    if (event === "delete_question_image") {
      setQuesImageId(null);
      setQuestionImage(null);
    } else if (event === "delete_answer_image") {
      setAnswImageId(null);
      setAnswerImage(null);
    } else if (event === "delete_question_video") {
      setQuesVideoId(null);
      setQuestionvid(null);
    } else if (event === "delete_answer_video") {
      setAnswVideoId(null);
      setAnswervid(null);
    }
  }
  //chnage image in form
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
  //upload images
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
            console.log("entered");
          }
        })
        .catch((err) => console.log(err));
    }
  }
  //prove if links are valid
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
  //upload video links
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
      if (videoisShown) {
        if (
          questionvid !== null &&
          vid === 0 &&
          (vidurl === null || vidurl === "") &&
          vidSoundQuestion !== questionvid.sound_only
        ) {
          vidurl = questionvid.link;
          soundonly = vidSoundQuestion;
        } else if (
          answervid !== null &&
          vid === 1 &&
          (vidurl === null || vidurl === "") &&
          vidSoundAnswerOption1 !== answervid.sound_only
        ) {
          vidurl = answervid.link;
          soundonly = vidSoundAnswerOption1;
        } else if (vidurl === null || vidurl === "") {
          continue;
        }
      } else {
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
          //console.log(response.data);
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
        <h3 className="big-title">Edit Question</h3>
      </div>
      <div className="row justify-content-center">
        <div
          id="formidCustom"
          className="custom-card col-lg-6 col-md-8 p-5 justify-content-center align-self-center"
          style={{
            backgroundColor: background,
          }}
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
            {videoisShown && (
              <div>
                <div
                  className="input-group mb-3"
                  style={{ paddingTop: "15px" }}
                >
                  <span className="input-group-text" id="basic-addon3">
                    Add new Youtube link:
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
                  defaultChecked={vidSoundQuestion}
                  value={vidSoundQuestion}
                  onChange={(e) => setVidSoundQues(!vidSoundQuestion)}
                  required
                ></input>
                <label id="checkbox-value3">Sound only</label>
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
            {questionvid && (
              <div className="py-3">
                <label
                  className="mb-2"
                  htmlFor="exampleFormControlInput1"
                  style={{ fontStyle: "italic" }}
                >
                  Current Video: {questionvid.link}
                </label>
                <button
                  type="button"
                  className="btn btn-danger btn-sm float-end"
                  id="delete_question_video"
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
            {videoisShown && (
              <div>
                <div
                  className="input-group mb-3"
                  style={{ paddingTop: "15px" }}
                >
                  <span className="input-group-text" id="basic-addon3">
                    Add new Youtube link:
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
                  defaultChecked={vidSoundAnswerOption1}
                  value={vidSoundAnswerOption1}
                  onChange={(e) => setVidSoundAO(!vidSoundAnswerOption1)}
                  required
                ></input>
                <label id="checkbox-value3">Sound only</label>
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
            {answervid && (
              <div className="py-3">
                <label
                  className="mb-2"
                  htmlFor="exampleFormControlInput1"
                  style={{ fontStyle: "italic" }}
                >
                  Current Video: {answervid.link}
                </label>
                <button
                  type="button"
                  className="btn btn-danger btn-sm float-end"
                  id="delete_answer_video"
                  onClick={(e) => deleteQuestion(e.target.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </form>

          <div className="d-flex justify-content-end py-3">
            <button
              className="my-btn-secondary me-2"
              onClick={handleVideoClick}
            >
              {videobtnText}
            </button>
            <button className="my-btn-secondary me-2" onClick={handleClick}>
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
              className="my-btn-primary"
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
            <Modal show={show3} onHide={handleClose3} backdrop="static">
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
      `}</style>
    </>
  );
};

export default QuestionFormEdit;
