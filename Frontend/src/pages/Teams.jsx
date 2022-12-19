import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ModalSuccess from "../components/ModalSuccess";
import ModalWarning from "../components/ModalWarning";
import TeamCard from "../components/TeamCard";
import { API_BASE_URL } from "../constants.ts";

//create new teams

const Teams = () => {
  const location = useLocation();
  const [teamName, setTeamName] = useState("");
  const [teamPoints, setTeamPoints] = useState("");
  const quizId = location.state.quizId;
  const [User, setUser] = useState([]);
  const [UserId, setUserId] = useState([]);
  const [userName, setUserName] = useState([]);
  const [teamId, setTeamId] = useState(0);
  const [teamIds, setTeamIds] = useState([]);
  const [teamNames, setTeamNames] = useState([]);

  const [showSuccess, setShowSuccess] = useState(false);
  const handleCloseSuccess = () => setShowSuccess(false);
  const handleShowSuccess = () => setShowSuccess(true);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const confirm = () => {
    handleShow();
  };
  const [showWarning, setShowwarning] = useState(false);
  const handleShowWarning = () => setShowwarning(true);
  const handleCloseWarning = () => setShowwarning(false);

  const [showWarning1, setShowWarning1] = useState(false);
  const handleShowWarning1 = () => setShowWarning1(true);
  const handleCloseWarning1 = () => setShowWarning1(false);

  const [showWarning2, setShowWarning2] = useState(false);
  const handleShowWarning2 = () => setShowWarning2(true);
  const handleCloseWarning2 = () => setShowWarning2(false);

  //array that stores all members in all the created teams of this quiz
  const [selectedUsers] = useState([]);

  const getAllSelectedUsers = async () => {
    const response = await fetch(`${API_BASE_URL}/api/Teammates/`);
    const data = await response.json();
    while (selectedUsers.length) {
      selectedUsers.pop();
    }
    if (response.ok) {
      data.map((teammate) => {
        if (teammate.quiz === quizId) {
          const obj = { member: teammate.member, team: teammate.team };
          if (!selectedUsers.includes(obj)) {
            selectedUsers.push(obj);
          }
        }
      });
      console.log("unavail: ", selectedUsers);
      // refresh()
    } else {
      //console.log(response.status)
      console.log("Failed Network request");
    }
  };

  const selectUser = (arr, teamId, teamName) => {
    var valid = true;
    //for each member in the selected members (arr):
    arr[0].forEach((member) => {
      console.log("check this: ", member);
      //iterates through the list of all users in all teams
      selectedUsers.map((user) => {
        //if memberid exists in another team
        console.log("unavail: ", user);
        if (user.team != teamId && user.member == member) {
          //set valid = false do that member cannot be added
          valid = false;
        }
      });
    });

    if (valid) {
      const teamMember = [];
      for (let index = 0; index < arr[0].length; index++) {
        var element = { member: +arr[0][index] };
        teamMember.push(element);
      }
      console.log("send this", teamMember);
      axios({
        method: "PUT",
        url: `${API_BASE_URL}/api/Teams/` + teamId + "/",
        data: {
          id: teamId,
          team_name: teamName,
          team_points: 0,
          quiz: quizId,
          teamMember_team: teamMember.length ? teamMember : [],
        },
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        console.log(response.data);
        getAllSelectedUsers();
        refresh();
      });
      handleShowSuccess();
    } else {
      handleShowWarning();
    }
  };

  const [teams, setTeams] = useState([]);

  const getAllTeams = async () => {
    const response = await fetch(`${API_BASE_URL}/api/Teams/`);
    const data = await response.json();
    // var arr = []
    if (response.ok) {
      //console.log(data)
      data.map((team) => {
        if (team.quiz === quizId) {
          if (!teamNames.includes(team.team_name)) {
            teamNames.push(team.team_name);
            teamIds.push(team.id);
          }
        }
      });
      refresh();
    } else {
      //console.log(response.status)
      console.log("Failed Network request");
    }
  };

  const deleteItem = (teamId) => {
    axios({
      method: "DELETE",
      url: `${API_BASE_URL}/api/Teams/` + teamId + "/",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      window.location.reload();
    });
    // setTeamNames([]);
  };

  const [value, setValue] = useState(0);
  const refresh = () => {
    // it re-renders the component
    setValue(value + 1);
  };

  function createTeam(event) {
    //setTeamPoints(100)
    if (teamName === "") {
      handleShowWarning1();
    } else if (teamNames.includes(teamName)) {
      handleShowWarning2();
    } else {
      teamNames.push(teamName);
      axios({
        method: "POST",
        url: `${API_BASE_URL}/api/Teams/`,
        data: {
          team_name: teamName,
          team_points: 0,
          quiz: quizId,
        },
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        // console.log(response.data);
        //setTeamId(response.data.id);
        //teamIds.push(response.data.id);
        window.location.reload();
      });
      //confirm();
      refresh();
    }
    event.preventDefault();
  }

  function showTeams() {
    // console.log("teams length", teamNames);
    while (teams.length) {
      teams.pop();
    }
    if (teamIds.length > 0) {
      const temp1 = [];
      const temp2 = [];
      for (let i = 0; i < teamIds.length; i++) {
        if (i < teamIds.length / 2) {
          temp1.push(
            <TeamCard
              teamName={teamNames[i]}
              teamId={teamIds[i]}
              deleteItem={() => deleteItem(teamIds[i])}
              selectUser={selectUser}
              selectedUsers={selectedUsers}
            />
          );
        } else {
          temp2.push(
            <TeamCard
              teamName={teamNames[i]}
              teamId={teamIds[i]}
              deleteItem={() => deleteItem(teamIds[i])}
              selectUser={selectUser}
              selectedUsers={selectedUsers}
            />
          );
        }
      }
      teams.push(
        <div className="d-flex">
          <div className="d-flex flex-column">{temp1}</div>
          <div className="d-flex flex-column"> {temp2}</div>
        </div>
      );
      // console.log(teams)
    }

    // console.log("teams created", teams);
  }
  showTeams();

  useEffect(() => {
    getAllTeams();
    getAllSelectedUsers();
  }, []);

  return (
    <>
      <div className="text-dark d-flex justify-content-center align-self-center pt-3 pb-3">
        <h3 className="big-title">New Team</h3>
      </div>
      <div className="row justify-content-center">
        <div className="custom-card col-lg-6 col-md-8 p-5 bg-dark justify-content-center align-self-center">
          <form className="text-light">
            <label className="mb-2" htmlFor="exampleFormControlInput1">
              Team name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="New Team"
              text={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            ></input>
            <button onClick={createTeam} className="btn btn-primary">
              Create Team
            </button>
            <div></div>
          </form>
          <Link to="../../createGuest" target="_blank">
            <button className="small-button mt-3">Create member</button>
          </Link>

          <div className="d-flex justify-content-end p-3">
            <Link to="/Library">
              <button className="btn btn-secondary me-2">Cancel</button>
            </Link>
            {/* <button onClick={() => saveMember()} className="btn btn-primary">Create</button>  */}
          </div>

          <ModalWarning
            showWarning={showWarning1}
            handleCloseWarning={handleCloseWarning1}
            title={"Oops! You forgot to add a Team name"}
            body={"Choose a Team name"}
          />
          <ModalWarning
            showWarning={showWarning2}
            handleCloseWarning={handleCloseWarning2}
            title={"Oops! This Team already exists"}
            body={"Please choose another Team name"}
          />
          <ModalWarning
            showWarning={showWarning}
            handleCloseWarning={handleCloseWarning}
            title={"Cannot add members"}
            body={
              " One or some players are already in another team. Remove them and try again."
            }
          />
          <ModalSuccess
            showSuccess={show}
            handleCloseSuccess={handleClose}
            onclick={handleClose}
            title={"New team created!"}
            body={"Team created with name: " + teamName}
          />
          <ModalSuccess
            showSuccess={showSuccess}
            handleCloseSuccess={handleCloseSuccess}
            onclick={handleCloseSuccess}
            title={"Members added!"}
            body={"Your team has been saved."}
          />
          {/* <ModalSuccess showSuccess={showSuccess} title={"Finished!"} body={"Your quiz is finished and ready to be played!"} onclick={createMember} /> */}
        </div>
      </div>
      <div className="text-dark d-flex justify-content-center align-self-center pt-5 pb-3">
        <h3 className="big-title">My Teams</h3>
      </div>
      {teamNames.length > 0 ? (
        <div className="p-3 d-flex justify-content-center align-items-center mb-5">
          {teams}
        </div>
      ) : (
        <div className="p-3 d-flex justify-content-center align-items-center">
          <p>You haven't created any team for this quiz.</p>
        </div>
      )}

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

export default Teams;
