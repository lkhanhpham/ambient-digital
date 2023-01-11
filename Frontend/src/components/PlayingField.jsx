import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../constants.ts";

const PlayingField = (props) => {
  return (
    <>
      <div
        onClick={props.display}
        className="card field d-flex  rounded-0 justify-content-center"
        style={{
          //white: initial state, gray: question was displayed, green: question was answered correctly, red: question was answered incorrectly
          backgroundColor:
            props.status1 == 0
              ? "white"
              : props.status1 == 1
              ? "gray"
              : props.status1 == 2
              ? "green"
              : "red",
        }}
      >
        <p className="align-self-center">{props.points}</p>
      </div>
      <style jsx="true">
        {`
          .card {
            width: 160px;
            height: 80px;
            border: solid 2px black;
          }
          .field:hover {
            cursor: pointer;
            border: solid 3px black;
          }
        `}
      </style>
    </>
  );
};
export default PlayingField;
