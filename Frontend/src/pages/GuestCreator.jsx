import { useState } from "react";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import ModalSuccess from "../components/ModalSuccess";
import { API_BASE_URL } from "../constants.ts";

const GuestCreator = () => {
  const [show, setShow] = useState(false);
  //close the Category form
  const handleClose = () => setShow(false);
  //show the Category form
  const handleShow = () => setShow(true);
  const confirm = () => {
    handleShow();
  };

  const [guest, setGuest] = useState("");

  const createGuest = (event) => {
    axios({
      method: "POST",
      url: `${API_BASE_URL}/api/guestregistration/`,
      data: {
        username: guest,
        is_guest: true,
      },
      headers: { "Content-Type": "application/json" },
    }).then((response) => {});
    confirm();
    event.preventDefault();
  };

  return (
    <>
      <div className="text-dark d-flex justify-content-center align-self-center pt-3 pb-3">
        <h3 className="big-title">New Guest</h3>
      </div>
      <div className="row justify-content-center">
        <div className="custom-card col-lg-6 col-md-8 p-5 bg-dark justify-content-center align-self-center">
          <form className="text-light">
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
          </form>

          <div className="d-flex justify-content-end p-3">
            <Link to="/Library">
              <button className="btn btn-secondary me-2">Cancel</button>
            </Link>

            <button onClick={createGuest} className="btn btn-primary">
              Create
            </button>
          </div>
          {/* modal show to announce that quiz is created successfully */}
          <ModalSuccess
            showSuccess={show}
            handleCloseSuccess={handleClose}
            title={"New Guest created!"}
            body={"Guest created with name: " + guest}
            onclick={handleClose}
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
