import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";
import ModalSuccess from "../components/ModalSuccess";
import ModalWarning from "../components/ModalWarning";
import { API_BASE_URL } from "../constants.ts";
import { background } from "../constants.ts";
/**
 * form to create guests to add them afterwards to a team
 * @returns GuestCreator
 */
const GuestCreator = () => {
  //array that stores all usernames
  const [names] = useState([]);
  const [show, setShow] = useState(false);
  const [guest, setGuest] = useState("");
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  //shows a warning if the chosen username is unavailable
  const [showWarning, setShowWarning] = useState(false);
  //close the Warning
  const handleCloseWarning = () => setShowWarning(false);
  //show the Warning
  const handleShowWarning = () => setShowWarning(true);

  //shows a warning if user hadn't typed in username
  const [showWarning1, setShowWarning1] = useState(false);
  //close the Warning
  const handleCloseWarning1 = () => setShowWarning1(false);
  //show the Warning
  const handleShowWarning1 = () => setShowWarning1(true);

  //shows a warning if the chosen username is invalid
  const [showWarning2, setShowWarning2] = useState(false);
  //close the Warning
  const handleCloseWarning2 = () => setShowWarning2(false);
  //show the Warning
  const handleShowWarning2 = () => setShowWarning2(true);

  const goBack = (event) => {
    event.preventDefault();
    navigate("../Library");
  };
  //post guest to database to save
  const createGuest = (event) => {
    console.log(names.findIndex((name) => name == guest) > -1);
    event.preventDefault();
    if (names.findIndex((name) => name === guest) > -1) {
      handleShowWarning();
    } else if (guest === "") {
      handleShowWarning1();
    } else if (guest.indexOf(" ") > -1) {
      handleShowWarning2();
    } else {
      axios({
        method: "POST",
        url: `${API_BASE_URL}/api/guestregistration/`,
        data: {
          username: guest,
          is_guest: true,
        },
        headers: { "Content-Type": "application/json" },
      });
      handleShow();
    }
  };
  //get all user to check afterwards if username is already taken
  const getAllUser = async () => {
    const response = await fetch(`${API_BASE_URL}/api/user/`);
    const data = await response.json();
    if (response.ok) {
      //console.log(data)
      data.forEach((user) => {
        names.push(user.username);
      });
    } else {
      console.log("Failed Network request");
    }
  };
  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <>
      <div className="text-dark d-flex justify-content-center align-self-center pt-3 pb-3">
        <h3 className="big-title">New Guest</h3>
      </div>
      <div className="row justify-content-center">
        <div
          className="custom-card col-lg-6 col-md-8 p-5 justify-content-center align-self-center"
          style={{
            backgroundColor: background,
          }}
        >
          <form className="text-light" onSubmit={createGuest}>
            <div className="form-group m-3">
              <label className="mb-2" htmlFor="exampleFormControlInput1">
                Guest Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="New Guest"
                text={guest}
                onChange={(e) => setGuest(e.target.value)}
              ></input>
            </div>
            <div className="d-flex justify-content-end p-3">
              <button
                type="button"
                onClick={goBack}
                className="btn btn-secondary me-2"
              >
                Cancel
              </button>
              <button type="submit" value="Create" className="my-btn-primary">
                Create
              </button>
            </div>
          </form>

          {/* modal show to announce that guest is created successfully */}
          <ModalSuccess
            showSuccess={show}
            handleCloseSuccess={handleClose}
            title={"New Guest created!"}
            body={"Guest created with name: " + guest}
            onclick={handleClose}
          />
          <ModalWarning
            showWarning={showWarning}
            handleCloseWarning={handleCloseWarning}
            title={"Username is taken."}
            body={"Please choose another name for this guest."}
            onclick={handleCloseWarning}
          />
          <ModalWarning
            showWarning={showWarning1}
            handleCloseWarning={handleCloseWarning1}
            title={"Not so fast buddy!"}
            body={"Please type in an username."}
            onclick={handleCloseWarning1}
          />
          <ModalWarning
            showWarning={showWarning2}
            handleCloseWarning={handleCloseWarning2}
            title={"Invalid username!"}
            body={"Username may not contain whitespace"}
            onclick={handleCloseWarning2}
          />
        </div>
      </div>
      <style jsx="true">{`
        label {
          font-size: 18px;
        }
        .custom-card {
          border-radius: 1rem;
        }
      `}</style>
    </>
  );
};
export default GuestCreator;
