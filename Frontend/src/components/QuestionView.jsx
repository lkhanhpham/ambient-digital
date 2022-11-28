import React, { useState, useEffect } from 'react';
import Question from './QuestionCard'
import { Link, useNavigate} from "react-router-dom";
import axios from "axios"

const QuestionView = () => {
    const [questions, setQuiz] = useState([])
    const navigate = useNavigate();

    const getAllQuestions = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/question')
        const data = await response.json()
        if (response.ok) {
            setQuiz(data)
            console.log(questions)
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

    const deleteItem = async (questionId) => {
        console.log(questionId)
        
        axios(
            {
                method: "DELETE",
                url: "http://localhost:8000/api/question/"+questionId+"/",
                headers: {'Content-Type': 'application/json'}
            }
        ).then((response) => {
            console.log(response.data)
        })
        window.location.reload();

    }

    const editItem = async (questionId) => {
        console.log(questionId)
        navigate("/QuestionCreator/EditQuestion", 
            {state: 
            {   
                id: questionId, 
            }
        } 
        )
    }

    return (
        <>
            <div className="card shadow-sm top">
                <div className="card-header d-flex justify-content-between">
                    <span className="small-title float-left">Questions</span>

                    <Link to = "/QuestionCreator" ><button className='btn btn-primary'>  Create question</button></Link>
                </div>
                <div className="card-body scrollable ">
                    <div className="">
                        {questions.length > 0 ?
                            (<div className='mx-auto align-items-center justify-content-center'>
                            <div className='d-block'>
                                {questions.map((item) => (

                                    <Question
                                        question_text={item.question_text}
                                        pub_date={item.pub_date.substring(0,10)}
                                        
                                        deleteItem ={() => deleteItem(item.id)}
                                        
                                        editItem ={() => editItem(item.id)} 
                                    />
                                    
                                )
                                )
                                }
                            </div>

                            </div>

                             ) : (
                                <div>
                                    <p>There are no questions yet.</p>
                                    <p>Create a new question or quiz to get startet!</p>
                                </div>
                            ) 

                        }

                    </div>
                </div>
                    <style jsx='true'>{`
      
        .scrollable{
            
            max-height: 50vh;
            overflow-x: auto;
        }
        .top{
            margin-top:20px;
        }
      `}</style>
            </div>
        </>
    );
}

export default QuestionView;