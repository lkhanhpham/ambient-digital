import React, { Component } from "react"
import { Helmet } from "react-helmet";
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
import {
  Route,
  Routes
} from 'react-router-dom'
import QuizEdit1 from "./QuizEdit_step1";
import QuizEdit2 from "./QuizEdit_step2";

//the Library, which contains all quizes from one author, and the header are put together
class App extends Component {
  render() {
    return (
      <>
        <Helmet>
          <base href="/"></base>
        </Helmet>

        <Header />
        {/* use Router to change URL inside a SPA, the components are rendered based on the URLs */}
        <div>
          <Routes>
            <Route exact path="/" element={<Library />} />
            <Route exact path="/Library" element={<Library />} />
            <Route exact path="/QuizCreator/*" element={<QuizForm />} />
            <Route exact path="/QuestionCreator/SC" element={<QuestionForm />} />
            <Route exact path="/QuestionCreator/MC" element={<QuestionFormMC />} />
            <Route path="/QuestionCreator/NewQuestion" element={<NewQuestion />} />
            <Route path="/QuizCreator/NewQuiz1" element={<NewQuiz1 />} />
            <Route path="/QuizCreator/NewQuiz2" element={<NewQuiz2 />} />
            <Route path="/QuizCreator/NewQuiz1/CategoryCreator" element={<CategoryCreator />} />
            <Route exact path="/Quiz/*" element={<QuizShow />} />
            <Route path="/QuestionCreator/EditQuestion" element={<QuestionFormEdit />} />
            <Route path="/QuestionCreator/EditQuestionMC" element={<QuestionFormEditMC />} />
            <Route exact path="/EditQuiz1/*" element={<QuizEdit1 />} />
            <Route exact path="/EditQuiz2/*" element={<QuizEdit2 />} />
            <Route path="/EditQuiz2/CategoryCreator" element={<CategoryCreator />} />
          </Routes>
        </div>
      </>
    );
  }
}

export default App;
