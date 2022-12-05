import { useState } from "react"
import axios from "axios"
import { Link, useNavigate} from "react-router-dom";
import { useLocation } from "react-router-dom";
import {React, useEffect } from 'react';
import Question from '../components/QuestionCard';
import $ from "jquery";
import {API_BASE_URL} from "../constants.ts";



const QuestionFormEdit = (id ) => {

    var dropdownV="ScId";
    const location = useLocation();
    const idQuestion= location.state.id


    const url= `${API_BASE_URL}/api/question/`+idQuestion+"/";
   
    const [questions, setQuiz] = useState([])
    const [questionText, setQuestionText] = useState('')
    const [defaultAnswer, setDefaultAnswer] = useState('')
    const [author, setAuthorId] = useState('')
    const [questiontype, setQuestionType] = useState('')

    const $ = require( "jquery" );
    const navigate = useNavigate();
    
    function deleteItem(event){
        event.preventDefault()
        if (window.confirm('Do you really want to delete this question?')){
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
        }else{
            // They clicked no
        }
        
    }

    const getAllQuestions = async () => {
        const response = await fetch(url) 
        const data = await response.json()
        if (response.ok) {
            //console.log(data)
            setQuiz(data)
            setQuestionText(data.question_text)
            setDefaultAnswer(data.default_answer)
            setAuthorId(1)
            setQuestionType(data.question_type)

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
                    default_answer: {
                        text: defaultAnswer.text,
                        is_correct: true
                    },
                    question_type: questiontype,
                    author: 1
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
                    default_answer: {
                        text: defaultAnswer.text,
                        is_correct: defaultAnswer.is_correct
                    },
                    question_type: questiontype,
                    author: 1
                }
            } 
        )
        
    
    }

    function changeQuestion(value){
        if(value==="MC"){
            navigate("/QuestionCreator/EditQuestionMC", 
                {state: 
                    {    
                        id: idQuestion, 
                        question_text: questionText,
                        default_answer:{
                            text: defaultAnswer.text,
                            is_correct: defaultAnswer.is_correct
                        },
                        question_type: value,
                        author: 1
                    }
                } 
            )
            
        }else{
            setQuestionType(value)
        }
        dropdownV=value
    }
    function setdefAnswer(defAnswer, bDefAnswer){
        
        const data =  {
            text: defAnswer,
            is_correct: bDefAnswer
        }
        setDefaultAnswer(data)
    }
    
    return (
        <>
            <div className="text-dark d-flex justify-content-center align-self-center pt-3 pb-3">
                <h3 className="big-title">Edit Question</h3>
            </div>
            <div className="row justify-content-center">

                <div className="custom-card col-lg-6 col-md-8 p-5 bg-dark justify-content-center align-self-center">
                <form className="text-light" >
                        <label for="type">Choose a Type: </label>
                        <select  id="selectOpt" name="typeSelection" onChange={(e) => changeQuestion(e.target.value)}
                             placeholder={questiontype}
                             value={questiontype}>
                            <option id= "ScId"value="SC">Single Choice</option>
                            <option id= "EqId" value="EQ">Estimate Question</option>
                        </select>
                    </form>

                    <form className="text-light">

                        <label className="mb-2"  htmlFor="exampleFormControlInput1">Question Text</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1"
                            placeholder={questionText}
                            text={questionText}
                            onChange={(e) => setQuestionText(e.target.value)}
                            ></input>

                        <label className="mb-2"  htmlFor="exampleFormControlInput1">Answers </label> 

                        <div className="container1"> 
                            <label htmlFor="exampleFormControlInput1">Choice 1 (has to be true)</label>
                            <div>
                            <input type="text" class="form-control" id="exampleFormControlInput1" 
                            placeholder={defaultAnswer.text} text={defaultAnswer.text} 
                            onChange={(e) => setdefAnswer(e.target.value, true)}></input>
                            </div>
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