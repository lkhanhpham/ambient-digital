import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../constants.ts";
import { background } from "../constants.ts";
/**
 * creates a highscore board and display the best persons
 * @returns Leaderboard
 */
const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  //gets all users by points descending and saves it in the leaderboard variable
  const getLeaderboard = async () => {
    const response = await fetch(`${API_BASE_URL}/api/leaderboard/`);
    const data = await response.json();
    if (response.ok) {
      setLeaderboard(data);
    } else {
      console.log("Failed Network request");
    }
  };

  useEffect(() => {
    getLeaderboard();
  }, []);
  //true if data available
  function functionOwn() {
    if (leaderboard.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <>
      <div className="text-dark d-flex justify-content-center align-self-center pt-3 pb-3">
        <h3 className="big-title">Leaderboard</h3>
      </div>
      <div className="row justify-content-center">
        <div
          id="formidCustom"
          className="custom-card col-lg-6 col-md-8 p-5 justify-content-center align-self-center"
          style={{
            backgroundColor: background,
          }}
        >
          <div>
            {functionOwn() ? (
              <div
                className="row justify-content-center"
                style={{ color: "white" }}
              >
                <div style={{ marginBottom: "8px" }}>
                  <label className="col-sm-1">Pos.</label>
                  <label className="col-sm-10">Username</label>
                  <label className="col-sm-1">Points</label>
                </div>
                {leaderboard.map((player, index) => (
                  <div>
                    <label className="col-sm-1">{index + 1}.</label>
                    <label className="col-sm-10">{player.username}</label>
                    <label className="col-sm-1">{player.points}</label>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <label style={{ color: "white" }}>Loading Leaderboard...</label>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="spacer"></div>
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

export default Leaderboard;
