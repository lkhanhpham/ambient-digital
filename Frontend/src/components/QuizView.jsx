import React, { useState, useEffect, useContext } from "react";
import Quiz from "./quizCard";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../constants.ts";
import AuthContext from "../context/AuthContext";
/**
 * all created quizes are inserted into the quizview
 * @returns QuizView
 */
const QuizView = () => {
  const [quizzes, setQuizzes] = useState([]);
  const { user } = useContext(AuthContext);

  const getAllQuizzes = async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/authorquiz/` + user.user_id + "/"
    );
    const data = await response.json();
    if (response.ok) {
      setQuizzes(data.quiz_author);
    } else {
      //console.log(response.status)
      console.log("Failed Network request");
    }
  };
  useEffect(() => {
    getAllQuizzes();
  }, []);

  //deletes one quiz
  const deleteItem = async (quizId) => {
    axios({
      method: "DELETE",
      url: `${API_BASE_URL}/api/quiz/` + quizId + "/",
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      //console.log(response.data)
    });
    window.location.reload();
  };

  var arr = [];
  //proves if user has min. 1 own quiz
  function hasOwnQuizes() {
    quizzes.forEach((element) => {
      if (quizzes.length > 0) {
        arr.push(element);
      } else {
      }
    });
    if (arr.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <>
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between">
          <span className="small-title float-left align-self-center">
            Quizzes
          </span>

          <Link to="/QuizCreator">
            <button className="my-btn-primary"> Create quiz</button>
          </Link>
        </div>
        <div className="card-body scrollable ">
          <div className="">
            {hasOwnQuizes() ? (
              <div className="mx-auto align-items-center justify-content-center">
                <div className="d-block">
                  {arr.map((item) => (
                    <Quiz
                      key={item.id}
                      id={item.id}
                      title={item.quiz_name}
                      pub_date={item.pub_date.substring(0, 10)}
                      nr_of_categories={item.nr_of_categories}
                      nr_of_rows={item.nr_of_rows}
                      deleteItem={() => deleteItem(item.id)}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <p>There are no quizzes yet.</p>
                <p>Create a new quiz and start adding questions!</p>
              </div>
            )}
          </div>
        </div>
        <style jsx="true">{`
          .scrollable {
            max-height: 50vh;
            overflow-x: auto;
          }
        `}</style>
      </div>
    </>
  );
};

export default QuizView;
