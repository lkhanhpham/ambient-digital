import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../constants.ts";
import Select from "react-select";

// For each created quiz one quizcard is rendered
const TeamCard = (props) => {
  //array that stores all user options to choose from
  const [userOptions, setUserOptions] = useState([]);
  //array that stores all selected users from dropdown menu
  const [selectedUsers] = useState([]);
  //array that stores all members that were added to the team
  const [members, setMembers] = useState([]);
  //array that stores all users that were added to the team as default options
  const [defaultOptions] = useState([]);
  const teamId = props.teamId;
  const teamName = props.teamName;

  const handleTypeSelect = (e) => {
    let value = Array.from(e, (option) => option.value);
    console.log(value);
    while (selectedUsers.length) {
      selectedUsers.pop();
    }
    selectedUsers.push(value);
  };

  const getAllUser = async () => {
    const response = await fetch(`${API_BASE_URL}/api/user/`);
    const data = await response.json();
    var arr = [];
    if (response.ok) {
      //console.log(data)
      data.map((user) => {
        return arr.push({ value: user.id, label: user.username });
      });
      setUserOptions(arr);
      // console.log(arr)
      // setUser(data)
    } else {
      //console.log(response.status)
      console.log("Failed Network request");
    }
  };

  const getAllMembers = async () => {
    const response = await fetch(`${API_BASE_URL}/api/Teams/` + teamId + "/");
    const data = await response.json();
    if (response.ok) {
      setMembers(data.teamMember_team);
      // console.log(data.teamMember_team)
      // setUser(data)
    } else {
      //console.log(response.status)
      console.log("Failed Network request");
    }
  };

  const setDefaultValue = () => {
    while (defaultOptions.length) {
      defaultOptions.pop();
    }
    while (selectedUsers.length) {
      selectedUsers.pop();
    }
    members.forEach((element) => {
      const obj = userOptions.find((user) => user.value === element.member);
      // console.log(obj)
      defaultOptions.push(obj);
      selectedUsers.push(element.member);
    });
    // console.log("defaults",defaultOptions)
  };

  if (userOptions.length > 0 && members.length > 0) {
    setDefaultValue();
  }

  useEffect(() => {
    getAllUser();
    getAllMembers();
  }, []);
  return (
    <div className="team-card d-flex flex-column justify-content-center m-2">
      <div
        onClick={props.deleteItem}
        className="align-self-end p-2 delete-button"
      >
        <img
          alt="delete"
          src="/XCircle.png"
          className=""
          width="32px"
          height="32px"
        ></img>
      </div>
      <h1 className="small-title align-self-center text-light pb-3">
        {props.teamName}
      </h1>
      <div className="d-flex flex-column justify-content-center ps-3 pe-3">
        <div className="pb-3">
          <Select
            placeholder="Select users"
            defaultValue={defaultOptions}
            options={userOptions}
            onChange={handleTypeSelect}
            onClick={getAllUser}
            isMulti
            noOptionsMessage={() => "No such user found"}
          />
        </div>
        <div className="pb-3">
          <button
            className="btn btn-primary"
            onClick={() => props.selectUser(selectedUsers, teamId, teamName)}
          >
            Save
          </button>
        </div>
      </div>

      <style jsx="true">
        {`
          .team-card {
            width: 500px;
            height: auto;
            border-radius: 1rem;
            background-color: #ca6702;
          }

          .delete-button:hover {
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
};

export default TeamCard;
