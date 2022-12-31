import { useState, useEffect } from "react";
import { API_BASE_URL } from "../constants.ts";
const TeamView = (props) => {
  const teamId = props.teamId;
  const [members] = useState([]);
  const [memberNames] = useState([]);
  const [value, setValue] = useState(0);
  const refresh = () => {
    // it re-renders the component
    setValue(value + 1);
  };

  const getAllMembers = async () => {
    const response = await fetch(`${API_BASE_URL}/api/Teams/` + teamId + "/");
    const data = await response.json();
    if (response.ok) {
      data.teamMember_team.map((member) => {
        if (!members.includes(member.member)) {
          members.push(member.member);
        }
      });
      getAllNames();
    } else {
      console.log("Failed Network request");
    }
  };

  const getAllNames = () => {
    console.log("id", teamId, members);
    members.forEach((member) => {
      getUserName(member);
    });
    console.log("names", teamId, memberNames);
    // refresh();
  };

  const getUserName = async (id) => {
    const response = await fetch(`${API_BASE_URL}/api/user/` + id + "/");
    const data = await response.json();
    if (response.ok) {
      if (!memberNames.includes(data.username)) {
        memberNames.push(data.username);
      }
      refresh();
    } else {
      console.log("Failed Network request");
    }
    // console.log("Names:", memberNames);
  };

  useEffect(() => {
    getAllMembers();
  }, []);

  return (
    <>
      <div className="team-card d-flex flex-column justify-content-center m-3">
        <div className="text-dark d-flex flex-column justify-content-start align-self-center pt-3 pb-3 m-3">
          <div className="d-flex  justify-content-center">
            <h3 className="big-title text-light">
              {props.teamName.toUpperCase()}
            </h3>
          </div>
          <div className="d-flex mt-3 mb-2">
            <div>
              <span>
                <b>Members:</b>
              </span>
            </div>
            <div>
              {memberNames.map((username) => (
                <span className="m-2">{username.toString()}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="body-text">
              <b>Current Points:</b>
              <span className="point m-2">{props.teamPoint}</span>
            </p>
          </div>
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
          .point {
            background-color: white;
            border: solid 1px black;
            border-radius: 0.5rem;
            padding: 5px 20px;
          }
        `}
      </style>
    </>
  );
};

export default TeamView;
