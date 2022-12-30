import React, { useState, useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

//building the navbar for the webiste, which includes links for the home, projekt, statistics, about us and impressum site,
// to navigate through the webiste

const Navbar = () => {
  const [navActive, setNavActive] = useState(null);
  const { user, logoutUser } = useContext(AuthContext);

  //enable hidden navbar
  {
    const nav = document.querySelector('nav_menu-bar');
    let lastScrollY = window.scrollY;
  
    window.addEventListener("scroll", () => {
      if (lastScrollY < window.scrollY) {
        setNavActive(!navActive)
      }  
      lastScrollY = window.scrollY;
    });
  }

  return (
    <>
      <div onClick={() => setNavActive(!navActive)} className={`nav__menu-bar`}>
        <div></div>
        <div></div>
        <div></div>
      </div>

     
      <div
        className={`${
          navActive ? "active" : ""
        } nav__menu-list bg-light center`}
      >
        <Link to="/" onClick={() => setNavActive(!navActive)}>
          Home
        </Link>

        {user ? (
          <>
            <Link to="/Library" onClick={() => setNavActive(!navActive)}>
              My Library
            </Link>
            <Link to="/" onClick={() => setNavActive(!navActive)}>
              Quiz-Room
            </Link>
            <Link to="/QuizCreator" onClick={() => setNavActive(!navActive)}>
              Create Quiz
            </Link>
            <Link
              to="/QuestionCreator/SC"
              onClick={() => setNavActive(!navActive)}
            >
              Create Question
            </Link>
            <Link
              to="/CategoryCreator"
              onClick={() => setNavActive(!navActive)}
            >
              Create Categories
            </Link>
            <Link to="/" onClick={logoutUser}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/Login" onClick={() => setNavActive(!navActive)}>
              Login
            </Link>
            <Link to="/Registration" onClick={() => setNavActive(!navActive)}>
              Registration
            </Link>
          </>
        )}
      </div>
      <style jsx="true">
        {`
          Link {
            color: #aaadb6;
            text-align: right;
          }
          .nav__item:hover {
            font-weight: bold;
            color: black;
            cursor: pointer;
          }
          .active {
            font-weight: bold;
            color: #fca311;
          }
          a {
            text-decoration: none;
            color: inherit;
          }
          .hidden {
            display: flex;
            flex-direction: column;
            position: fixed;
            z-index: 1;
            top: 70px;
            width: 288px;
            row-gap: 36px;
            right: -288px;
            padding-right: 16px;
            transition: all 0.2s;
            height: 100vh;
          }
          .nav__menu-bar {
            width: 40px;
            display: flex;
            flex-direction: column;
            row-gap: 6px;
            cursor: pointer;
          }
          .nav__menu-bar div {
            width: 40px;
            height: 4px;
            margin-right: 5px;
            background-color: black;
            border-radius: 2px;
          }
          .nav__menu-list {
            display: flex;
            flex-direction: column;
            position: fixed;
            z-index: 1;
            top: 70px;
            width: 288px;
            row-gap: 36px;
            right: -288px;
            padding-right: 16px;
            transition: all 0.2s;
            height: 100vh;
          }
          .nav__menu-list.active {
            right: 0;
          }

          .center {
            min-height: 600px;
            display: flex;
            // justify-content: start;
            align-items: center;
          }
          //   @media screen and (min-width: 768px) {
          //     .nav__menu-bar{
          //       display: none;

          //     }
          .nav__menu-list {
            position: unset;
            flex-direction: row;
            min-height: fit-content;
            width: fit-content;
            column-gap: 24px;
            align-items: center;
          }
          h1 {
            color: #f2f2f2;
          }
        `}
      </style>
    </>
  );
};

export default Navbar;
