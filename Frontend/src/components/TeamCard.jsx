import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../constants.ts";
import Select from "react-select";
import { dark_orange } from "../constants.ts";

const getAllUser = async () => {
  const response = await fetch(`${API_BASE_URL}/api/user/`);
  const data = await response.json();
  var arr = [];
  if (response.ok) {
    //console.log(data)
    data.map((user) => {
      return arr.push({ value: user.id, label: user.username });
    });
    return arr;
    // console.log(arr)
    // setUser(data)
  } else {
    //console.log(response.status)
    console.log("Failed Network request");
  }
};

const getAllMembers = async (teamId) => {
  const response = await fetch(`${API_BASE_URL}/api/Teams/` + teamId + "/");
  const data = await response.json();
  if (response.ok) {
    return data.teamMember_team;
    // console.log(data.teamMember_team)
    // setUser(data)
  } else {
    //console.log(response.status)
    console.log("Failed Network request");
  }
};

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

  const handleTypeSelect = (e) => {
    let value = Array.from(e, (option) => option.value);
    console.log(value);
    while (selectedUsers.length) {
      selectedUsers.pop();
    }
    selectedUsers.push(value);
  };

  if (userOptions.length > 0 && members.length > 0) {
    setDefaultValue();
  }

  const updateUserAndMember = (teamId) => {
    getAllUser().then((userArr) => {
      setUserOptions(userArr);
    });
    getAllMembers(teamId).then((memberArr) => {
      setMembers(memberArr);
    });
  };

  useEffect(() => {
    updateUserAndMember(teamId);

    const handleFocus = () => {
      updateUserAndMember(teamId);
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleFocus);
    };
  }, [teamId]);

  return (
    <div
      className=" d-flex flex-column justify-content-center m-2"
      style={{
        backgroundColor: dark_orange,
        width: "500px",
        height: "auto",
        borderRadius: "1rem",
      }}
    >
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
            isMulti
            noOptionsMessage={() => "No such user found"}
          />
        </div>
        <div className="pb-3">
          <button
            className="my-btn-secondary"
            onClick={() => props.selectUser(selectedUsers, teamId, teamName)}
          >
            Save
          </button>
        </div>
      </div>

      <style jsx="true">
        {`
          .delete-button:hover {
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
};

export default TeamCard;
