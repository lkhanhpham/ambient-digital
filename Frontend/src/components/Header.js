import React, { useContext, useState } from "react";
import Navbar from "./NavBar";
import AuthContext from "../context/AuthContext";
import UserCircle from "../icons/UserCircle.png";
import { Link } from "react-router-dom";

const Header = () => {
  let [showInfo1, setShowInfo1] = useState(false);
  const { user } = useContext(AuthContext);
  return (
    <div className="container-fluid p-3 bg-light">
      <div className="text-dark d-flex justify-content-between align-self-end">
        <div className="d-flex">
          <Link to="/">
            <img
              className="me-3"
              src={UserCircle}
              alt="logo"
              width="45"
              height="45"
            ></img>
          </Link>

          {user ? (
            <>
              <h5 className="align-self-end">Hello {user.username}</h5>
            </>
          ) : (
            <>
              <h5 className="align-self-end">Not Logged In</h5>
            </>
          )}
        </div>
        <div className="float-right">
          <Navbar
            show={showInfo1}
            onClickOutside={() => {
              setShowInfo1(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
