import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CatField from "../components/CatField";
import PlayingField from "../components/PlayingField";

// For each created quiz one quizcard is rendered
const QuizShow = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const quiz_name = location.state.title;
  const quizId = location.state.id;

  //array that stores all the question texts (index = row_index + col_index*nr_of_row)
  //array that stores the points of all the fields
  const fields = location.state.fields;
  const [cats] = useState([]);
  const [myFields] = useState([]);
  const [cols] = useState([]);
  const statusString = localStorage.getItem(quizId);
  const status = JSON.parse(statusString);

  for (let i = 0; i < fields.length; i++) {
    if (!cols.includes(fields[i].categorie_name)) {
      //console.log(fields[i].categorie_name)
      cols.push(fields[i].categorie_name);
      cats.push(<CatField category_name={fields[i].categorie_name} />);
    }
  }
  //console.log("cols", cols)

  for (let i = 0; i < cols.length; i++) {
    let rows = [];
    for (let k = 0; k < fields.length; k++) {
      if (fields[k].categorie_name === cols[i]) {
        rows.push(
          <PlayingField
            points={fields[k].point}
            id={fields[k].question.id}
            quizid={quizId}
            status1={status[k]}
            position={k}
            categorie={fields[k].categorie_name}
          />
        );
      }
      //else{
      //    question_text[k]=(fields[k].question.question_text)
      //}
      //rows.push(<Field category={fields[k].categorie_name} points={fields[k].point} chosen={true} question_text={question_text[k]} />)
    }
    myFields.push(<div className="d-flex flex-column">{rows}</div>);
  }

  return (
    <div className="container">
      <p style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>
        {quiz_name}
      </p>
      <div className="d-sm-flex justify-content-center">{cats}</div>
      <div className="d-sm-flex justify-content-center">{myFields}</div>
      <button
        className="btn btn-secondary my-4 float-end"
        onClick={() => navigate(-1)}
      >
        {" "}
        End Quiz
      </button>
    </div>
  );
};

export default QuizShow;
