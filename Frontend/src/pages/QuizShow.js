import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CatField from "../components/CatField";
import PlayingField from "../components/PlayingField";
import TeamView from "../components/TeamView";

// For each created quiz one quizcard is rendered
const QuizShow = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const quiz_name = location.state.title;
  const quizId = location.state.id;
  const fields = location.state.fields;
  const teams = location.state.teams;

  const [cats] = useState([]);
  const [myFields] = useState([]);
  const [myTeams] = useState([]);
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

  function showTeams() {
    const temp1 = [];
    const temp2 = [];
    for (let i = 0; i < teams.length; i++) {
      const team = teams[i];
      if (i < teams.length / 2) {
        temp1.push(
          <TeamView
            teamName={team.team_name}
            teamPoint={team.team_points}
            teamId={team.id}
          />
        );
      } else {
        temp2.push(
          <TeamView
            teamName={team.team_name}
            teamPoint={team.team_points}
            teamId={team.id}
          />
        );
      }
    }

    myTeams.push(
      <div className="d-flex">
        <div className="d-flex flex-column">{temp1}</div>
        <div className="d-flex flex-column"> {temp2}</div>
      </div>
    );
  }
  showTeams();

  return (
    <div className="container">
      <p style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>
        {quiz_name}
      </p>
      <div className="d-sm-flex justify-content-center">{cats}</div>
      <div className="d-sm-flex justify-content-center">{myFields}</div>
      <div className="mt-5 pt-5 d-flex flex-column justify-content-center">
        <h3 className="big-title align-self-center">Teams</h3>
        <div className="align-self-center">{myTeams}</div>
      </div>
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
