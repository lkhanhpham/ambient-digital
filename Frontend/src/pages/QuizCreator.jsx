import { useState, useEffect } from "react"
import axios from "axios"
import React, { Component } from "react";
import { Link } from "react-router-dom";
const QuizCreator = () => {

    const [quiz, setNewQuizs] = useState(null)
    const [quizName, setQuizName] = useState('')
    const [nrOfRows, setNrOfRows] = useState('')
    const [nrOfCols, setNrOfCols] = useState('')

    function update(){
        var select1 = document.getElementById('NrOfRows')
        setNrOfRows(select1.options[select1.selectedIndex].value) 
        console.log(select1.options[select1.selectedIndex].value);
        var select2 = document.getElementById('NrOfCols')
        setNrOfCols(select2.options[select2.selectedIndex].value)
        console.log(select1.options[select2.selectedIndex].value);
    }
    function createQuiz(event) {
         
        axios(
            {
                method: "POST",
                url: "http://localhost:8000/api/wholequiz/",
                data: {
                    quiz_name: quizName,
                    nr_of_rows: nrOfRows,
                    nr_of_categories: nrOfCols,

                },
                headers: {'Content-Type': 'application/json'}
            }
        ).then((response) => {
            console.log(response.data)
        })
        setQuizName("")
        setNrOfRows("")
        setNrOfCols("")
        event.preventDefault()
    }


    return (
        <>

            <div className="text-dark d-flex justify-content-center align-self-center pt-3 pb-3">
                <h3 className="big-title">New quiz</h3>
            </div>
            <div className="row justify-content-center">

                <div className="custom-card col-lg-6 col-md-8 p-5 bg-dark justify-content-center align-self-center">
                    <form className="text-light">
                        <div className="form-group m-3">
                            <label className="mb-2"  htmlFor="exampleFormControlInput1">Quiz Name</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1"
                                placeholder="New quiz"
                                text={quizName}
                                onChange={(e) => setQuizName(e.target.value)}></input>
                        </div>
                        <div className="form-group m-3">
                            <label className="mb-2" htmlFor="exampleFormControlSelect1">Number of Rows</label>
                            <select  className="form-control" id="NrOfRows" onChange={update}>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                            </select>
                        </div>
                        <div className="form-group m-3">
                            <label className="mb-2"  htmlFor="exampleFormControlSelect1">Number of Categories</label>
                            <select className="form-control" id="NrOfCols" onChange={update}>
                            <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                                <option value={10}>10</option>
                            </select>
                        </div>

                    </form>

                <div className="d-flex justify-content-end p-3">
                    <Link to ="/Library">
                    <button className="btn btn-secondary me-2">Cancel</button>
                    </Link>
                    <button className="btn btn-primary"
                    onClick={createQuiz}>Create</button>
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

export default QuizCreator;