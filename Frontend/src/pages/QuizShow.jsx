import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CatField from "../components/CatField";
import PlayingField from "../components/PlayingField";
import TeamView from "../components/TeamView";
import ModalSuccess from "../components/ModalSuccess";
import ModalQuestion from "../components/ModalQuestion";
import axios from "axios";
import { API_BASE_URL } from "../constants.ts";
import { Modal } from "react-bootstrap";
import Select from "react-select";

const getAllTeams = async (quizId) => {
  let data = [];
  let tmpoptions = [];
  await axios
    .get(`${API_BASE_URL}/api/Teams/`)
    .then((response) => {
      response.data.map((team) => {
        if (team.quiz === quizId) {
          data.push(team);
          tmpoptions.push({ value: team.id, label: team.team_name });
        }
      });
    })
    .catch((error) => {
      //   console.log(error);
    });

  return [data, tmpoptions];
};
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

const assignPointsToTeams = async (allTeams, allSelectedTeams, points) => {
  let tmpTeamArray = [...allTeams];
  tmpTeamArray.forEach((team) => {
    allSelectedTeams.forEach((assignedTeam) => {
      if (assignedTeam.label === team.team_name) {
        team.team_points = team.team_points + points;
      }
    });
  });

  return tmpTeamArray;
};

// For each created quiz one quizcard is rendered
const QuizShow = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [quiz_name, setQuiz_Name] = useState(location.state.title);
  const [quizId, setQuizId] = useState(location.state.id);
  const [fields, setFields] = useState(location.state.fields);
  const [teams, setTeams] = useState();
  const [cats, setCats] = useState([]);
  const [myFields, setMyFields] = useState([]);
  const [myTeams, setMyTeams] = useState([]);
  const statusString = localStorage.getItem(quizId);
  const [status, setStatus] = useState(JSON.parse(statusString));
  let tempStatus = JSON.parse(statusString);

  const [teamOptions, setTeamOptions] = useState([]);
  const [value, setValue] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const handleCloseSuccess = () => setShowSuccess(false);
  const handleShowSuccess = () => setShowSuccess(true);
  const [showQuestion, setShowQuestion] = useState(false);
  const handleCloseQues = () => {
    setShowQuestion(false);
    setQuestionPoint(field.point);
    setStatus(tempStatus);
    handleShowSuccess();
  };
  const handleShowQues = () => {
    setShowQuestion(true);
  };

  //a prop that is passed to ModalQuestion to show the correct question
  const [field, setField] = useState([]);

  const getQuestion = async (id) => {
    let data = [];
    await axios
      .get(`${API_BASE_URL}/api/field/` + id + "/")
      .then((response) => {
        data = response.data;
      })
      .catch((error) => {
        //   console.log(error);
      });

    return data;
  };

  const display = (position, quesId) => {
    tempStatus = status;
    if (status[position] === 0) {
      tempStatus[position] = 1;
      localStorage.setItem(quizId, JSON.stringify(tempStatus));
      // setStatus(tempStatus);
      getQuestion(quesId).then((data) => {
        setField(data);
        handleShowQues();
      });
    } else {
    }
  };

  let selectedTeams = [];
  //function to handle change in selected teams for point assignment
  const handleTypeSelect = (selected) => {
    selectedTeams = selected;
  };

  //the points that will be assigned after a question is answered
  const [questionPoints, setQuestionPoint] = useState(0);

  const sucessFunction = () => {
    assignPointsToTeams(teams, selectedTeams, questionPoints).then(
      (tmpTeam) => {
        setTeams(tmpTeam);
        setShowSuccess(false);
        postTeamsToServer(tmpTeam);
      }
    );
  };

  const postTeamsToServer = (teamToPost) => {
    teamToPost.forEach((team) => {
      axios.put(`${API_BASE_URL}/api/addTeamPoints/` + team.id + "/", {
        team_points: team.team_points,
      });
    });
  };

  const resetPoints = () => {
    teams.forEach((team) => {
      axios.put(`${API_BASE_URL}/api/addTeamPoints/` + team.id + "/", {
        team_points: 0,
      });
    });
  };
  const postUserPoint = () => {
    teams.forEach((team) => {
      team.teamMember_team.forEach((member) => {
        axios.put(`${API_BASE_URL}/api/addUserPoints/` + member.member + "/", {
          points: team.team_points,
        });
      });
    });
  };
  //when user ends quiz, current points of each team are assigned to its members, all teams' points are set to 0, then navigate to library
  const endQuiz = () => {
    postUserPoint();
    resetPoints();
    navigate(-1);
  };

  useEffect(() => {
    getAllTeams(quizId).then((teams) => {
      setTeams(teams[0]);
      setTeamOptions(teams[1]);
    });
  }, [quizId]);

  useEffect(() => {
    if (teams) {
      showTeams(teams).then((teamArray) => {
        setMyTeams(
          <div className="d-flex">
            <div className="d-flex flex-column">{teamArray[0]}</div>
            <div className="d-flex flex-column"> {teamArray[1]}</div>
          </div>
        );
      });
    }
  }, [teams]);

  useEffect(() => {
    createCatAndFields(fields, status, quizId, display).then((field) => {
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
        onClick={() => endQuiz()}
      >
        {" "}
        End Quiz
      </button>
      {showQuestion ? (
        <ModalQuestion
          show={showQuestion}
          handleClose={handleCloseQues}
          field={field}
          onclick={handleCloseQues}
        />
      ) : (
        <></>
      )}

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showSuccess}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Woo hoo! Who has got it right?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column justify-content-center">
            <p className="">
              Select one or more teams to assign points. Close this if no one's
              got the right answer.
            </p>
            <div>
              <Select
                placeholder="Select teams"
                options={teamOptions}
                onChange={handleTypeSelect}
                isMulti
                noOptionsMessage={() => "No such team found"}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-end">
            <button onClick={handleCloseSuccess} className="btn btn-primary">
              Close
            </button>
          </div>
          <div className="d-flex justify-content-end p-3">
            <button
              className="btn btn-primary"
              onClick={() => sucessFunction()}
            >
              Assign points
            </button>
          </div>
        </Modal.Footer>
      </Modal>
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
