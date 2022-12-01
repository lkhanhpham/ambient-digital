import { useState, useEffect } from "react"
import axios from "axios"
import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import ModalSuccess from "../components/ModalSuccess";
const QuizForm = () => {

    const [quizName, setQuizName] = useState('')
    const [nrOfRows, setNrOfRows] = useState('')
    const [nrOfCols, setNrOfCols] = useState('')
    const [author, setAuthor] = useState('')
    const [quizId, setQuizId] = useState(0)

    const navigate = useNavigate();
    function update() {
        var select1 = document.getElementById('NrOfRows')
        setNrOfRows(select1.options[select1.selectedIndex].value)
        console.log(select1.options[select1.selectedIndex].value);
        var select2 = document.getElementById('NrOfCols')
        setNrOfCols(select2.options[select2.selectedIndex].value)
        console.log(select1.options[select2.selectedIndex].value);
    }
    //Aanouncement that quiz is created
    const [show, setShow] = useState(false);
    //close the Category form
    const handleClose = () => setShow(false);
    //show the Category form
    const handleShow = () => setShow(true);
    const confirm = () => {
        handleShow()
    }
    const createFrontendQuiz = async () => {
        navigate("/QuizCreator/Newquiz1", { state: { quiz_name: quizName, nr_of_rows: nrOfRows, nr_of_categories: nrOfCols, quizId: quizId } })
        setQuizName("")
        setNrOfRows("")
        setNrOfCols("")
        setAuthor("")
    }

    const createQuiz = (event) => {

        axios(
            {
                method: "POST",
                url: "http://localhost:8000/api/quiz/",
                data: {
                    quiz_name: quizName,
                    nr_of_rows: nrOfRows,
                    nr_of_categories: nrOfCols,
                    author: 1,

                },
                headers: { 'Content-Type': 'application/json' }
            }
        ).then((response) => {
            console.log(response.data)
            console.log(response.data.id)
            setQuizId(response.data.id)

        })
        confirm()
        event.preventDefault()
    }


    useEffect(() => {
        // action on update of quizId
    }, [quizId]);


    return (
        <>

            <div className="text-dark d-flex justify-content-center align-self-center pt-3 pb-3">
                <h3 className="big-title">New quiz</h3>
            </div>
            <div className="row justify-content-center">

                <div className="custom-card col-lg-6 col-md-8 p-5 bg-dark justify-content-center align-self-center">
                    <form className="text-light">
                        <div className="form-group m-3">
                            <label className="mb-2" htmlFor="exampleFormControlInput1">Quiz Name</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1"
                                placeholder="New quiz"
                                text={quizName}
                                onChange={(e) => setQuizName(e.target.value)}></input>
                        </div>
                        <div className="form-group m-3">
                            <label className="mb-2" htmlFor="exampleFormControlSelect1">Number of Rows</label>
                            <select className="form-control" id="NrOfRows" onChange={update}>
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
                            <label className="mb-2" htmlFor="exampleFormControlSelect1">Number of Categories</label>
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
                        <Link to="/Library">
                            <button className="btn btn-secondary me-2">Cancel</button>
                        </Link>

                        <button onClick={createQuiz} className="btn btn-primary">Create</button>
                    </div>
                    {/* modal show to announce that quiz is created successfully */}
                    <ModalSuccess showSuccess = {show} handleCloseSuccess = {handleClose} title = {"New quiz created!"} body = {"Quiz created with id: " + quizId} onclick = {createFrontendQuiz} />

                </div>
            </div>
            <style jsx="true">{`
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

export default QuizForm;