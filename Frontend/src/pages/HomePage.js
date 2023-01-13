import { Link } from "react-router-dom";
import { React, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { aqua, dark_aqua, dark_orange } from "../constants.ts";
import partypopper from "../icons/partypopper.png";
const Home = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <section
      style={{
        padding: "0 50px 0 50px",
      }}
    >
      <div className="d-flex flex-column">
        <div className="">
          {user ? (
            <>
              <div className="col-lg-6 p-3">
                <h1
                  className="big-heading"
                  style={{
                    color: dark_aqua,
                  }}
                >
                  Welcome {user.username}!
                </h1>
              </div>
            </>
          ) : (
            <div className="d-flex flex-column justiy-content-between align-items-center p-5">
              <div className="d-flex">
                <Link to="/Login">
                  <button className="btn btn-dark me-2">Login here</button>
                </Link>
                <Link to="/Registration">
                  <button className="btn btn-dark me-2">Register now</button>
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="p-3 d-flex flex-column justify-content-center align-items-center">
          <p
            className="big-title mb-3"
            style={{
              color: dark_orange,
            }}
          >
            Unleash the fun for the whole team!
          </p>
          <img
            className="mb-2"
            src={partypopper}
            alt="partypopper"
            width="100px"
            height="100px"
          ></img>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              color: aqua,
              width: "500px",
              height: "auto",
            }}
          >
            <p
              className="body-text align-self-center"
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: aqua,
                textAlign: "center",
              }}
            >
              Make your Team Event a Jeopardy Quiz! Create a customized quiz and
              play with your friends or colleagues.
            </p>
          </div>
        </div>
      </div>
      <style jsx="true">{``}</style>
    </section>
  );
};

export default Home;
