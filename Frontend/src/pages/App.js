import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import Library from "./Library";
import QuizForm from "./QuizForm";
import QuestionForm from "./QuestionForm";
import NewQuestion from "./NewQuestion";
import NewQuiz1 from "./NewQuiz_step1";
import NewQuiz2 from "./NewQuiz_step1";
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
        <Route exact path="/QuizCreator/*" element={<QuizForm/>} />
        <Route exact path="/QuestionCreator/*" element={<QuestionForm/>} />
        <Route path="/QuestionCreator/NewQuestion" element={<NewQuestion/>} />
        <Route path="/QuizCreator/NewQuiz1" element={<NewQuiz1/>} />
        <Route path="/QuizCreator/NewQuiz2" element={<NewQuiz2/>} />
        </Routes>
    </div>
    </>
    );
  }
}

export default App;
