import React, { Component } from "react";

class Header extends Component {
    render() {
        return (
            <div className="container-fluid p-3 bg-light">
                <div className="text-dark d-flex justify-content-start align-self-end">
                <img className="me-3" src = 'logo192.png' alt='logo' width = '45' height = '45'></img>
                <h5 className="align-self-end">Username</h5>
                </div>             
            </div>
        );
    }
}

export default Header;