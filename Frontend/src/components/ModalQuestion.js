import { Modal } from "react-bootstrap";
import React, { useState } from "react";
import AnswerField from "../components/AnswerField";
import QuestionImage from "../components/QuestionImage";
import AnsweroptionImage from "../components/AnsweroptionImage";
import QuestionVideo from "../components/QuestionVideo";
import Answeroptionvideo from "../components/Answeroptionvideo";
import { dark_orange, aqua, coral } from "../constants.ts";
/**
 * The component gets rendered, if you click in a quiz game on one question.
 * @param {Object} props
 * @returns ModalQuestion
 */
const ModalQuestion = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const field = props.field;
  const WholeQuestion = field.question;
  const category = field.categorie_name;
  const point = field.point;

  //   handles multiple choice questions
  function multipleChoice() {
    if (arr.length > 1) {
      return true;
    } else {
      return false;
    }
  }
  let arr = [];
  arr[0] = WholeQuestion.default_answer;
  if (WholeQuestion.question_type === "MC") {
    arr[1] = WholeQuestion.question_answer_option[0];
    arr[2] = WholeQuestion.question_answer_option[1];
    arr[3] = WholeQuestion.question_answer_option[2];
  }

  //   triggered when show solution is clicked
  //   for SC it reveals the answer for MC it colors the answers
  const handleClick = (event) => {
    var answer = document.getElementsByClassName("AnswerOption");
    if (WholeQuestion.question_type !== "MC") {
      setIsVisible((current) => !current);
    } else {
      for (var i = 0; i < answer.length; i++) {
        if (arr[i].is_correct === true) {
          answer[i].style.backgroundColor = aqua;
        } else {
          answer[i].style.backgroundColor = coral;
        }
      }
    }
  };

  arr = shuffle(arr);
  //shuffels the answeres because answer one is always right in the database
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  function AddQuestionVideos() {
    if (WholeQuestion.question_video != null) {
      return <QuestionVideo video={WholeQuestion.question_video} />;
    }
  }

  function AddAnswerVideos() {
    if (WholeQuestion.default_answer.answer_video != null) {
      return (
        <QuestionVideo video={WholeQuestion.default_answer.answer_video} />
      );
    }
  }

  return (
    //
    <>
      <Modal
        size="lg"
        aria-labelledby="success"
        centered
        show={props.show}
        onHide={props.handleClose}
        fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title id="warning">Your question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <p
              style={{
                textAlign: "center",
                fontSize: "20px",
                fontWeight: "bold",
                overflowWrap: "break-word",
                margin: "20px",
              }}
            >
              <span
                style={{
                  color: dark_orange,
                }}
              >
                {" "}
                Category {category}{" "}
              </span>
              for{" "}
              <span
                style={{
                  color: "#f2c94c",
                }}
              >
                {point}{" "}
              </span>{" "}
              points!
            </p>
            <div
              style={{
                textAlign: "center",
                fontSize: "20px",
                fontWeight: "bold",
                overflowWrap: "break-word",
                paddingTop: "20px",
                paddingBottom: "20px",
              }}
            >
              <div style={{ paddingBottom: "20px" }}>
                {WholeQuestion.question_text}
              </div>
              {WholeQuestion.question_image ? (
                <QuestionImage image={WholeQuestion.question_image} />
              ) : (
                <></>
              )}
            </div>
            <div>{AddQuestionVideos()}</div>
            <div className="d-flex justify-content-center">
              {multipleChoice() ? (
                <div className="d-flex w-100">
                  {arr.map((item) => (
                    <AnswerField
                      key={item.id}
                      answer={item.text}
                      correct={item.is_correct}
                      className="AnswerOption"
                    />
                  ))}
                </div>
              ) : (
                <div
                  id="singlechoice"
                  style={{ display: isVisible ? "inline" : "none" }}
                >
                  <AnswerField
                    key={arr[0].id}
                    answer={arr[0].text}
                    correct={arr[0].is_correct}
                  />
                  {WholeQuestion.default_answer.answer_image ? (
                    <QuestionImage
                      image={WholeQuestion.default_answer.answer_image}
                    />
                  ) : (
                    <></>
                  )}
                  {WholeQuestion.default_answer.answer_vide ? (
                    <div className="row">{AddAnswerVideos()}</div>
                  ) : (
                    <></>
                  )}
                </div>
              )}
            </div>
            <div>
              {multipleChoice() ? (
                <div className="d-flex w-100">
                  {arr.map((item) => (
                    <AnsweroptionImage image={item.answer_image} />
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>
            <div>
              {multipleChoice() ? (
                <div className="d-flex w-100">
                  {arr.map((item) => (
                    <Answeroptionvideo video={item.answer_video} />
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>

            <div>
              <button
                className="my-btn-secondary my-4 btn-lg w-100"
                id="button"
                onClick={handleClick}
              >
                {" "}
                Show Solution
              </button>
            </div>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-secondary my-4 btn-lg"
                onClick={props.handleClose}
              >
                {" "}
                Back to Quiz
              </button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalQuestion;
