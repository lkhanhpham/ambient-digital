import React, { Component } from "react";
import QuizView from "../components/QuizView";
class Library extends Component {
    render() {
        return (
                <div className="container">
                <div className="text-dark d-flex justify-content-center align-self-center pt-3 pb-3">
                <h3 className="big-title">My Library</h3>
                </div> 
                <div>
                <QuizView />     
                </div> 
            </div>

        );
    }
}

export default Library;