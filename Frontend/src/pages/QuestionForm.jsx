import { useState, useEffect, useContext } from "react"
import axios from "axios"
import React from "react";
import { Link, useNavigate} from "react-router-dom";
import $ from "jquery";
import { useLocation } from "react-router-dom";
import {API_BASE_URL} from "../constants.ts";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AuthContext from "../context/AuthContext";

var dropdownV="x";

const QuestionForm = () => {    
    const { user } = useContext(AuthContext);
   
    const [questionText, setQuestionText] = useState('')
    const [defaultAnswer, setDefaultAnswer] = useState('')
    const [author, setAuthorId] = useState('')
    const [questionType, setQuestionType] = useState('')

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const handleClose = () => setShow(false);
    const handleClose2 = () => setShow2(false);
    
    const handleShow = () => {
        if(questionText.length!==0 && defaultAnswer.length!==0){
            setShow(true)
        }else{
            setShow2(true)
        }
    };
    
    
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
        event.preventDefault()
        setAuthorId(user.user_id)

        axios(
            {
                method: "POST",
                url: `${API_BASE_URL}/api/question/`,
                data: {
                    question_text: questionText,
                    author: user.user_id,
                    question_type: dropdownV,
                    default_answer: {
                        text: defaultAnswer,
                        is_correct: true
                    }                
                },
                headers: {'Content-Type': 'application/json'}
            }
        ).then((response) => {
            //console.log(response.data)
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
                        author: user.user_id,
                    }
                } 
            )
            
        }
        dropdownV=value
       
    }
   
    const eventListener = async () => {

        var input = document.getElementById("formidCustom");
        input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#submitButton").click()
            //console.log("asyncFunktiom")
        }
        });
    }
    useEffect(
        () => {
            eventListener();
        }, []
    )

   
  
    const backHome = (event) => {
        createQuestionSC(event)
        navigate("/Library")
    }

    const nextQuestion=(event)=>{
        createQuestionSC(event)
        window.location.reload()
    }


    return (
        <>
            <div className="text-dark d-flex justify-content-center align-self-center pt-3 pb-3">
                <h3 className="big-title">New Question</h3>
            </div>
            <div className="row justify-content-center">

                <div id= "formidCustom" className="custom-card col-lg-6 col-md-8 p-5 bg-dark justify-content-center align-self-center">

                    <form className="text-light"  >
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
                            required="required"></input>

                        <label className="mb-2"  htmlFor="exampleFormControlInput1">Answers </label> 

                        <div className="container1"> 
                            <label htmlFor="exampleFormControlInput1">Choice 1 (has to be true)</label>
                            <div>
                            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="New Answer" text={defaultAnswer} 
                            onChange={(e) => setDefaultAnswer(e.target.value)} required="required"></input>
                            </div>
                        </div>
                    </form>

                <div className="d-flex justify-content-end p-3">
                    <Link to ="/Library">
                    <button className="btn btn-secondary me-2" >Cancel</button>
                    </Link>
                    
                    <button id="submitButton" type ="submit" onClick={handleShow} className="btn btn-primary">Create</button>
                    <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you created a question!</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={backHome}>
                        Close and back to overview.
                    </Button>
                    <Button variant="primary" onClick={nextQuestion}>
                        Create next one!
                    </Button>
                    </Modal.Footer>
                    </Modal>
{/* You forgot something */}
                    <Modal show={show2} onHide={handleClose2}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>You forgot something. Please fill in every field.</Modal.Body>
                    </Modal>
                   
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