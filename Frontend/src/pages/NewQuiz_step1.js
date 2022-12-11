import { useLocation} from "react-router-dom";
import CatField from "../components/CatField";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext  } from "react";
import Modal from 'react-bootstrap/Modal';
import ModalWarning from "../components/ModalWarning";
import {API_BASE_URL} from "../constants.ts";
import AuthContext from "../context/AuthContext";
const NewQuiz1 = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const quiz_name = location.state.quiz_name
    const nr_of_rows = location.state.nr_of_rows
    const nr_of_categories = location.state.nr_of_categories

    const quizId = location.state.quizId
    const [cat_name] = useState([])
    const [catIds] = useState([])

    const [chosen] = useState([false])

    const [cats, setCats] = useState([])

    const [show, setShow] = useState(false);

    const [position, setPosition] = useState(0)

    const [valid, setValid] = useState(false)

    //close the Category form
    const handleClose = () => setShow(false);
    //show the Category form
    const handleShow = (keyProp) => {
        setShow(true);
        setPosition(keyProp)
    }

    //a Warning if the required data is missing and user cannot proceed
    const [showWarning, setShowWarning] = useState(false);

    const handleCloseWarning = () => setShowWarning(false);

    const handleShowWarning = () => setShowWarning(true);

    //a Warning if the category already exists in the quiz and user cannot proceed
    const [showWarning1, setShowWarning1] = useState(false);

    const handleCloseWarning1 = () => setShowWarning1(false);

    const handleShowWarning1 = () => setShowWarning1(true);

    //fetch all created categories
    const getAllCats = async () => {
        const response = await fetch(`${API_BASE_URL}/api/authorcategorie/${user.user_id}`)
        const data = await response.json()
        if (response.ok) {
            //console.log(data)
            setCats(data.categorie_author)
        }
        else {
            //console.log(response.status)
            console.log("Failed Network request")

        }
    }

    //create an array that stores the categories' names
    const cols = [];
    for (let i = 0; i < nr_of_categories; i++) {
        // note: we are adding a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        cols.push(<CatField key={i} category_name={"Category " + (i + 1)} cat_name={cat_name[i]} handleShow={() => handleShow(i)}
            chosen={chosen[i]} keyProp={i} />);
    }

    const update = () => {
        var select1 = document.getElementById('categories')
        //console.log(select1.options[select1.selectedIndex].value);
    }

    //save the chosen category and show it on the field  
    function saveCat(position) {
        var select1 = document.getElementById('categories')
        const text = (select1.options[select1.selectedIndex].text)
        const id = select1.options[select1.selectedIndex].value
        if(!catIds.includes(id)){
            cat_name[position] = text
            catIds[position] = id
            chosen[position] = true
        }
        else{
            handleShowWarning1()
        }
        checkValid(chosen)
        handleClose()
    }


    const navigate = useNavigate();
    
    //check if user has chosen all categories
    const checkValid = (chosen) => {
        // console.log(chosen)
        // console.log("cats",nr_of_categories,"length", chosen.length)
        if(chosen.length == nr_of_categories){
            setValid(chosen.every((element) => element === true))
        }
        //console.log("valid", valid)
    }
    //after user chooses the categories, proceed to next step to add questions
    const nextStep = () => {
        checkValid(chosen)
        if (valid === true) {
            navigate("/QuizCreator/Newquiz2", {
                state: {
                    quiz_name: quiz_name, nr_of_rows: nr_of_rows,
                    nr_of_categories: nr_of_categories, categories: cat_name,
                    quizId: quizId, catIds: catIds
                }
            },)
        } else {
            handleShowWarning()

        }

    }


    useEffect(
        () => {
            getAllCats();
        }, []
    )


    return (
        <div className="container">
            <div className="text-dark d-flex justify-content-center align-self-center pt-3 pb-3">
                <h3 className="small-title">{quiz_name} </h3>
            </div>
            <div className="text-dark d-flex justify-content-center align-self-center pt-3 pb-3">
                <h3 className="body-text">1. Choose your categories</h3>
            </div>
            <div className="row justify-content-center p-3">
                <div className="col-12 d-flex flex-row justify-content-center">
                    {cols}
                </div>
                {/* <div className="col-12 d-flex flex-column ">
                    {rows}
                </div> */}

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
                        <select className="form-control" id="categories" onChange={update}>
                            {cats.map((item) => (
                                <option key={item.id} value = {item.id}>
                                    {item.categorie_name}
                                </option>
                            ))}
                        </select>

                    </form>
                    <Link to="CategoryCreator" target='_blank'>
                        <button className="small-button mt-3">Create category</button>
                    </Link>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex justify-content-end p-3">
                        <button onClick={handleClose} className="btn btn-secondary me-2">Cancel</button>
                        {/* <Link to = {{pathname: "/QuizCreator/NewQuiz",
                    state: {quiz_name: quizName, nr_of_rows: nrOfRows, nr_of_categories: nrOfCols}}}
                    > */}
                        <button onClick={() => saveCat(position)} className="btn btn-primary">Save</button>
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
            <ModalWarning showWarning = {showWarning} handleCloseWarning = {handleCloseWarning} title = {"Oops! You forgot something"} body = {"Please pick all categories to proceed"} />
            <ModalWarning showWarning={showWarning1} handleCloseWarning={handleCloseWarning1} title={"Category is not unique."} body={"Looks like this category exists in your quiz. Please choose another one."} />
        </div>
    )
}
export default NewQuiz1;