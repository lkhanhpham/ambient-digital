import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AnswerField from "../components/AnswerField";
import QuestionImage from "../components/QuestionImage";
import AnsweroptionImage from "../components/AnsweroptionImage";

// For each created quiz one quizcard is rendered
const QuestionShow = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const WholeQuestion = location.state.question;
  const points = location.state.points;
  const categorie = location.state.categorie;
  const [isVisible, setIsVisible] = useState(false);
  var arr = [];
  arr[0] = WholeQuestion.default_answer;
  if (WholeQuestion.question_type === "MC") {
    arr[1] = WholeQuestion.question_answer_option[0];
    arr[2] = WholeQuestion.question_answer_option[1];
    arr[3] = WholeQuestion.question_answer_option[2];
  }
  arr = shuffle(arr);
  //ausbaufähig
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

  function multipleChoice() {
    if (arr.length > 1) {
      return true;
    } else {
      return false;
    }
  }
  //triggered when show solution is clicked
  // for SC it reveals the answer for MC it colors the answers
  const handleClick = (event) => {
    var answer = document.getElementsByClassName("AnswerOption");
    if (WholeQuestion.question_type !== "MC") {
      setIsVisible((current) => !current);
    } else {
      for (var i = 0; i < answer.length; i++) {
        if (arr[i].is_correct === true) {
          answer[i].style.backgroundColor = "green";
        } else {
          answer[i].style.backgroundColor = "red";
        }
      }
    }
  };

  return (
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
        Categorie {categorie} for {points} points!
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
        <div style={{ paddingBottom: "40px" }}>
          {WholeQuestion.question_text}
        </div>
        <QuestionImage image={WholeQuestion.question_image} />
      </div>
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
            <QuestionImage image={WholeQuestion.default_answer.answer_image} />
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
        <button
          className="btn btn-secondary my-4 btn-lg w-100"
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
          onClick={() => navigate(-1)}
        >
          {" "}
          Back to Quiz
        </button>
      </div>
    </div>
  );
};

export default QuestionShow;
