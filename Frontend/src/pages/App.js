import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import Library from "./Library";
import InitializeQuiz from "./InitializeQuiz";
import NewQuiz from "./NewQuiz";
import {
  Route,
  Routes
} from 'react-router-dom'
//the Library, which contains all quizes from one author, and the header are put together
class App extends Component {
  render(){
    return (
      <>
      <Header />
      {/* use Router to change URL inside a SPA, the components are rendered based on the URLs */}
      <div>
        <Routes>
        <Route exact path="/" element={<Library/>} />
        <Route exact path="/Library" element={<Library/>} />
        <Route exact path="/QuizCreator/*" element={<InitializeQuiz/>} />
        <Route path="/QuizCreator/NewQuiz" element={<NewQuiz/>} />
        </Routes>
    </div>
    </>
    );
  }
}

export default App;
