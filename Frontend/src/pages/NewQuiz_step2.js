import { useLocation } from "react-router-dom";
import Field from "../components/Field";
import CatField from "../components/CatField";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
const NewQuiz2 = () => {
    const location = useLocation();
    const quiz_name = location.state.quiz_name
    const nr_of_rows = location.state.nr_of_rows
    const nr_of_categories = location.state.nr_of_categories
    const categories = location.state.categories
    const catIds = location.state.catIds
    const [position, setPosition] = useState({
        row: 0, col: 0
    })
    const [questions, setQuestions] = useState([])
    //array that stores all the question texts
    const [question_text] = useState(Array(2).fill(null).map(() => Array(1)))
    //array that stores the points of all the fields
    const [fieldPoints] = useState(Array(2).fill(null).map(() => Array(1)))
    const [chosen] = useState(Array(2).fill(false).map(() => Array(1)))

    const [valid, setValid] = useState(false)

    const [show, setShow] = useState(false);
    //close the Question form
    const handleClose = () => setShow(false);
    //show the Question form
    const handleShow = (x, y) => {
        setShow(true);
        setPosition({ row: x, col: y })
    }


    const [showSuccess, setShowSuccess] = useState(false);
    //show the success notification
    const handleShowSuccess = () => setShowSuccess(true);

    //a Warning if the required data is missing and user cannot proceed
    const [showWarning, setShowWarning] = useState(false);

    const handleCloseWarning = () => setShowWarning(false);

    const handleShowWarning = () => setShowWarning(true);


    //FRONTEND creates an array that stores all the fields in the quiz
    const rows = [];
    for (let i = 0; i < nr_of_categories; i++) {
        var points = 100;
        const fields = []
        for (let k = 0; k < nr_of_rows; k++) {
            fields.push(<Field key={k} points={fieldPoints[k][i]} category={catIds[i]} row={k} col={i} handleShow={() => handleShow(k, i)} question_text={question_text[k][i]} chosen={chosen[k][i]} />)
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
        question_text[position.row][position.col] = select1.options[select1.selectedIndex].text
        fieldPoints[position.row][position.col] = select2.options[select2.selectedIndex].value
        chosen[position.row][position.col] = true
        checkValid(chosen)
        handleClose()
    }

    //check if user has chosen all fields
    const checkValid = (chosen) => {
        console.log(chosen)
        // console.log("cats",nr_of_categories,"length", chosen.length)
        console.log(chosen[0].length + chosen[1].length)
        console.log(nr_of_categories * nr_of_rows)
        if (chosen[0].length + chosen[1].length == nr_of_categories * nr_of_rows) {
            setValid(chosen.every((row) => row.every((col) => (col === true))))
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
    function createBackendFields() {

    }

    //fetch all created questions
    const getAllQues = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/question/')
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
                        {/* <Link to = {{pathname: "/QuizCreator/NewQuiz",
                    state: {quiz_name: quizName, nr_of_rows: nrOfRows, nr_of_categories: nrOfCols}}}
                    > */}
                        <button onClick={() => saveQuestion(position)} className="btn btn-primary">Save</button>
                        {/* </Link> */}
                    </div>
                </Modal.Footer>
            </Modal>
            <Modal
                size="lg"
                aria-labelledby="warning"
                centered
                show={showWarning} onHide={handleCloseWarning}>
                <Modal.Header closeButton>
                    <Modal.Title id="warning">Oops! You forgot something</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Please edit all fields to proceed</p>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
            <Modal
                size="lg"
                aria-labelledby="success"
                centered
                show={showSuccess} >
                <Modal.Header closeButton>
                    <Modal.Title id="warning">Finished!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Your quiz is finished and ready to be played!</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={createBackendFields}>Continue</button>
                </Modal.Footer>
            </Modal>
            <div className="d-flex justify-content-end p-3">
                {/* <Link to = {{pathname: "/QuizCreator/NewQuiz",
                    state: {quiz_name: quizName, nr_of_rows: nrOfRows, nr_of_categories: nrOfCols}}}
                    > */}
                <button onClick={nextStep} className="btn btn-primary">Next</button>
                {/* </Link> */}
            </div>

        </div>
    )
}
export default NewQuiz2;