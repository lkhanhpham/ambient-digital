import React, { Component } from "react";
import Navbar from "../components/NavBar";
class Header extends Component {
    render() {
        return (
            <div className="container-fluid p-3 bg-light">
                <div className="text-dark d-flex justify-content-between align-self-end">
                    <div className="d-flex">
                        <img className="me-3" src='UserCircle.png' alt='logo' width='45' height='45'></img>
                        <h5 className="align-self-end">Username</h5>
                    </div>
                    <div className="float-right">
                        <Navbar />
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;