import React, { useState, useEffect } from 'react';
import Quiz from './quizCard'
//all created quizes are inserted into the quizview
const QuizView = () => {
    const [quizzes, setQuizzes] = useState([])

    const getAllQuizzes = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/wholequiz/')
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
    }

    const editItem = async (quizId) => {
        // edit function
    }

    return (
        <>
            <div className="card shadow-sm">
                <div className="card-header d-flex justify-content-between">
                    <span className="small-title float-left">Quizzes</span>

                    <button className="btn btn-primary btn-sm float-right" > Create quiz</button>
                </div>
                <div className="card-body scrollable ">
                    <div className="">
                        {quizzes.length > 0 ?
                            (<div className='mx-auto align-items-center justify-content-center'>
                            <div className='d-block'>
                                {quizzes.slice(0, 5).map((item) => (

                                    <Quiz
                                        key={item.id}
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
                    <div class="p-3">
                    <a href="#" className="btn btn-secondary">View all &rarr;</a>
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