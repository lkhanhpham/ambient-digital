import React, { useContext } from "react";
import Navbar from "./NavBar";
import AuthContext from "../context/AuthContext";
import UserCircle from "../icons/UserCircle.png";

const Header = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="container-fluid p-3 bg-light">
      <div className="text-dark d-flex justify-content-between align-self-end">
        <div className="d-flex">
          <img
            className="me-3"
            src={UserCircle}
            alt="logo"
            width="45"
            height="45"
          ></img>

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
          <Navbar />
        </div>
      </div>
    </div>
  );
};

export default Header;
