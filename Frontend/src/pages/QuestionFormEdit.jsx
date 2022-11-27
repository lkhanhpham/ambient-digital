import { useState } from "react"
import axios from "axios"
import { Link, useNavigate} from "react-router-dom";
import { useLocation } from "react-router-dom";
import {React, useEffect } from 'react';
import Question from '../components/QuestionCard'



const QuestionFormEdit = (questionid) => {

    const [questions, setQuiz] = useState([])
    const navigate = useNavigate();
    const [questionText, setQuestionText] = useState('')
    const [questionAnswer, setQuestionAnswer1] = useState('')
    const [author, setAuthorId] = useState('')
    const [questionAnswer2, setQuestionAnswer2] = useState('')
    const [questionAnswer3, setQuestionAnswer3] = useState('')
    const [questionAnswer4, setQuestionAnswer4] = useState('')
    


    function editFrontendQuestion(event){
        event.preventDefault()
        axios(
            {
                method: "PUT",
                url: "http://localhost:8000/api/question/1/",/** Feste Frage wird geholt*/
                data: {
                    question_text: questionText,
                    answer_text: questionAnswer,
/*                     question_answer2: questionAnswer2,
                    question_answer3: questionAnswer3,
                    question_answer4: questionAnswer4, */ 
                    author: 1,
                },
                headers: {'Content-Type': 'application/json'}
            }
        ).then((response) => {
            console.log(response.data)
        })
        setAuthorId(1)
        event.preventDefault()
        navigate("/QuestionCreator/NewQuestion", 
            {state: 
                {
                    question_text: questionText,
                    answer_text: questionAnswer,
/*                     question_answer2: questionAnswer2,
                    question_answer3: questionAnswer3,
                    question_answer4: questionAnswer4,   */
                }
            } 
        )
        console.log(questionText, "  ",questionAnswer)
        
    }
    const getAllQuestions = async () => {
        
        const response = await fetch('http://127.0.0.1:8000/api/question/1/') /** Feste Frage wird geholt*/
        const data = await response.json()
        if (response.ok) {
            console.log(data)
            setQuiz(data)
            console.log(questionid)
        }
        else {
            console.log(response.status)
            console.log("Failed Network request")

        }
    }
    useEffect(
        () => {
            getAllQuestions();
        }, []
    )

    return (
        <>
            <div className="text-dark d-flex justify-content-center align-self-center pt-3 pb-3">
                <h3 className="big-title">Edit Question</h3>
            </div>
            <div className="row justify-content-center">

                <div className="custom-card col-lg-6 col-md-8 p-5 bg-dark justify-content-center align-self-center">
                    <form className="text-light">
                       
                        <div className="form-group m-3">
                            <label className="mb-2" htmlFor="exampleFormControlSelect1">Question </label>
                            <input type="text" class="form-control" id="exampleFormControlInput1"
                                placeholder={questions.question_text}
                                text={questions.question_text}
                                onChange={(e) => setQuestionText(e.target.value)}></input>
                        </div>
                        <div className="form-group m-3">
                            <label className="mb-2"  htmlFor="exampleFormControlSelect1">Answer</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1"
                                placeholder={questions.answer_text}
                                text={questions.answer_text}
                                onChange={(e) => setQuestionAnswer1(e.target.value)}></input>
                        </div>

                    </form>

                <div className="d-flex justify-content-end p-3">
                    <button  className="btn btn-secondary me-2">Delete</button> 
                    <Link to ="/Library">
                    <button className="btn btn-secondary me-2">Cancel</button>
                    </Link>
                    {/* <Link to = {{pathname: "/QuizCreator/NewQuiz",
                    state: {quiz_name: quizName, nr_of_rows: nrOfRows, nr_of_categories: nrOfCols}}}
                    > */}
                    <button  className="btn btn-primary" onClick={editFrontendQuestion}>Create</button>
                    {/* </Link> */}
                    
                </div>
                </div>
            </div>
            
            <style jsx='true'>{`
        label{
          font-size: 18px;
        }
        .custom-card{
            border-radius: 1rem;
        }
       
      `}</style>
        </>
    );
}

export default QuestionFormEdit;