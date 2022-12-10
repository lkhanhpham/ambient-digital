import { useState, useContext } from "react"
import axios from "axios"
import { Link, useNavigate} from "react-router-dom";
import { useLocation } from "react-router-dom";
import {React, useEffect } from 'react';
import Question from '../components/QuestionCard';
import $ from "jquery";
import {API_BASE_URL} from "../constants.ts";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AuthContext from "../context/AuthContext";


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
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const [show2, setShow2] = useState(false);
    const handleShow = () => {
        setShow(true)
    };
    const handleClose2 = () => setShow2(false);
    const { user } = useContext(AuthContext);
    
    const handleShow2 = (event) => {
        if(questionText.length!==0 && defaultAnswer.length!==0){
            //console.log("show2")
            setShow3(true)
        }else{
            setShow2(true)
        }
    };

    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);

    const $ = require( "jquery" );
    const navigate = useNavigate();
    
    function deleteItem(event){
        event.preventDefault()
        
            axios(
                {
                    method: "DELETE",
                    url: url,
                    headers: {'Content-Type': 'application/json'}
                }
            ).then((response) => {
                //console.log(response.data)
            })

            navigate("/Library", 
            )

    }

    const getAllQuestions = async () => {
        const response = await fetch(url) 
        const data = await response.json()
        if (response.ok) {
            //console.log(data)
            setQuiz(data)
            setQuestionText(data.question_text)
            setDefaultAnswer(data.default_answer)
            setQuestionType(data.question_type)
            setAuthorId(user.user_id)

        }
        else {
            //console.log(response.status)
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
                    author: user.user_id
                },
                headers: {'Content-Type': 'application/json'}
            }
        ).then((response) => {
            //console.log(response.data)
        })
        event.preventDefault()
        navigate("/Library", 
        // Update erfolgreich meldung einfügen
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
                        author: user.user_id
                        
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

    
    
    return (
        <>
            <div className="text-dark d-flex justify-content-center align-self-center pt-3 pb-3">
                <h3 className="big-title">Edit Question</h3>
            </div>
            <div className="row justify-content-center">

                <div id= "formidCustom" className="custom-card col-lg-6 col-md-8 p-5 bg-dark justify-content-center align-self-center">
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
                            value={questionText}
                            onChange={(e) => setQuestionText(e.target.value)}
                            ></input>

                        <label className="mb-2"  htmlFor="exampleFormControlInput1">Answers </label> 

                        <div className="container1"> 
                            <label htmlFor="exampleFormControlInput1">Choice 1 (has to be true)</label>
                            <div>
                            <input type="text" class="form-control" id="exampleFormControlInput1" 
                            placeholder={defaultAnswer.text} text={defaultAnswer.text}  value={defaultAnswer.text}
                            onChange={(e) => setdefAnswer(e.target.value, true)}></input>
                            </div>
                        </div>
                    </form>

                <div className="d-flex justify-content-end p-3">

                    <button  className="btn btn-secondary me-2" onClick={handleShow} >Delete</button> 
                    <Link to ="/Library">
                    <button className="btn btn-secondary me-2">Cancel</button>
                    </Link>
                    <button  id="submitButton" className="btn btn-primary" onClick={handleShow2}>Update</button>

                    <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>Do you really want to delete this question?</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={deleteItem}>
                        Yes!
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        No!
                    </Button>
                    </Modal.Footer>
                    </Modal>

                    {/* You forgot something. Wird nie geöffnet TODO*/}
                    <Modal show={show2} onHide={handleClose2}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>You forgot something. Please fill in every field.</Modal.Body>
                    </Modal>
                    {/* Update Sucess */}
                    <Modal show={show3} onHide={handleClose3}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>Your Update was sucessfull.</Modal.Body>
                    <Modal.Footer>
                    <Link>
                        <Button variant="primary" onClick={editQuestion}> Back to Libary</Button>
                    </Link>
                    </Modal.Footer>
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
       
      `}</style>
        </>
    );
}

export default QuestionFormEdit;