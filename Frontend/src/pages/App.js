import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import Library from "./Library";
import QuizForm from "./QuizForm";
import Teams from "./Teams";
import QuestionForm from "./QuestionForm";
import QuestionFormMC from "./QuestionFormMC";
import NewQuiz1 from "./NewQuiz_step1";
import NewQuiz2 from "./NewQuiz_step2";
import CategoryCreator from "./CategoryCreator";
import QuizShow from "./QuizShow";
import QuestionFormEdit from "./QuestionFormEdit";
import QuestionFormEditMC from "./QuestionFormEditMC";
import GuestCreator from "./GuestCreator";
import Login from "./LoginPage";
import Home from "./HomePage";
import Registration from "./RegisterPage";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { ProtectedRoute } from "../components/ProtectedRoute";
import QuizEdit1 from "./QuizEdit_step1";
import QuizEdit2 from "./QuizEdit_step2";
import QuizEdit3 from "./QuizEdit_step3";
import Leaderboard from "./Leaderboard";
/**
 * each side in the website to it coresponding link and protected from the Authcontect
 * @returns
 */
function App() {
  return (
    <div>
      <AuthProvider>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/Registration" element={<Registration />} />
          <Route
            exact
            path="/Library"
            element={
              <ProtectedRoute>
                <Library />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/QuizCreator/*"
            element={
              <ProtectedRoute>
                <QuizForm />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/QuestionCreator/SC"
            element={
              <ProtectedRoute>
                <QuestionForm />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/QuestionCreator/MC"
            element={
              <ProtectedRoute>
                <QuestionFormMC />
              </ProtectedRoute>
            }
          />
          <Route
            path="/QuizCreator/NewQuiz1"
            element={
              <ProtectedRoute>
                <NewQuiz1 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/QuizCreator/NewQuiz2"
            element={
              <ProtectedRoute>
                <NewQuiz2 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/CategoryCreator"
            element={
              <ProtectedRoute>
                <CategoryCreator />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/Quiz/*"
            element={
              <ProtectedRoute>
                <QuizShow />
              </ProtectedRoute>
            }
          />
          <Route
            path="/QuestionCreator/EditQuestion"
            element={
              <ProtectedRoute>
                <QuestionFormEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/QuestionCreator/EditQuestionMC"
            element={
              <ProtectedRoute>
                <QuestionFormEditMC />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/EditQuiz1/*"
            element={
              <ProtectedRoute>
                <QuizEdit1 />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/EditQuiz2/*"
            element={
              <ProtectedRoute>
                <QuizEdit2 />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/EditQuiz3/*"
            element={
              <ProtectedRoute>
                <QuizEdit3 />
              </ProtectedRoute>
            }
          />
          <Route
            path="QuizCreator/TeamsCreator"
            element={
              <ProtectedRoute>
                {" "}
                <Teams />
              </ProtectedRoute>
            }
          />
          <Route
            path="/CreateGuest/*"
            element={
              <ProtectedRoute>
                <GuestCreator />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}
export default App;
