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
    const [show, setShow] = useState(false);
    const [id, setId] = useState(0)
    //close the Category form
    const handleClose = () => setShow(false);
    //show the Category form
    const handleShow = (keyProp) => {
        setShow(true);
        setId(keyProp)
    }

    //create an array that stores all the fields in a column
    const fields = []
    for (let i = 0; i < nr_of_categories; i++) {
        var points = 100;
        fields.push(<Field key={i} points={100} category={categories[i]} handleShow = {()=>handleShow(i)}/>)
        points += 100;
    }
    //creates an array that stores all the fields in the quiz
    const rows = [];
    for (let i = 0; i < nr_of_rows; i++) {
        rows.push(<div key = {i} className="d-flex d-column justify-content-center">{fields}</div>)
    }

    //create an array that stores the categories' names
    const cols = [];
    for (let i = 0; i < nr_of_categories; i++) {
        // note: we are adding a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        cols.push(<CatField key={i} category_name={categories[i]} />);
    }

    function saveCat(id) {

    }


    const nextStep = () => {

    }



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
                    <Modal.Title id="contained-modal-title-vcenter">Choose a category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form >
                        <select className="form-control" id="questions">
                            <option>question</option>
                        </select>

                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex justify-content-end p-3">
                        <button onClick={handleClose} className="btn btn-secondary me-2">Cancel</button>
                        {/* <Link to = {{pathname: "/QuizCreator/NewQuiz",
                    state: {quiz_name: quizName, nr_of_rows: nrOfRows, nr_of_categories: nrOfCols}}}
                    > */}
                        <button onClick={() => saveCat(id)} className="btn btn-primary">Save</button>
                        {/* </Link> */}
                    </div>
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