import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CatField from "../components/CatField";
import PlayingField from "../components/PlayingField";
import TeamView from "../components/TeamView";
import ModalQuestion from "../components/ModalQuestion";
import axios from "axios";
import { API_BASE_URL } from "../constants.ts";
import { Modal } from "react-bootstrap";
import Select from "react-select";

/**
 * Shows quiz in game
 * @param {integer} quizId
 * @returns QuizShow
 */

/* function that calls the api to get all teams and filters them for teams that are assigned to this quiz.
it then returns an array with all teams and an array to be used by the mutli select in the point assign modal */
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

/*function which takes the fields, the status of the fields, the quizId and a method too display the question
and returns two arrays. one has all the fields in it and the second has the categories
 */

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

/*Function that takes a teams array and creates two arrays of TeamView components which it returns
 */
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

/*function called after modal to assign points is closed which adds points to 
the teams in allTeams that are selected in allSelectedTeams and returns a new array with the updated points */
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

const QuizShow = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [quiz_name] = useState(location.state.title);
  const [quizId] = useState(location.state.id);
  const [fields] = useState(location.state.fields);
  const [teams, setTeams] = useState();
  const [cats, setCats] = useState([]);
  const [myFields, setMyFields] = useState([]);
  const [myTeams, setMyTeams] = useState([]);
  const statusString = localStorage.getItem(quizId);
  const [status, setStatus] = useState(JSON.parse(statusString));
  let tempStatus = JSON.parse(statusString);

  const [teamOptions, setTeamOptions] = useState([]);

  //useState to show or hide the point assignment modal
  const [showSuccess, setShowSuccess] = useState(false);
  const handleCloseSuccess = () => {
    createCatAndFields(fields, status, quizId, display).then((field) => {
      setMyFields(field[0]);
      setCats(field[1]);
    });
    setShowSuccess(false);
  };
  const handleShowSuccess = () => setShowSuccess(true);
  //useState to show or hide the question modal
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

  //useState to show or hide the winning team
  const [showWinner, setShowWinner] = useState(false);
  const handleCloseWinner = () => setShowWinner(false);
  const handleShowWinner = () => setShowWinner(true);

  //a prop that is passed to ModalQuestion to show the correct question
  const [field, setField] = useState([]);

  //function which calls the api for the question with id and returns the data for this question
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

  const [position, setPosition] = useState(0);
  //function which displays the clicked question and sets the status of the clicked question to 1 so it appears grey
  const display = (position, quesId) => {
    tempStatus = status;
    setPosition(position);
    if (status[position] === 0) {
      tempStatus[position] = 1;
      localStorage.setItem(quizId, JSON.stringify(tempStatus));
      setStatus(tempStatus);
      getQuestion(quesId).then((data) => {
        setField(data);
        handleShowQues();
      });
    } else {
    }
  };

  //the text shown on the button to assign points
  const [btnText, setBtnText] = useState("Assign no points");

  const [selectedTeams, setSelectedTeams] = useState([]);
  //function to handle change in selected teams for point assignment
  const handleTypeSelect = (selected) => {
    if (selected.length > 0) {
      setBtnText("Assign points");
    } else {
      setBtnText("Assign no points");
    }
    setSelectedTeams(selected);
  };

  //the points that will be assigned after a question is answered
  const [questionPoints, setQuestionPoint] = useState(0);

  const [value, setValue] = useState(0);
  const refresh = () => {
    // it re-renders the component
    setValue(value + 1);
  };
  //function called when closing the success modal which assigns the points to the team and then call postTeamsToServer
  const successFunction = () => {
    tempStatus = status;
    if (selectedTeams.length > 0) {
      //field was answered correctly
      tempStatus[position] = 2;
    } else {
      //field was answered wrong
      tempStatus[position] = 3;
    }
    setStatus(tempStatus);
    localStorage.setItem(quizId, JSON.stringify(tempStatus));
    assignPointsToTeams(teams, selectedTeams, questionPoints).then(
      (tmpTeam) => {
        setTeams(tmpTeam);
        postTeamsToServer(tmpTeam);
        setSelectedTeams([]);
      }
    );
    if (btnText === "Assign points") {
      setBtnText("Assign no points");
    }
    handleCloseSuccess();
  };

  //function which makes a put request to the database to update the team points
  const postTeamsToServer = (teamToPost) => {
    teamToPost.forEach((team) => {
      axios.put(`${API_BASE_URL}/api/TeamPoints/` + team.id + "/", {
        team_points: team.team_points,
      });
    });
  };

  //function called when ending the game which resets all team points to 0 in the database
  const resetPoints = () => {
    teams.forEach((team) => {
      axios.put(`${API_BASE_URL}/api/TeamPoints/` + team.id + "/", {
        team_points: 0,
      });
    });
  };

  //function which updates the user points in the database
  const postUserPoint = () => {
    teams.forEach((team) => {
      team.teamMember_team.forEach((member) => {
        let memberPoint = 0;
        axios
          .get(`${API_BASE_URL}/api/UserPoints/` + member.member + "/")
          .then((response) => {
            memberPoint = response.data.points;
            axios.put(`${API_BASE_URL}/api/UserPoints/` + member.member + "/", {
              points: memberPoint + team.team_points,
            });
          });
      });
    });
  };

  const [winner] = useState([]);
  const [maxPoint, setMax] = useState(-1);
  //function to determine the winner team
  const findWinner = () => {
    let max = -1;
    teams.forEach((team) => {
      if (team.team_points > max) {
        max = team.team_points;
      }
    });
    teams.forEach((team) => {
      if (team.team_points === max) {
        winner.push(team.team_name);
      }
    });
    setMax(max);
    handleShowWinner();
  };
  //when user ends quiz, current points of each team are assigned to its members, all teams' points are set to 0, winner is specified, then navigate to library
  const endQuiz = () => {
    postUserPoint();
    findWinner();
    // resetPoints();
    // navigate(-1);
  };

  const goBack = () => {
    resetPoints();
    navigate(-1);
  };

  //useEffect to update the Teams when first opening the page
  useEffect(() => {
    getAllTeams(quizId).then((teams) => {
      setTeams(teams[0]);
      setTeamOptions(teams[1]);
    });
  }, [quizId]);

  //useEffect to create or update the TeamViews/Team cards at the bottom of the page. is callend when useState teams is changed
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

  //useEffect to create/update the playing field (catagories and fields)
  useEffect(() => {
    createCatAndFields(fields, status, quizId, display).then((field) => {
      setMyFields(field[0]);
      setCats(field[1]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, fields, quizId]);

  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center">
        <p className="extra-big-title self-align-center">{quiz_name}</p>
      </div>
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
            <p className="">Select one or more teams to assign points.</p>
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
          <div className="d-flex justify-content-end p-3">
            <button
              className="my-btn-primary"
              onClick={() => successFunction()}
            >
              {btnText}
            </button>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showWinner}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Well done everyone!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column justify-content-center align-items-center">
            {winner.length > 1 ? (
              <p className="extra-big-title">Our winners are</p>
            ) : (
              <p className="extra-big-title">Our winner is</p>
            )}
            <div>
              <p className="winner big-title">{winner.join(", ")}</p>
            </div>
            <div>
              <p className="small-title">with the score of</p>
            </div>
            <div>
              <p className="point"> {maxPoint} points</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-end p-3">
            <button className="my-btn-primary" onClick={() => goBack()}>
              Back to Library
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
          .winner {
            background-color: #5b84b1;
            padding: 10px 10px;
            border-radius: 0.5rem;
            color: white;
          }
        `}
      </style>
    </div>
  );
};

export default QuizShow;
