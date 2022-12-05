import { useLocation } from "react-router-dom";
import Field from "../components/Field";
import CatField from "../components/CatField";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import ModalWarning from "../components/ModalWarning";
import ModalSuccess from "../components/ModalSuccess";
import axios from "axios"
import {API_BASE_URL} from "../constants.ts";

const NewQuiz2 = () => {
    const location = useLocation();
    const quiz_name = location.state.quiz_name
    const nr_of_rows = location.state.nr_of_rows
    const nr_of_categories = location.state.nr_of_categories
    const categories = location.state.categories
    const catIds = location.state.catIds
    const quizId = location.state.quizId
    const [position, setPosition] = useState(0)
    const [questions, setQuestions] = useState([])
    //array that stores all the question texts (index = row_index + col_index*nr_of_row)
    const [question_text] = useState([""])
    const [question_ids] = useState([0])
    //array that stores the points of all the fields
    const [fieldPoints] = useState([100])
    const [chosen] = useState([false])

    const [valid, setValid] = useState(false)

    const [show, setShow] = useState(false);
    //close the Question form
    const handleClose = () => setShow(false);
    //show the Question form
    const handleShow = (x, y, length) => {
        setShow(true);
        setPosition(x + y * length)
    }


    const [showSuccess, setShowSuccess] = useState(false);
    //show the success notification
    const handleShowSuccess = () => setShowSuccess(true);

    //a Warning if the required data is missing and user cannot proceed
    const [showWarning, setShowWarning] = useState(false);

    const handleCloseWarning = () => setShowWarning(false);

    const handleShowWarning = () => setShowWarning(true);

    //a Warning if the question already exists in the quiz and user cannot proceed
    const [showWarning1, setShowWarning1] = useState(false);

    const handleCloseWarning1 = () => setShowWarning1(false);

    const handleShowWarning1 = () => setShowWarning1(true);

    //FRONTEND creates an array that stores all the fields in the quiz
    const rows = [];
    for (let i = 0; i < nr_of_categories; i++) {
        var points = 100;
        const fields = []
        for (let k = 0; k < nr_of_rows; k++) {
            fields.push(<Field key={k} points={fieldPoints[k + i * nr_of_rows]} category={catIds[i]} row={k} col={i} handleShow={() => handleShow(k, i, nr_of_rows)} question_text={question_text[k + i * nr_of_rows]} chosen={chosen[k + i * nr_of_rows]} />)
            points += 100;
        }
        //create an array that stores all the fields in a column
        rows.push(<div key={i} className="d-flex flex-column justify-content-center">{fields}</div>)
    }

    //FRONTEND creates an array that stores the categories' names
    const cols = [];
    for (let i = 0; i < nr_of_categories; i++) {
        // note: we are adding a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        cols.push(<CatField key={i} category_name={categories[i]} />);
    }

    //BACKEND creates an array that stores all the fields that will be posted
    const [fields] = useState([])

    function saveQuestion(position) {
        var select1 = document.getElementById('questions')
        var select2 = document.getElementById('points')
        const text = select1.options[select1.selectedIndex].text
        const id = select1.options[select1.selectedIndex].value
        if (!question_text.includes(text)) {
            question_text[position] = text
            question_ids[position] = id
            chosen[position] = true
        }
        else {
            handleShowWarning1()
        }
        // console.log(select1.options[select1.selectedIndex].value)
        fieldPoints[position] = select2.options[select2.selectedIndex].value
        checkValid(chosen)
        handleClose()
    }

    //check if user has chosen all fields
    const checkValid = (chosen) => {
        console.log(chosen)
        // console.log("cats",nr_of_categories,"length", chosen.length)
        console.log(nr_of_categories * nr_of_rows)
        if (chosen.length == nr_of_categories * nr_of_rows) {
            setValid(chosen.every((element) => element === true))
        }
        console.log("valid", valid)
    }


    const nextStep = () => {
        checkValid(chosen)
        if (valid == true) {
            handleShowSuccess()
        } else {
            handleShowWarning()
        }

    }

    // After user edits all fields, the data is saved into fields
    const fillFields = () => {
        var k = -1;
        for (let i = 0; i < question_text.length; i++) {
            if (i % nr_of_rows == 0) {
                k += 1;
            }
            fields.push({
                point: +fieldPoints[i],
                question: +question_ids[i],
                categorie: +catIds[k],
                quiz: quizId
            })
        }
        console.log(fields)
    }
    const navigate = useNavigate();
    const createBackendFields = (event) => {
        event.preventDefault()
        fillFields()
        for (let i = 0; i < question_text.length; i++) {
            axios(
                {
                    method: "POST",
                    url: `${API_BASE_URL}/api/field/`,
                    data: {
                        point: fields[i].point,
                        question_id: fields[i].question ,
                        categorie: fields[i].categorie,
                        quiz: fields[i].quiz
                    },
                    headers: { 'Content-Type': 'application/json' }
                }
            ).then((response) => {
                console.log(response.data)
            })
        }
        // navigate back to library page
        navigate("../../Library/")
        
    }

    //fetch all created questions
    const getAllQues = async () => {
        const response = await fetch(`${API_BASE_URL}/api/question/`)
        const data = await response.json()
        if (response.ok) {
            console.log(data)
            setQuestions(data)
        }
        else {
            console.log(response.status)
            console.log("Failed Network request")

        }
    }

    const update = () => {
        var select1 = document.getElementById('questions')
        console.log(select1.options[select1.selectedIndex].value);
    }


    useEffect(
        () => {
            getAllQues();
        }, []
    )

    return (
        <div className="container">
            <div className="text-dark d-flex justify-content-center align-self-center pt-3 pb-3">
                <h3 className="small-title"> {quiz_name} </h3>
            </div>
            <div className="text-dark d-flex justify-content-center align-self-center pt-3 pb-3">
                <h3 className="body-text">2. Click on each field to edit</h3>
            </div>
            <div className="row justify-content-center p-3">
                <div className="col-12 d-flex flex-row justify-content-center">
                    {cols}
                </div>
                <div className="col-12 d-flex flex-row justify-content-center">
                    {rows}
                </div>

            </div>
            {/* Modal shown when clicked on the field */}
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Edit field</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form >
                        <h1 className="small-title mb-2">Question</h1>
                        <select className="form-control mb-4" id="questions" onChange={update}>
                            {questions.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.question_text}
                                </option>
                            ))}
                        </select>
                        <h1 className="small-title mb-2">Points</h1>
                        <select className="form-control" id="points" onChange={update}>
                            <option value={100}>100</option>
                            <option value={200}>200</option>
                            <option value={300}>300</option>
                            <option value={400}>400</option>
                            <option value={500}>500</option>
                        </select>
                    </form>
                    <Link to="../../QuestionCreator/" target='_blank'>
                        <button className="small-button mt-3">Create question</button>
                    </Link>

                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex justify-content-end p-3">
                        <button onClick={handleClose} className="btn btn-secondary me-2">Cancel</button>

                        <button onClick={() => saveQuestion(position)} className="btn btn-primary">Save</button>
                    </div>
                </Modal.Footer>
            </Modal>

            <ModalWarning showWarning={showWarning} handleCloseWarning={handleCloseWarning} title={"Oops! You forgot something"} body={"Edit all fields to proceed"} />

            <ModalWarning showWarning={showWarning1} handleCloseWarning={handleCloseWarning1} title={"Question is not unique."} body={"Looks like this question exists in your quiz. Please choose another question."} />

            <ModalSuccess showSuccess={showSuccess} title={"Finished!"} body={"Your quiz is finished and ready to be played!"} onclick={createBackendFields} />

            <div className="d-flex justify-content-end p-3">

                <button onClick={nextStep} className="btn btn-primary">Next</button>

            </div>

        </div>
    )
}
export default NewQuiz2;