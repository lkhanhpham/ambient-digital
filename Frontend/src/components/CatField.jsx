import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
const CatField = ({ category_name }) => {
    const [show, setShow] = useState(false);
    //close the Category form
    const handleClose = () => setShow(false);
    //show the Category form
    const handleShow = () => setShow(true);
    const [cat_name, SetCatName] = useState("")
    const [chosen, setChosen] = useState(0)
    const [cats, setCats] = useState([])

    // SetCatName(category_name)

    const getAllCats = async () => {
        const response = await fetch('http://127.0.0.1:8000/api/categorie/')
        const data = await response.json()
        if (response.ok) {
            console.log(data)
            setCats(data)
        }
        else {
            console.log(response.status)
            console.log("Failed Network request")

        }
    }

    const update = () => {
        var select1 = document.getElementById('categories')

        console.log(select1.options[select1.selectedIndex].value);
    }

    //save the chosen category   

    function saveCat() {
        var select1 = document.getElementById('categories')
        SetCatName(select1.options[select1.selectedIndex].text)
        setChosen(1)
        handleClose()
    }

    useEffect(
        () => {
            getAllCats();
        }, []
    )

    return (
        <>
            <div onClick={handleShow} className="custom-card d-flex justify-content-center">
                {chosen==1? (
                    <p className="align-self-center">
                    {cat_name}</p>
                ):(
                    <p className="align-self-center">
                    {category_name}</p>
                )}
                
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
                                <option key={item.id}>
                                    {item.categorie_name}
                                </option>
                            ))}
                        </select>

                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex justify-content-end p-3">
                        <button onClick={handleClose} className="btn btn-secondary me-2">Cancel</button>
                        {/* <Link to = {{pathname: "/QuizCreator/NewQuiz",
                    state: {quiz_name: quizName, nr_of_rows: nrOfRows, nr_of_categories: nrOfCols}}}
                    > */}
                        <button onClick={saveCat} className="btn btn-primary">Save</button>
                        {/* </Link> */}
                    </div>
                </Modal.Footer>
            </Modal>
            <style jsx="true">{

                `
    .custom-card{
            width: 160px;
            height: 80px;
            border: solid 1px black;
            border-radius: 8px;
    }
    .custom-card:hover{
        background-color: green;
        cursor: pointer;
    }
        `
            }
            </style>
        </>
    )
}
export default CatField;