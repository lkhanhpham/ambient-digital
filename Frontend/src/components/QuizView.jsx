import React, { useState, useEffect } from 'react';
import Quiz from './quizCard'
import { Link, useNavigate} from "react-router-dom";
import axios from "axios"
import {API_BASE_URL} from "../constants.ts";
//all created quizes are inserted into the quizview
const QuizView = () => {
    const [quizzes, setQuizzes] = useState([])
    const navigate = useNavigate()

    const getAllQuizzes = async () => {
        const response = await fetch(`${API_BASE_URL}/api/wholequiz/`)
        const data = await response.json()
        if (response.ok) {
            console.log(data)
            setQuizzes(data)
        }
        else {
            console.log(response.status)
            console.log("Failed Network request")

        }
    }
    useEffect(
        () => {
            getAllQuizzes();
        }, []
    )

    const deleteItem = async (quizId) => {
        // delete function
        console.log(quizId)
        
        axios(
            {
                method: "DELETE",
                url: `${API_BASE_URL}/api/quiz/`+quizId+"/",
                headers: {'Content-Type': 'application/json'}
            }
        ).then((response) => {
            console.log(response.data)
        })
        window.location.reload();
    }

    const editItem = async (quizId) => {
        // edit function
        //leads uder to the quizEditor page for the chosen quiz
        console.log(quizId)
        navigate("/QuizCreator/EditQuiz", 
            {state: 
            {   
                id: quizId, 
            }
        } 
        )

    }

    return (
        <>
            <div className="card shadow-sm">
                <div className="card-header d-flex justify-content-between">
                    <span className="small-title float-left align-self-center">Quizzes</span>

                    <Link to = "/QuizCreator" ><button className='btn btn-primary'>  Create quiz</button></Link>
                </div>
                <div className="card-body scrollable ">
                    <div className="">
                        {quizzes.length > 0 ?
                            (<div className='mx-auto align-items-center justify-content-center'>
                            <div className='d-block'>
                                {quizzes.map((item) => (

                                    <Quiz
                                        key={item.id}
                                        id = {item.id}
                                        title={item.quiz_name}
                                        pub_date={item.pub_date.substring(0,10)}
                                        nr_of_categories={item.nr_of_categories}
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
                                    <p>There are no quizzes yet.</p>
                                    <p>Create a new quiz and start adding questions!</p>
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
      `}</style>
            </div>
        </>
    );
}

export default QuizView;