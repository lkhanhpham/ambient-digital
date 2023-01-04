import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { React, useEffect, useContext } from "react";
import { API_BASE_URL } from "../constants.ts";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import AuthContext from "../context/AuthContext";
import AnswerOptionEditComp from "../components/AnswerOptionEditComp";

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
  const [questionAnswerOption1c, setQuestionAnswerOption1c] = useState(null);
  const [questionAnswerOption2c, setQuestionAnswerOption2c] = useState(null);
  const [questionAnswerOption3c, setQuestionAnswerOption3c] = useState(null);
  const [questionAnswerOption4v, setQuestionAnswerOption4v] = useState(null);
  const [questionAnswerOption2v, setQuestionAnswerOption2v] = useState(null);
  const [questionAnswerOption3v, setQuestionAnswerOption3v] = useState(null);
  const [show, setShow] = useState(false);

  const [images, setImages] = useState([]);

  const [video, setVideos] = useState([]);

  const [isShown, setIsShown] = useState(false);
  const [videoisShown, setVideoIsShown] = useState(false);

  const [invalidInput, setinvalid] = useState(false);

  const [vidSoundAnswerOption1, setVidSoundAO1] = useState(false);
  const [vidSoundQuestion, setVidSoundQues] = useState(false);
  const [vidSoundAnswerOption2, setVidSoundAO2] = useState(false);
  const [vidSoundAnswerOption3, setVidSoundAO3] = useState(false);
  const [vidSoundAnswerOption4, setVidSoundAO4] = useState(false);

  const [toLarge, setToLarge] = useState(false);
  const handleClose4 = () => setToLarge(false);

  const [questionImage, setQuestionImage] = useState(null);
  const [answer1Image, setAnswer1Image] = useState(null);
  const [answer2Image, setAnswer2Image] = useState(null);
  const [answer3Image, setAnswer3Image] = useState(null);
  const [answer4Image, setAnswer4Image] = useState(null);

  const [question_image, setQuesImage] = useState(null);
  const [question_image_id, setQuesImageId] = useState(null);

  const [questionvid, setQuestionvid] = useState(null);
  const [answer1vid, setAnswer1vid] = useState(null);
  const [answer2vid, setAnswer2vid] = useState(null);
  const [answer3vid, setAnswer3vid] = useState(null);
  const [answer4vid, setAnswer4vid] = useState(null);

  const [question_video_id, setQuesVideoId] = useState(null);
  const [answer1_video_id, setAnsw1VideoId] = useState(null);
  const [answer2_video_id, setAnsw2VideoId] = useState(null);
  const [answer3_video_id, setAnsw3VideoId] = useState(null);
  const [answer4_video_id, setAnsw4VideoId] = useState(null);

  const [answer1_image, setAnsw1Image] = useState(null);
  const [answer1_image_id, setAnsw1ImageId] = useState(null);
  const [answer2_image, setAnsw2Image] = useState(null);
  const [answer2_image_id, setAnsw2ImageId] = useState(null);
  const [answer3_image, setAnsw3Image] = useState(null);
  const [answer3_image_id, setAnsw3ImageId] = useState(null);
  const [answer4_image, setAnsw4Image] = useState(null);
  const [answer4_image_id, setAnsw4ImageId] = useState(null);
  const [btnText, setBtnText] = useState("Add Images");
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleClose2 = () => setShow2(false);
  const handleClose5 = () => {
    setinvalid(false);
    setShow2(false);
  };
  const handleShow2 = (event) => {
    uploadAll(event);
    if (
      questionText.length !== 0 &&
      defaultAnswer.length !== 0 &&
      questionAnswerOption1.length !== 0 &&
      questionAnswerOption2.length !== 0 &&
      questionAnswerOption3.length !== 0 &&
      questionAnswerOption1.length !== 0 &&
      validate(event)
    ) {
      setShow3(true);
      uploadVideoLinks(event);
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
      setQuestionAnswerOption1c(data.question_answer_option[0].answer_image);
      setQuestionAnswerOption2c(data.question_answer_option[1].answer_image);
      setQuestionAnswerOption3c(data.question_answer_option[2].answer_image);
      setQuestionAnswerOption2v(data.question_answer_option[0].answer_video);
      setQuestionAnswerOption3v(data.question_answer_option[1].answer_video);
      setQuestionAnswerOption4v(data.question_answer_option[2].answer_video);

      getAllImages();
      getAllVideos();
    } else {
      //console.log(response.status)
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

  function assignImages() {
    if (images.length === 0) {
      return;
    }
    for (let run = 0; run < images.length; run++) {
      if (images[run].id === questions.question_image) {
        setQuestionImage(images[run]);
        setQuesImageId(images[run].id);
      } else if (images[run].id === defaultAnswer.answer_image) {
        setAnswer1Image(images[run]);
        setAnsw1ImageId(images[run].id);
      } else if (images[run].id === questionAnswerOption1c) {
        setAnswer2Image(images[run]);
        setAnsw2ImageId(images[run].id);
      } else if (images[run].id === questionAnswerOption2c) {
        setAnswer3Image(images[run]);
        setAnsw3ImageId(images[run].id);
      } else if (images[run].id === questionAnswerOption3c) {
        setAnswer4Image(images[run]);
        setAnsw4ImageId(images[run].id);
      }
    }
  }
  useEffect(() => {
    assignImages(); // This will be executed when `images` state changes
  }, [images]);

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
        setAnswer1vid(video[run]);
        setAnsw1VideoId(video[run].id);
        setVidSoundAO1(video[run].sound_only);
      } else if (video[run].id === questionAnswerOption2v) {
        setAnswer2vid(video[run]);
        setAnsw2VideoId(video[run].id);
        setVidSoundAO2(video[run].sound_only);
      } else if (video[run].id === questionAnswerOption3v) {
        setAnswer3vid(video[run]);
        setAnsw3VideoId(video[run].id);
        setVidSoundAO3(video[run].sound_only);
      } else if (video[run].id === questionAnswerOption4v) {
        setAnswer4vid(video[run]);
        setAnsw4VideoId(video[run].id);
        setVidSoundAO4(video[run].sound_only);
      }
    }
  }

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
        question_video: question_video_id,
        default_answer: {
          text: defaultAnswer.text,
          is_correct: true,
          answer_image: answer1_image_id,
          answer_video: answer1_video_id,
        },
        question_type: questiontype,
        author: user.user_id,
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

  function deleteQuestion(event) {
    if (event === "delete_question_image") {
      setQuesImageId(null);
      setQuestionImage(null);
    } else if (event === "deleteAnswer1Image") {
      setAnsw1ImageId(null);
      setAnswer1Image(null);
    } else if (event === "deleteAnswer2Image") {
      setAnsw2ImageId(null);
      setAnswer2Image(null);
    } else if (event === "deleteAnswer3Image") {
      setAnsw3ImageId(null);
      setAnswer3Image(null);
    } else if (event === "deleteAnswer4Image") {
      setAnsw4ImageId(null);
      setAnswer4Image(null);
    } else if (event === "delete_question_video") {
      setQuesVideoId(null);
      setQuestionvid(null);
    } else if (event === "deleteAnswer1Video") {
      setAnsw1VideoId(null);
      setAnswer1vid(null);
    } else if (event === "deleteAnswer2Video") {
      setAnsw2VideoId(null);
      setAnswer2vid(null);
    } else if (event === "deleteAnswer3Video") {
      setAnsw3VideoId(null);
      setAnswer3vid(null);
    } else if (event === "deleteAnswer4Video") {
      setAnsw4VideoId(null);
      setAnswer4vid(null);
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
        console.log("working");
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
    for (let vid = 0; vid < 5; vid++) {
      event.preventDefault();
      var soundonly = false;
      var vidurl = null;
      if (vid === 0 && document.getElementById("questionVid") !== null) {
        vidurl = document.getElementById("questionVid").value;
        soundonly = vidSoundQuestion;
      } else if (vid === 1 && document.getElementById("answer1Vid") !== null) {
        vidurl = document.getElementById("answer1Vid").value;
        soundonly = vidSoundAnswerOption1;
      } else if (vid === 2 && document.getElementById("answer2Vid") !== null) {
        vidurl = document.getElementById("answer2Vid").value;
        soundonly = vidSoundAnswerOption2;
      } else if (vid === 3 && document.getElementById("answer3Vid") !== null) {
        vidurl = document.getElementById("answer3Vid").value;
        soundonly = vidSoundAnswerOption3;
      } else if (vid === 4 && document.getElementById("answer4Vid") !== null) {
        vidurl = document.getElementById("answer4Vid").value;
        soundonly = vidSoundAnswerOption4;
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
          answer1vid !== null &&
          vid === 1 &&
          (vidurl === null || vidurl === "") &&
          vidSoundAnswerOption1 !== answer1vid.sound_only
        ) {
          vidurl = answer1vid.link;
          soundonly = vidSoundAnswerOption1;
        } else if (
          answer2vid !== null &&
          vid === 2 &&
          (vidurl === null || vidurl === "") &&
          vidSoundAnswerOption2 !== answer2vid.sound_only
        ) {
          vidurl = answer2vid.link;
          soundonly = vidSoundAnswerOption2;
        } else if (
          answer3vid !== null &&
          vid === 3 &&
          (vidurl === null || vidurl === "") &&
          vidSoundAnswerOption3 !== answer3vid.sound_only
        ) {
          vidurl = answer3vid.link;
          soundonly = vidSoundAnswerOption3;
        } else if (
          answer4vid !== null &&
          vid === 4 &&
          (vidurl === null || vidurl === "") &&
          vidSoundAnswerOption4 !== answer4vid.sound_only
        ) {
          vidurl = answer4vid.link;
          soundonly = vidSoundAnswerOption4;
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
            >
              <option id="McId" value="MC">
                Multiple Choice
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
              <div className="pt-3">
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
                  value={defaultAnswer.text}
                  maxLength="500"
                  onChange={(e) => setdefAnswer(e.target.value, true)}
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
                    Add new Youtube link:
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
                  defaultChecked={vidSoundAnswerOption1}
                  value={vidSoundAnswerOption1}
                  onChange={(e) => setVidSoundAO1(!vidSoundAnswerOption1)}
                  required
                ></input>
                <label id="checkbox-value3">Sound only</label>
              </div>
            )}

            {answer1Image && (
              <div className="pt-3">
                <label
                  className="mb-2 text-break"
                  htmlFor="exampleFormControlInput1"
                  style={{ fontStyle: "italic" }}
                >
                  Current Image: {answer1Image.name}
                </label>
                <button
                  type="button"
                  className="btn btn-danger btn-sm float-end"
                  id="delete_answer1_image"
                  onClick={(e) => deleteQuestion(e.target.id)}
                >
                  Delete
                </button>
              </div>
            )}
            {answer1vid && (
              <div className="py-3">
                <label
                  className="mb-2"
                  htmlFor="exampleFormControlInput1"
                  style={{ fontStyle: "italic" }}
                >
                  Current Video: {answer1vid.link}
                </label>
                <button
                  type="button"
                  className="btn btn-danger btn-sm float-end"
                  id="delete_answer1_video"
                  onClick={(e) => deleteQuestion(e.target.id)}
                >
                  Delete
                </button>
              </div>
            )}

            <AnswerOptionEditComp
              questionAnswerOption={questionAnswerOption1}
              answerOptionNumber={2}
              setQuestionAnswerOption={setQuestionAnswerOption1}
              onImageChange={onImageChange}
              isShown={isShown}
              videoIsShown={videoisShown}
              vidSoundAnswerOption={vidSoundAnswerOption2}
              setVidSoundAnswerOption={setVidSoundAO2}
              answerImage={answer2Image}
              deleteQuestion={deleteQuestion}
              answerVid={answer2vid}
              questionAnswerOptionIsCorrect={questionAnswerOption1b}
              setQuestionAnswerOptionIsCorrect={setQuestionAnswerOption1b}
            ></AnswerOptionEditComp>

            <AnswerOptionEditComp
              questionAnswerOption={questionAnswerOption2}
              answerOptionNumber={3}
              setQuestionAnswerOption={setQuestionAnswerOption2}
              onImageChange={onImageChange}
              isShown={isShown}
              videoIsShown={videoisShown}
              vidSoundAnswerOption={vidSoundAnswerOption3}
              setVidSoundAnswerOption={setVidSoundAO3}
              answerImage={answer3Image}
              deleteQuestion={deleteQuestion}
              answerVid={answer3vid}
              questionAnswerOptionIsCorrect={questionAnswerOption2b}
              setQuestionAnswerOptionIsCorrect={setQuestionAnswerOption2b}
            ></AnswerOptionEditComp>

            <AnswerOptionEditComp
              questionAnswerOption={questionAnswerOption3}
              answerOptionNumber={4}
              setQuestionAnswerOption={setQuestionAnswerOption3}
              onImageChange={onImageChange}
              isShown={isShown}
              videoIsShown={videoisShown}
              vidSoundAnswerOption={vidSoundAnswerOption4}
              setVidSoundAnswerOption={setVidSoundAO4}
              answerImage={answer4Image}
              deleteQuestion={deleteQuestion}
              answerVid={answer4vid}
              questionAnswerOptionIsCorrect={questionAnswerOption3b}
              setQuestionAnswerOptionIsCorrect={setQuestionAnswerOption3b}
            ></AnswerOptionEditComp>
          </form>

          <div className="d-flex justify-content-end py-3">
            <button
              className="btn btn-secondary me-2"
              onClick={handleVideoClick}
            >
              {videobtnText}
            </button>
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
