import { useState } from "react"
import axios from "axios"
import React from "react";
import { Link, useNavigate} from "react-router-dom";
import $ from "jquery";
import { useLocation } from "react-router-dom";

var dropdownV="x";

const QuestionForm = () => {    
   
    const [questionText, setQuestionText] = useState('')
    const [defaultAnswer, setDefaultAnswer] = useState('')
    const [author, setAuthorId] = useState('')
    const [questionType, setQuestionType] = useState('')

    
    
    const $ = require( "jquery" );
    const navigate = useNavigate();

    function createQuestionSC(event) {
        if(dropdownV==="x"){
            dropdownV="SC"
        }else{
            var e = document.getElementById("selectOpt");
            var value = e.value;
            dropdownV=value;
        }
        navigate("/QuestionCreator/NewQuestion", 
        {state: 
            {
                question_text: questionText,
                default_answer:{
                    text: defaultAnswer,
                    is_correct: true
                },
                question_type: dropdownV,
                author: 1
            }
        } 
        )
        event.preventDefault()
       

        axios(
            {
                method: "POST",
                url: "http://localhost:8000/api/question/",
                data: {
                    question_text: questionText,
                    author: 1,
                    question_type: dropdownV,
                    default_answer: {
                        text: defaultAnswer,
                        is_correct: true
                    }                
                },
                headers: {'Content-Type': 'application/json'}
            }
        ).then((response) => {
            console.log(response.data)
        })

        event.preventDefault()

    }
    function changeQuestion(value){
        if(value==="MC"){
            navigate("/QuestionCreator/MC", 
                {state: 
                    {
                        question_text: questionText,
                        default_answer:{
                            text: defaultAnswer,
                            is_correct: true
                        },
                        question_type: value,
                        author: 1
                    }
                } 
            )
            
        }
        dropdownV=value
       
    }

    return (
        <>
            <div className="text-dark d-flex justify-content-center align-self-center pt-3 pb-3">
                <h3 className="big-title">New Question</h3>
            </div>
            <div className="row justify-content-center">

                <div className="custom-card col-lg-6 col-md-8 p-5 bg-dark justify-content-center align-self-center">

                    <form className="text-light" >
                        <label for="type">Choose a Type: </label>
                        <select  id="selectOpt" name="typeSelection" onChange={(e) => changeQuestion(e.target.value)}>
                            <option id= "ScId"value="SC">Single Choice</option>
                            <option id="McId" value="MC">Multiple Choice</option>
                            <option id= "EqId" value="EQ">Estimate Question</option>
                        </select>
                    </form>

                    <form className="text-light">

                        <label className="mb-2"  htmlFor="exampleFormControlInput1">Question Text</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1"
                            placeholder="New Question"
                            text={questionText}
                            onChange={(e) => setQuestionText(e.target.value)}
                            ></input>

                        <label className="mb-2"  htmlFor="exampleFormControlInput1">Answers </label> 

                        <div className="container1"> 
                            <label htmlFor="exampleFormControlInput1">Choice 1 (has to be true)</label>
                            <div>
                            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="New Answer" text={defaultAnswer} 
                            onChange={(e) => setDefaultAnswer(e.target.value)}></input>
                            </div>
                        </div>
                    </form>

                <div className="d-flex justify-content-end p-3">
                    <Link to ="/Library">
                    <button className="btn btn-secondary me-2" >Cancel</button>
                    </Link>
                    
                    <button onClick={createQuestionSC} className="btn btn-primary">Create</button>
                   
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
        .right{
            text-align: right;
        }
        .rechts-oben{
            padding:2%;
        }
      `}</style>
        </>
    );
}

export default QuestionForm;