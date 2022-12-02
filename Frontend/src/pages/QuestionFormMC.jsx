import { useState } from "react"
import axios from "axios"
import React from "react";
import { Link, useNavigate} from "react-router-dom";
import $ from "jquery";

var dropdownV="MC";

const QuestionForm = () => {
    
   
    const [questionText, setQuestionText] = useState('')
    const [defaultAnswer, setDefaultAnswer] = useState('')
    const [author, setAuthorId] = useState('')
    const [questionType, setQuestionType] = useState('')
    const [questionAnswerOption1, setQuestionAnswerOption1] = useState('')
    const [questionAnswerOption2, setQuestionAnswerOption2] = useState('')
    const [questionAnswerOption3, setQuestionAnswerOption3] = useState('')
    const [questionAnswerOption1b, setQuestionAnswerOption1b] = useState('false')
    const [questionAnswerOption2b, setQuestionAnswerOption2b] = useState('false')
    const [questionAnswerOption3b, setQuestionAnswerOption3b] = useState('false')
    
    
    const $ = require( "jquery" );
    const navigate = useNavigate();

    function createQuestionMC(event) {
        navigate("/QuestionCreator/NewQuestion", 
        {state: 
            {
                question_text: questionText,
                default_answer:{
                    text: defaultAnswer,
                    is_correct: true
                },
                question_type: dropdownV,
                author: 1,
                question_answer_option: 
                [{
                    text: questionAnswerOption1,
                    is_correct: questionAnswerOption1b
                },
                {
                    text: questionAnswerOption2,
                    is_correct: questionAnswerOption1b
                },
                {
                    text: questionAnswerOption3,
                    is_correct: questionAnswerOption1b
                }]
                
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
                    },
                    question_answer_option: [{
                        text: questionAnswerOption1,
                        is_correct: questionAnswerOption1b
                    },
                    {
                        text: questionAnswerOption2,
                        is_correct: questionAnswerOption2b
                    },
                    {
                        text: questionAnswerOption3,
                        is_correct: questionAnswerOption3b
                    }]
                
                },
                headers: {'Content-Type': 'application/json'}
            }
        ).then((response) => {
            console.log(response.data)
        })

        event.preventDefault()
        console.log(questionText)
        console.log(defaultAnswer)
        console.log(dropdownV + "QuestionType")
        console.log(questionAnswerOption1 + "QuestionOption")
        console.log(questionAnswerOption2 + "QuestionOption2")
        console.log(questionAnswerOption3 + "QuestionOption3")
        console.log(questionAnswerOption1b + "QuestionOption")
        console.log(questionAnswerOption2b + "QuestionOption2")
        console.log(questionAnswerOption3b + "QuestionOption3")
    }

    function changeQuestion(value){
        console.log(value)
        
        if(value==="SC"||value==="EQ"){

            navigate("/QuestionCreator/SC", 
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

    $('#checkbox-value1').text($('#checkbox1').val());

    $("#checkbox1").on('change', function() {
      if ($(this).is(':checked')) {
        $(this).attr('value', 'true');
        setQuestionAnswerOption1b(true);
      } else {
        $(this).attr('value', 'false');
        setQuestionAnswerOption1b(false);
      }
      
      $('#checkbox-value1').text($('#checkbox1').val());
    });

    $('#checkbox-value2').text($('#checkbox2').val());

    $("#checkbox2").on('change', function() {
      if ($(this).is(':checked')) {
        $(this).attr('value', 'true');
        setQuestionAnswerOption2b(true);
      } else {
        $(this).attr('value', 'false');
        setQuestionAnswerOption2b(false);
      }
      
      $('#checkbox-value2').text($('#checkbox2').val());
    });

    $('#checkbox-value3').text($('#checkbox3').val());

    $("#checkbox3").on('change', function() {
      if ($(this).is(':checked')) {
        $(this).attr('value', 'true');
        setQuestionAnswerOption3b(true);
      } else {
        $(this).attr('value', 'false');
        setQuestionAnswerOption3b(false);
      }
      
      $('#checkbox-value3').text($('#checkbox3').val());
    });

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
                            <option id="McId" value="MC">Multiple Choice</option>
                            <option id= "ScId"value="SC">Single Choice</option>
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
                        <div id= "containerID2" className="container2"> 
                            <label htmlFor="exampleFormControlInput2">Choice 2</label>
                            <div>
                                <input type="text" class="form-control" id="exampleFormControlInput2" placeholder="New Answer" text={defaultAnswer} 
                                onChange={(e) => setQuestionAnswerOption1(e.target.value)}></input>
                                <input className="right" id="checkbox1" type="checkbox"></input> 
                                <label id="checkbox-value1"></label>
                            </div>
                        </div>
                        <div id= "containerID3" className="container3"> 
                            <label htmlFor="exampleFormControlInput3">Choice 3</label>
                            <div>
                                <input type="text" class="form-control" id="exampleFormControlInput3" placeholder="New Answer" text={defaultAnswer} 
                                onChange={(e) => setQuestionAnswerOption2(e.target.value)}>
                                </input>
                                <input className="right" id="checkbox2" type="checkbox"></input> 
                                <label id="checkbox-value2"></label>
                            </div>
                        </div>
                        <div id= "containerID4" className="container4"> 
                            <label htmlFor="exampleFormControlInput4">Choice 4</label>
                            <div>
                                <input type="text" class="form-control" id="exampleFormControlInput4" placeholder="New Answer" text={defaultAnswer} 
                                onChange={(e) => setQuestionAnswerOption3(e.target.value)}>
                                </input>
                                <input className="right" id="checkbox3" type="checkbox"></input> 
                                <label id="checkbox-value3"></label>
                            </div>
                        </div>
                    </form>

                <div className="d-flex justify-content-end p-3">
                    <Link to ="/Library">
                    <button className="btn btn-secondary me-2" >Cancel</button>
                    </Link>
                    
                    <button onClick={createQuestionMC} className="btn btn-primary">Create</button>
                   
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