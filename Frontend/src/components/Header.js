import React, { useContext, useState } from "react";
//import Navbar from "./NavBar";
import AuthContext from "../context/AuthContext";
import UserCircle from "../icons/UserCircle.png";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

const Header = () => {
  let [showInfo1, setShowInfo1] = useState(false);
  const { user } = useContext(AuthContext);

  // {
  //   const nav = document.querySelector('Navbar.Offcanvas');
  //   let lastScrollY = window.scrollY;
  
  //   window.addEventListener("scroll", () => {
  //     if (lastScrollY < window.scrollY) {
        
  //     }  
  //     lastScrollY = window.scrollY;
  //   });
  // }

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
        <>
      {[false].map((expand) => (
        <Navbar key={expand} bg="light" expand={false} className="mb-3">
          <Container fluid>
            <Navbar.Brand href="#"></Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/">Home</Nav.Link>
                  {user ?(
                    <>
                  <Nav.Link href="Library">My Library</Nav.Link>
                  <Nav.Link href="/">Quiz-Room</Nav.Link>
                  <Nav.Link href="QuizCreator">Create Quiz</Nav.Link>
                  <Nav.Link href="QuestionCreator/SC">Create Question</Nav.Link>
                  <Nav.Link href="CategoryCreator">Create Category</Nav.Link>
                  <Nav.Link href="/">Logout</Nav.Link>
                  </>
                  ):(
                    <>
                    <Nav.Link href="Login">Login</Nav.Link>
                    <Nav.Link href="Registration">Registration</Nav.Link>
                    </> 
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
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
          
        `}
          </style>
        </Navbar>
      ))}
    </>
          
        </div>
      </div>
    </div>
  );
};

export default Header;
