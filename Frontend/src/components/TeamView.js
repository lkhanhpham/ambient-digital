import { useState, useEffect, useRef } from "react";
import { API_BASE_URL } from "../constants.ts";
import axios from "axios";
import { aqua, dark_aqua, background } from "../constants.ts";

const getAllMembers = async (id) => {
  let tmpMemberArr = [];
  await axios
    .get(`${API_BASE_URL}/api/Teams/` + id + "/")
    .then((response) => {
      for (let i = 0; i < response.data.teamMember_team.length; i++) {
        if (!tmpMemberArr.includes(response.data.teamMember_team[i])) {
          tmpMemberArr.push(response.data.teamMember_team[i].username);
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
  return tmpMemberArr;
};

const TeamView = (props) => {
  const teamId = props.teamId;
  const [memberNames, setMemberNames] = useState([]);

  useEffect(() => {
    getAllMembers(teamId).then((memberArr) => {
      setMemberNames(memberArr);
    });
  }, [teamId]);

  return (
    <>
      <div className="team-card d-flex flex-column justify-content-center m-3">
        <div className="text-dark d-flex flex-column justify-content-start align-self-center pt-3 pb-3 m-3">
          <div className="d-flex  justify-content-center">
            <h3 className="big-title text-light">{props.teamName}</h3>
          </div>
          <div className="d-flex mt-3 mb-2">
            <div>
              <span
                className=""
                style={{
                  color: background,
                  fontWeight: "600",
                }}
              >
                Members:
              </span>
            </div>
            <div>
              <span className="body-text m-2">{memberNames.join(", ")}</span>
            </div>
          </div>
          <div>
            <p
              className=""
              style={{
                color: background,
                fontWeight: "600",
              }}
            >
              Current Points:
              <span className="point body-text m-2">{props.teamPoint}</span>
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
