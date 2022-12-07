import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import Library from "./Library";
import QuizForm from "./QuizForm";
import QuestionForm from "./QuestionForm";
import QuestionFormMC from "./QuestionFormMC";
import NewQuestion from "./NewQuestion";
import NewQuiz1 from "./NewQuiz_step1";
import NewQuiz2 from "./NewQuiz_step2";
import CategoryCreator from "./CategoryCreator";
import QuizShow from "./QuizShow"
import QuestionFormEdit from "./QuestionFormEdit";
import QuestionFormEditMC from "./QuestionFormEditMC";
import Login from "./LoginPage";
import Home from "./HomePage";
import Registration from "./RegisterPage";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";


//the Library, which contains all quizes from one author, and the header are put together
function App() {
    return (
        <div>
          <AuthProvider>
            <Header />
              <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/login" element={<Login/>} />
                <Route exact path="/Registration" element={<Registration/>} />
                <Route exact path="/Library" element={<Library/>} />
                <Route exact path="/QuizCreator/*" element={<QuizForm/>} />
                <Route exact path="/QuestionCreator/SC" element={<QuestionForm/>} />
                <Route exact path="/QuestionCreator/MC" element={<QuestionFormMC/>} />
                <Route path="/QuestionCreator/NewQuestion" element={<NewQuestion/>} />
                <Route path="/QuizCreator/NewQuiz1" element={<NewQuiz1/>} />
                <Route path="/QuizCreator/NewQuiz2" element={<NewQuiz2/>} />
                <Route path="/QuizCreator/NewQuiz1/CategoryCreator" element={<CategoryCreator/>} />
                <Route exact path="/Quiz/*" element={<QuizShow/>} />
                <Route path="/QuestionCreator/EditQuestion" element={<QuestionFormEdit/>} />
                <Route path="/QuestionCreator/EditQuestionMC" element={<QuestionFormEditMC/>} />
              </Routes>
          </AuthProvider>
      </div>
    );
  }


export default App;
