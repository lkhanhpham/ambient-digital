import { useState } from "react"
import axios from "axios"
import React from "react";
import { Link, useNavigate} from "react-router-dom";
const QuestionForm = () => {

    const [questionText, setQuestionText] = useState('')
    const [questionAnswer, setQuestionAnswer1] = useState('')
    const [questionAnswer2, setQuestionAnswer2] = useState('')
    const [questionAnswer3, setQuestionAnswer3] = useState('')
    const [questionAnswer4, setQuestionAnswer4] = useState('')
    
   
    const navigate = useNavigate();

    function createQuestion(event) {
         
        axios(
            {
                method: "POST",
                url: "http://localhost:8000/api/question/",
                data: {
                    question_text: questionText,
                    answer_text: questionAnswer,
                    /* question_answer2: questionAnswer2,
                    question_answer3: questionAnswer3,
                    question_answer4: questionAnswer4, */
                },
                headers: {'Content-Type': 'application/json'}
            }
        ).then((response) => {
            console.log(response.data)
        })
        setQuestionText("Dummy")
        setQuestionAnswer1("Dummy")
        setQuestionAnswer2("Dummy")
        setQuestionAnswer3("Dummy")
        setQuestionAnswer4("Dummy")
        event.preventDefault()
    }
    function createFrontendQuestion(event){
        //Set new attributes and post
        navigate("/QuestionCreator/NewQuestion", 
            {state: 
                {
                    question_text: questionText,
                    answer_text: questionAnswer,
                     question_answer2: questionAnswer2,
                    question_answer3: questionAnswer3,
                    question_answer4: questionAnswer4,  
                }
            } 
        )
        event.preventDefault()
       
    }


    return (
        <>
            <div className="text-dark d-flex justify-content-center align-self-center pt-3 pb-3">
                <h3 className="big-title">New Question</h3>
            </div>
            <div className="row justify-content-center">

                <div className="custom-card col-lg-6 col-md-8 p-5 bg-dark justify-content-center align-self-center">
                    <form className="text-light">
                    <div className="form-group m-3">
                            <label className="mb-2"  htmlFor="exampleFormControlInput1">Question Text</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1"
                                placeholder="New Question"
                                text={questionText}
                                onChange={(e) => setQuestionText(e.target.value)}
                                ></input>
                        </div>
                        <label className="mb-2"  htmlFor="exampleFormControlInput1">Answers  <button className="btn btn-primary">Add</button></label>
                        <div className="form-group m-3">
                            <label className="mb-2"  htmlFor="exampleFormControlSelect1">Choice 1 </label>
                            <input type="text" class="form-control" id="exampleFormControlInput1"
                                placeholder="New Answer"
                                text={questionAnswer}
                                onChange={(e) => setQuestionAnswer1(e.target.value)}
                                ></input>
                        </div>
                        <div className="form-group m-3">
                            <label className="mb-2"  htmlFor="exampleFormControlSelect1">Choice 2</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1"
                                placeholder="New Answer"
                                text={questionAnswer2}
                                onChange={(e) => setQuestionAnswer2(e.target.value)}
                                ></input>
                        </div>
                        <div className="form-group m-3">
                            <label className="mb-2"  htmlFor="exampleFormControlSelect1">Choice 3</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1"
                                placeholder="New Answer"
                                text={questionAnswer3}
                                onChange={(e) => setQuestionAnswer3(e.target.value)}
                                ></input>
                        </div>
                        <div className="form-group m-3">
                            <label className="mb-2"  htmlFor="exampleFormControlSelect1">Choice 4</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1"
                                placeholder="New Answer"
                                text={questionAnswer4}
                                onChange={(e) => setQuestionAnswer4(e.target.value)}
                                ></input>
                        </div>
                    </form>

                <div className="d-flex justify-content-end p-3">
                    <Link to ="/Library">
                    <button className="btn btn-secondary me-2" >Cancel</button>
                    </Link>
                    
                    <button onClick={createFrontendQuestion} className="btn btn-primary">Create</button>
                   
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

export default QuestionForm;