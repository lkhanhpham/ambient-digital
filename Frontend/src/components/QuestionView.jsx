import React, { useState, useEffect } from 'react';
import Question from './QuestionCard'
import { Link} from "react-router-dom";

const QuestionView = () => {
    const [questions, setQuiz] = useState([])

    const getAllQuestions = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/question')
        const data = await response.json()
        if (response.ok) {
            console.log(data)
            setQuiz(data)
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
        // delete function
    }

    const editItem = async (questionId) => {
        // edit function
    }

    return (
        <>
            <div className="card shadow-sm top">
                <div className="card-header d-flex justify-content-between">
                    <span className="small-title float-left">Questions</span>

                    <Link to = "/Question" ><button className='btn btn-primary'>  Create question</button></Link>
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