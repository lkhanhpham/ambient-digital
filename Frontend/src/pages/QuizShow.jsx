import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CatField from "../components/CatField";
import PlayingField from "../components/PlayingField";
import TeamView from "../components/TeamView";
import ModalSuccess from "../components/ModalSuccess";
import ModalQuestion from "../components/ModalQuestion";

const createCatAndFields = async (fields, status, quizId, display1) => {
  const cata = [];
  const cols = [];

  for (let i = 0; i < fields.length; i++) {
    if (!cols.includes(fields[i].categorie_name)) {
      cols.push(fields[i].categorie_name);
      cata.push(<CatField key={i} category_name={fields[i].categorie_name} />);
    }
  }

  let tmpArray = [];
  for (let i = 0; i < cols.length; i++) {
    let rows = [];
    for (let k = 0; k < fields.length; k++) {
      if (fields[k].categorie_name === cols[i]) {
        console.log("push new playing field", status[k]);
        rows.push(
          <PlayingField
            key={k}
            points={fields[k].point}
            id={fields[k].id}
            quizid={quizId}
            status1={status[k]}
            position={k}
            categorie={fields[k].categorie_name}
            display={() => display1(k, fields[k].id)}
          />
        );
      }
    }
    tmpArray.push(
      <div key={i} className="d-flex flex-column">
        {rows}
      </div>
    );
  }
  return [tmpArray, cata];
};

const showTeams = async (teams) => {
  const temp1 = [];
  const temp2 = [];

  for (let i = 0; i < teams.length; i++) {
    const team = teams[i];

    if (i % 2 === 0) {
      temp1.push(
        <TeamView
          key={team.id}
          teamName={team.team_name}
          teamPoint={team.team_points}
          teamId={team.id}
        />
      );
    } else {
      temp2.push(
        <TeamView
          key={team.id}
          teamName={team.team_name}
          teamPoint={team.team_points}
          teamId={team.id}
        />
      );
    }
  }

  return [temp1, temp2];
};
// For each created quiz one quizcard is rendered
const QuizShow = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [quiz_name, setQuiz_Name] = useState(location.state.title);
  const [quizId, setQuizId] = useState(location.state.id);
  const [fields, setFields] = useState(location.state.fields);
  const [teams, setTeams] = useState(location.state.teams);
  const [cats, setCats] = useState([]);
  const [myFields, setMyFields] = useState([]);
  const [myTeams, setMyTeams] = useState([]);
  const statusString = localStorage.getItem(quizId);
  const [status, setStatus] = useState(JSON.parse(statusString));
  let tempStatus = JSON.parse(statusString);

  const [value, setValue] = useState(0);
  const refresh = () => {
    // it re-renders the component
    setValue(value + 1);
  };

  const [showSuccess, setShowSuccess] = useState(false);
  const handleCloseSuccess = () => setShowSuccess(false);
  const handleShowSuccess = () => setShowSuccess(true);

  const [showQuestion, setShowQuestion] = useState(false);
  const handleCloseQues = () => {
    setShowQuestion(false);
    console.log("setting status to", status);
    setStatus(tempStatus);
  };
  const handleShowQues = () => {
    setShowQuestion(true);
  };
  // const[position, setPosition] = useState()
  const [quesId, setQuesId] = useState(0);

  // const display = (position, quesId) => {
  //   // event.preventDefault();
  //   // const statusString = localStorage.getItem(quizId);
  //   // const status = JSON.parse(statusString);
  //   let tempStatus = status;
  //   if (status[position] === 0) {
  //     tempStatus[position] = 1;
  //     // localStorage.setItem(quizId, JSON.stringify(status));
  //     setStatus(tempStatus);
  //     setQuesId(quesId);
  //     handleShowQues(position, quesId);
  //     // refresh();
  //   } else {
  //   }
  // };
  const display = (position, quesId) => {
    // event.preventDefault();
    // const statusString = localStorage.getItem(quizId);
    // const status = JSON.parse(statusString);
    tempStatus = status;
    console.log("alter status", status);
    if (status[position] === 0) {
      tempStatus[position] = 1;
      localStorage.setItem(quizId, JSON.stringify(tempStatus));
      // setStatus(tempStatus);
      setQuesId(quesId);
      handleShowQues();
    } else {
    }
  };

  // for (let i = 0; i < fields.length; i++) {
  //   if (!cols.includes(fields[i].categorie_name)) {
  //     //console.log(fields[i].categorie_name)
  //     cols.push(fields[i].categorie_name);
  //     cats.push(<CatField key={i} category_name={fields[i].categorie_name} />);
  //   }
  // }

  // for (let i = 0; i < cols.length; i++) {
  //   let rows = [];
  //   for (let k = 0; k < fields.length; k++) {
  //     if (fields[k].categorie_name === cols[i]) {
  //       rows.push(
  //         <PlayingField
  //           key={k}
  //           points={fields[k].point}
  //           id={fields[k].question.id}
  //           quizid={quizId}
  //           status1={status[k]}
  //           position={k}
  //           categorie={fields[k].categorie_name}
  //           display={() => display(k, fields[k].question.id)}
  //         />
  //       );
  //     }
  //   }
  //   if (myFields.length < cols.length) {
  //   myFields.push(
  //     <div key={i} className="d-flex flex-column">
  //       {rows}
  //     </div>
  //   );
  //   }
  // }

  useEffect(() => {
    showTeams(teams).then((teamArray) => {
      setMyTeams(
        <div className="d-flex">
          <div className="d-flex flex-column">{teamArray[0]}</div>
          <div className="d-flex flex-column"> {teamArray[1]}</div>
        </div>
      );
    });
  }, [teams]);

  useEffect(() => {
    createCatAndFields(fields, status, quizId, display).then((field) => {
      console.log("neu status", status);
      setMyFields(field[0]);
      setCats(field[1]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, fields, quizId]);

  return (
    <div className="container">
      <p style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>
        {quiz_name}
      </p>
      <div className="d-sm-flex justify-content-center">{cats}</div>
      <div className="d-sm-flex justify-content-center">{myFields}</div>
      <div className="mt-5 pt-5 d-flex flex-column justify-content-center">
        <h3 className="big-title align-self-center">Teams</h3>
        <div className="mt-5 mb-3 align-self-end"></div>
        <div className="align-self-center">{myTeams}</div>
      </div>
      <button
        className="btn btn-secondary my-4 float-end"
        onClick={() => navigate(-1)}
      >
        {" "}
        End Quiz
      </button>
      <ModalQuestion
        show={showQuestion}
        handleClose={handleCloseQues}
        id={quesId}
        onclick={handleCloseQues}
      />
      <ModalSuccess
        showSuccess={showSuccess}
        handleCloseSuccess={handleCloseSuccess}
        onclick={handleCloseSuccess}
        title={"Choose teams to assign points."}
        body={"Click on the checkbox to select."}
      />
      <style jsx="true">
        {`
          .clickable {
          }
          .unclickable {
            padding: 5px 10px;
            border-radius: 0.5rem;
          }
          .unclickable:hover {
            cursor: not-allowed;
          }
        `}
      </style>
    </div>
  );
};

export default QuizShow;
