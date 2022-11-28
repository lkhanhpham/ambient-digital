import { useState } from "react"
import axios from "axios"
import React from "react";
import { Link, useNavigate} from "react-router-dom";
import $ from "jquery";
const QuestionForm = () => {
    
    var dropdownV="ScId";
    const [questionText, setQuestionText] = useState('')
    const [defaultAnswer, setDefaultAnswer] = useState('')
    const [author, setAuthorId] = useState('')
    const [multiplayer, setMultiplayer] = useState('false')
    const [questiontype, setQuestionType] = useState('MC')
    const [questionAnswerOption, setQuestionAnswerOption] = useState('')
    
    
    const $ = require( "jquery" );
    const navigate = useNavigate();

    function createQuestion(event) {
        navigate("/QuestionCreator/NewQuestion", 
        {state: 
            {
                question_text: questionText,
                default_answer:{
                    text: defaultAnswer,
                    is_correct: true
                },
                multiplayer: multiplayer,
                question_type: questiontype,
                author: 1,
                question_answer_option: questionAnswerOption
                
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
                    default_answer: {
                        text: defaultAnswer,
                        is_correct: true
                    },
                    multiplayer: multiplayer,
                    question_type: questiontype,
                    author: 1,
                    question_answer_option: questionAnswerOption
                },
                headers: {'Content-Type': 'application/json'}
            }
        ).then((response) => {
            console.log(response.data)
        })

        event.preventDefault()
        console.log(questionText)
        console.log(defaultAnswer)
        console.log(multiplayer+ "Multiplayer")
        console.log(questiontype + "QuestionType")
        console.log(questionAnswerOption + "QuestionOption")

    }
    function changeQuestion(value){
        console.log(value)
        var mcString ='<div id= "containerID2" className="container2"> <label htmlFor="exampleFormControlInput2">Choice 2</label><div><input type="text" class="form-control" id="exampleFormControlInput2" placeholder="New Answer" text={defaultAnswer} ></input><input className="right" type="checkbox"></input> <label htmlFor="exampleFormControlInput1">True</label></div></div>'
        var mcString2='<div id= "containerID3" className="container3"> <label htmlFor="exampleFormControlInput3">Choice 3</label><div><input type="text" class="form-control" id="exampleFormControlInput3" placeholder="New Answer" text={defaultAnswer} ></input><input className="right" type="checkbox"></input> <label htmlFor="exampleFormControlInput1">True</label></div></div>'
        var mcString3='<div id= "containerID4" className="container4"> <label htmlFor="exampleFormControlInput4">Choice 4</label><div><input type="text" class="form-control" id="exampleFormControlInput4" placeholder="New Answer" text={defaultAnswer} ></input><input className="right" type="checkbox"></input> <label htmlFor="exampleFormControlInput1">True</label></div></div>'
        if(value==="MC"){
            $(".container1").append(mcString+mcString2+mcString3)
            dropdownV="MC"
        }else{
            if(dropdownV==="MC"){
                const element2 = document.getElementById('containerID2');
                const element3 = document.getElementById('containerID3');
                const element4 = document.getElementById('containerID4');
                element2.remove()
                element3.remove()
                element4.remove()
                dropdownV=value
            }
        }
        setQuestionType(value)
        console.log(questiontype)
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
                        <label className="mb-2 rechts-oben"  htmlFor="exampleFormControlInput1">Multiplayer </label> 
                        <input type="checkbox" onChange={(e) => setMultiplayer(e.target.value)}/>
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
                    
                    <button onClick={createQuestion} className="btn btn-primary">Create</button>
                   
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