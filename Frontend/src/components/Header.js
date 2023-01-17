import { React, useContext } from "react";
import AuthContext from "../context/AuthContext";
import UserCircle from "../icons/UserCircle.png";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <div className="container-fluid p-3 bg-light">
      <div className="text-dark d-flex justify-content-between align-self-end">
        <div className="d-flex">
          {user ? (
            <>
              <h5 className="align-self-end">
                {" "}
                <Link to="/">
                  <img
                    className="me-3"
                    src={UserCircle}
                    alt="logo"
                    width="45"
                    height="45"
                  ></img>
                </Link>
                <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                  Hello {user.username}
                </Link>
              </h5>
            </>
          ) : (
            <>
              <h5 className="align-self-end">
                <Link to="/">
                  <img
                    className="me-3"
                    src={UserCircle}
                    alt="logo"
                    width="45"
                    height="45"
                  ></img>
                </Link>
                Not Logged In
              </h5>
            </>
          )}
        </div>
        <div className="float-right">
          <>
            {[false].map((expand) => (
              <Navbar key={expand} bg="light" expand={false} className="mb-3">
                <Container fluid>
                  <Navbar.Toggle
                    aria-controls={`offcanvasNavbar-expand-${expand}`}
                  />
                  <Navbar.Offcanvas
                    className="NavbarSite"
                    id={`offcanvasNavbar-expand-${expand}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                    placement="end"
                  >
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title
                        className="NavTitle"
                        id={`offcanvasNavbarLabel-expand-${expand}`}
                      >
                        Menu
                      </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      <Nav className="justify-content-end flex-grow-1 pe-3">
                        <Nav.Link className="NavLink" href="/">
                          Home
                        </Nav.Link>
                        {user ? (
                          <>
                            <Nav.Link className="NavLink" href="/Library">
                              My Library
                            </Nav.Link>
                            {/* <Nav.Link href="/">Quiz-Room</Nav.Link> */}
                            <Nav.Link className="NavLink" href="/QuizCreator">
                              Create Quiz
                            </Nav.Link>
                            <Nav.Link
                              className="NavLink"
                              href="/QuestionCreator/SC"
                            >
                              Create Question
                            </Nav.Link>
                            <Nav.Link
                              className="NavLink"
                              href="/CategoryCreator"
                            >
                              Create Category
                            </Nav.Link>
                            <Nav.Link
                              className="NavLink"
                              href="/"
                              onClick={logoutUser}
                            >
                              Logout
                            </Nav.Link>
                          </>
                        ) : (
                          <>
                            <Nav.Link className="NavLink" href="Login">
                              Login
                            </Nav.Link>
                            <Nav.Link className="NavLink" href="Registration">
                              Registration
                            </Nav.Link>
                          </>
                        )}
                      </Nav>
                    </Offcanvas.Body>
                  </Navbar.Offcanvas>
                </Container>
                <style jsx="true">
                  {`
                    .NavLink {
                      font-weight: 500;
                      cursor: pointer;
                      text-align: right;
                      color: #aaadb6;
                      margin: 0;
                      font-size: 1.5rem;
                    }
                    .NavTitle {
                      font-size: 2rem;
                    }
                    .NavLink:hover {
                      color: #ca6702;
                      cursor: pointer;
                    }
                    .NavbarSite {
                      width: auto !important;
                      padding: 25px;
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
