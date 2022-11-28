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
    const [defaultAnswer, setDefaultAnswer] = useState('')
    const [author, setAuthorId] = useState('')
    const [multiplayer, setMutliplayer] = useState('false')
    const [questiontype, setQuestionType] = useState('MC')
    const [questionAnswerOption, setQuestionAnswerOption] = useState('')
    
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
            setDefaultAnswer(data.defaultAnswer)
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
                    default_answer: defaultAnswer,
                    multiplayer: multiplayer,
                    question_type: questiontype,
                    author: 1,
                    question_answer_option:[
                        {
                            text: "1",
                            is_correct: false
                        },
                        {
                            text: "2",
                            is_correct: false
                        },
                        {
                            text: "3",
                            is_correct: false
                        }

                    ]
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
                default_answer: defaultAnswer,
                multiplayer: multiplayer,
                question_type: questiontype,
                author: 1,
                question_answer_option:[
                    {
                        text: "1",
                        is_correct: false
                    },
                    {
                        text: "2",
                        is_correct: false
                    },
                    {
                        text: "3",
                        is_correct: false
                    }

                ]
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
                <form className="text-light" >
                        <label for="type">Choose a Type: </label>
                        <select  id="type" name="type">
                            <option value="SC">Single Choice</option>
                            <option value="MC">Multiple Choice</option>
                            <option value="EQ">Estimate Question</option>
                        </select>
                        <label className="mb-2 rechts-oben"  htmlFor="exampleFormControlInput1">Multiplayer </label> 
                        <input type="checkbox"/>
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
                        <div className="container2"> 
                            <label htmlFor="exampleFormControlInput2">Choice 2</label>
                            <div>
                            <input type="text" class="form-control" id="exampleFormControlInput2" placeholder="New Answer" text={defaultAnswer} 
                            onChange={(e) => setQuestionAnswerOption(questionAnswerOption.push(e.target.value))}
                            ></input>
                            <input className="right" type="checkbox"></input> <label htmlFor="exampleFormControlInput1">True</label>
                            </div>
                        </div>
                        <div className="container3"> 
                            <label htmlFor="exampleFormControlInput3">Choice 3</label>
                            <div>
                            <input type="text" class="form-control" id="exampleFormControlInput3" placeholder="New Answer" text={defaultAnswer} 
                            onChange={(e) => setQuestionAnswerOption(e.target.value)}
                            ></input>
                            <input className="right" type="checkbox"></input> <label htmlFor="exampleFormControlInput1">True</label>
                            </div>
                        </div>
                        <div className="container4"> 
                            <label htmlFor="exampleFormControlInput4">Choice 4</label>
                            <div>
                            <input className="form-control" type="text"  id="exampleFormControlInput4" placeholder="New Answer" text={defaultAnswer} 
                            onChange={(e) => setQuestionAnswerOption(e.target.value)}
                            ></input>
                            <input className="right" type="checkbox"></input> <label htmlFor="exampleFormControlInput1">True</label>
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