import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import Library from "./Library";
import QuizForm from "./QuizForm";
import NewQuiz from "./NewQuiz";
import QuestionForm from "./QuestionForm";
import NewQuestion from "./NewQuestion";
import QuestionFormEdit from "./QuestionFormEdit";
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
        <Route path="/QuizCreator/NewQuiz" element={<NewQuiz/>} />
        <Route exact path="/QuestionCreator/*" element={<QuestionForm/>} />
        <Route path="/QuestionCreator/NewQuestion" element={<NewQuestion/>} />
        <Route path="/QuestionCreator/EditQuestion" element={<QuestionFormEdit/>} />
        </Routes>
    </div>
    </>
    );
  }
}

export default App;
