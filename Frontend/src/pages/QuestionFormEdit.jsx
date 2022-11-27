import { useState } from "react"
import axios from "axios"
import { Link, useNavigate} from "react-router-dom";
import { useLocation } from "react-router-dom";
import {React, useEffect } from 'react';
import Question from '../components/QuestionCard';



const QuestionFormEdit = (id ) => {

    const location = useLocation();
    const idQuestion= location.state.id

    const url= "http://localhost:8000/api/question/"+idQuestion+"/";
   
    const [questions, setQuiz] = useState([])
    const navigate = useNavigate();
    const [questionText, setQuestionText] = useState('')
    const [questionAnswer, setQuestionAnswer1] = useState('')
    const [author, setAuthorId] = useState('')
    const [questionAnswer2, setQuestionAnswer2] = useState('')
    const [questionAnswer3, setQuestionAnswer3] = useState('')
    const [questionAnswer4, setQuestionAnswer4] = useState('')
    
    function deleteItem(event){
        event.preventDefault()
        console.log(idQuestion)
        
        axios(
            {
                method: "DELETE",
                url: url,
                headers: {'Content-Type': 'application/json'}
            }
        ).then((response) => {
            console.log(response.data)
        })

        navigate("/Library", 
        )
        
    }

    const getAllQuestions = async () => {
        const response = await fetch(url) 
        const data = await response.json()
        if (response.ok) {
            console.log(data)
            setQuiz(data)
            setQuestionText(data.question_text)
            setQuestionAnswer1(data.answer_text)
            setAuthorId(1)
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
    function editQuestion(event){
        event.preventDefault()       
        axios(
            {
                method: "PUT",
                url: url,
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
        
    
    }
    
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
                    <Link to ="/Library">
                    <button  className="btn btn-secondary me-2" onClick={deleteItem} >Delete</button> 
                    </Link>
                    <Link to ="/Library">
                    <button className="btn btn-secondary me-2">Cancel</button>
                    </Link>
                    <button  className="btn btn-primary" onClick={editQuestion}>Update</button>
                    
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