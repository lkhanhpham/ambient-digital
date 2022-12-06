import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import CatField from '../components/CatField';
import Field from '../components/Field';
import { API_BASE_URL } from "../constants.ts";
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import ModalSuccess from '../components/ModalSuccess';

// For each created quiz one quizcard is rendered
const QuizEdit2 = (props) => {
    const navigate = useNavigate()
    const location = useLocation();
    const title = location.state.title
    const quizId = location.state.id
    const nr_of_rows = location.state.nr_of_rows
    const nr_of_categories = location.state.nr_of_categories

    const [catIds] = useState([])
    const [questions, setQuestions] = useState([])

    //array that stores  all the fields
    // var fields = location.state.fields

    const [quizName, setQuizName] = useState('')
    const [change, setChange] = useState(false)
    const [newcats, setNewcats] = useState([])
    var [cats, setCats] = useState([])
    var [cols, setCols] = useState([])
    const [value, setValue] = useState(0);

    const [fields, setFields] = useState([])

    //all variables related to editing field
    const [fieldId, setFieldId] = useState(0)
    var [ques, setQues] = useState(0)
    var [point, setPoint] = useState(0)
    const [show, setShow] = useState(false);
    //close the Question form
    const handleClose = () => setShow(false);
    //show the Question form
    const handleShow = (id) => {
        setShow(true);
        setFieldId(id)
    }

    const [showRemove, setShowRemove] = useState(false);
    //close the remove form
    const handleClose1 = () => setShowRemove(false);
    //show the remove form
    const handleShow1 = () => setShowRemove(true);
    //boolean indicates whether user want to remove a category
    var [confirm, setConfirm] = useState(false)
    //name of the to-be-removed category
    const [confirmName, setConfirmName] = useState("")
    var [removedfields] = useState([])

    const getAllFields = async () => {
        const response = await fetch(`${API_BASE_URL}/api/wholequiz/` + quizId + "/")
        const data = await response.json()
        if (response.ok) {
            console.log(data.field_quiz)
            setFields(data.field_quiz)
        }
        else {
            //console.log(response.status)
            console.log("Failed Network request")

        }

    }
    //fetch all created questions
    const getAllQues = async () => {
        const response = await fetch(`${API_BASE_URL}/api/question/`)
        const data = await response.json()
        if (response.ok) {
            //console.log(data)
            setQuestions(data)
        }
        else {
            //console.log(response.status)
            console.log("Failed Network request")

        }
    }

    const refresh = () => {
        // it re-renders the component
        setValue(value + 1);
        // createdGrid()
    }

    const removeCat = (name) => {
        //newlz created column can be removed immediatelz
        if (name === "dummy") {
            newcats.pop()
            setCols([])
            setCats([])
            refresh()
        }
        else {
            //check if user confirms to delete
            //if already confirmed, proceed to delete
            if (confirm) {
                removedfields = fields.filter(field => field.categorie_name === name)
                const test = fields.filter(field => field.categorie_name !== name)
                console.log(test)
                setCols([])
                setCats([])
                setFields(test)
                putQuiz()
                refresh()
            }
            //otherwise show a warning
            else {
                setConfirmName(name)
                handleShow1()
            }

        }
        // refresh()
    }

    const confirmRemove = (event) => {
        event.preventDefault()
        confirm = true
        // refresh()
        removeCat(confirmName)
        handleClose1()
    }
    const url = `${API_BASE_URL}/api/quiz/` + quizId + "/";
    const putQuiz = () => {
        axios(
            {
                method: "PUT",
                url: url,
                data: {
                    quiz_name: title,
                    nr_of_rows: nr_of_rows,
                    nr_of_categories: cols.length - 1,
                    author: 1,
                },
                headers: { 'Content-Type': 'application/json' }
            }
        ).then((response) => {
            console.log(response.data)
        })
        console.log("these will be removed", removedfields)
        for (let i = 0; i < removedfields.length; i++) {
            axios(
                {
                    method: "DELETE",
                    url: `${API_BASE_URL}/api/field/` + removedfields[i].id + "/",
                    headers: { 'Content-Type': 'application/json' }
                }
            ).then((response) => {
                console.log(response.data)
            })
        }

    }

    const addCat = () => {
        let tempfields = []
        tempfields.push(<button className='small-button' onClick={() => removeCat("dummy")}>Remove category</button>)
        tempfields.push(<CatField category_name={"dummy"} />)
        for (let i = 0; i < nr_of_rows; i++) {
            tempfields.push(<Field category={"dummy"} points={100} chosen={false} />)
        }
        newcats.push(<div className='d-flex flex-column'>{tempfields}</div>)
        refresh()
        // console.log("added")
    }

    function createGrid() {
        for (let i = 0; i < fields.length; i++) {
            // console.log("vor if")
            if (!cols.includes(fields[i].categorie_name)) {
                console.log("push categorie", fields[i].categorie_name)
                const categorie_name = fields[i].categorie_name
                cols.push(categorie_name)
                catIds.push(fields[i].categorie)
                const tempfields = []
                tempfields.push(<button className='small-button' onClick={() => removeCat(categorie_name)}>Remove category</button>)
                tempfields.push(<CatField category_name={fields[i].categorie_name} />)

                for (let k = 0; k < fields.length; k++) {
                    if (fields[k].categorie_name == categorie_name) {
                        tempfields.push(<Field category={fields[k].categorie_name} points={fields[k].point} chosen={true} question={fields[k].question.question_text} />)
                    }
                }
                cats.push(<div className='d-flex flex-column'>{tempfields}</div>)
            }
        }

    }
    createGrid()




    const nextStep = () => {

    }
    const prevStep = () => {
        navigate("/EditQuiz1/" + quizId + "/", { state: { id: quizId, title: title, nr_of_categories: nr_of_categories, nr_of_rows: nr_of_rows, fields: fields } })
    }
    const save = () => {
        navigate("/EditQuiz2/" + quizId + "/", { state: { id: quizId, title: title, nr_of_categories: nr_of_categories, nr_of_rows: nr_of_rows, fields: fields } })
    }

    //PUT new quiz name to backend
    // const saveQuizname = (event) => {
    //     event.preventDefault()
    //     axios(
    //         {
    //             method: "PUT",
    //             url: url,
    //             data: {
    //                 quiz_name: quizName,
    //                 nr_of_rows: nr_of_rows,
    //                 nr_of_categories: nr_of_categories,
    //                 author: 1,
    //             },
    //             headers: { 'Content-Type': 'application/json' }
    //         }
    //     ).then((response) => {
    //         console.log(response.data)
    //     })
    //     setChange(true)
    //     handleClose1()
    // }
    //show the form to change quiz name
    // const changeTitle = () => {
    //     handleShow1()
    // }

    const fieldUrl = `${API_BASE_URL}/api/field/` + fieldId + "/";
    //save the changed data of the edited field
    const saveField = () => {
        var select1 = document.getElementById('questions')
        var select2 = document.getElementById('points')
        const text = select1.options[select1.selectedIndex].text
        const id = select1.options[select1.selectedIndex].value
        ques = id
        point = select2.options[select2.selectedIndex].value

    }
    //PUT field to backend
    const putField = (event) => {
        saveField()
        axios(
            {
                method: "PUT",
                url: fieldUrl,
                data: {
                    point: +point,
                    question_id: +ques,
                    categorie: +(fields.find(({ id }) => id === fieldId).categorie),
                    quiz: quizId
                },
                headers: { 'Content-Type': 'application/json' }
            }
        ).then((response) => {
            console.log(response.data)

            // const test = fields.map(field => {
            //     if (field.id === response.data.id) {
            //         return response.data
            //     }
            //     return field
            // })
            console.log("test", test)
            setCols([])
            setCats([])
            // setFields(test)
            // window.location.reload()
            // getAllFields()
            // createdGrid()
            // fields = allfields
            refresh()
        })
        handleClose()
        event.preventDefault()
    }


    useEffect(
        () => {
            getAllFields()
            getAllQues()

        }, []
    )

    // useEffect(
    //     () => {
    //         console.log("render", fields)
    //         if (fields.length !== 0) {
    //             createdGrid()
    //         }
    //     }, [fields]
    // )


    return (
        <div className="container">
            <div className=' d-flex justify-content-center pt-3'>
                {change ? (
                    <h1 className='big-title me-3'>{quizName}</h1>
                ) : (
                    <h1 className='big-title me-3'>{title}</h1>
                )}
                {/* <button onClick={changeTitle} className="icon align-self-start"><img src='editbutton.png' alt='icon' width='20' height='20'></img></button> */}
            </div>
            <div className='row justify-content-between'>
                <div className=' col-4 d-flex flex-column justify-content-center align-self-start'>
                    <p className='instruction ps-3'> 1. Edit quiz name and fields</p>
                    <p className='instruction bold p-3'> 2. Add/Remove categories</p>
                    <p className='instruction ps-3'> 1. Add/Remove rows</p>
                </div>
                <div className='col-8 d-flex flex-column justify-content-start align-self-start'>
                    <div className='d-flex justify-content-start p-3'>
                        <button className='small-button me-3' onClick={addCat}>Add category</button>
                    </div>
                    <div className='d-flex justify-content-start'>

                        {cats.length === 0 ? (
                            <div className='divholder'></div>
                        ) : (
                            <div className='d-flex'>{cats}</div>
                        )
                        }
                        <div className='d-flex'>{newcats}</div>
                    </div>
                    <div className="d-flex justify-content-between p-3">
                        <button onClick={prevStep} className="btn btn-primary">Back</button>
                        <button onClick={nextStep} className="btn btn-primary">Next</button>
                    </div>
                </div>
            </div>
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
                        <select className="form-control mb-4" id="questions">
                            {questions.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.question_text}
                                </option>
                            ))}
                        </select>
                        <h1 className="small-title mb-2">Points</h1>
                        <select className="form-control" id="points">
                            <option value={100}>100</option>
                            <option value={200}>200</option>
                            <option value={300}>300</option>
                            <option value={400}>400</option>
                            <option value={500}>500</option>
                        </select>
                    </form>
                    <Link to="../../QuestionCreator/SC" target='_blank'>
                        <button className="small-button mt-3">Create question</button>
                    </Link>

                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex justify-content-end p-3">
                        <button onClick={handleClose} className="btn btn-secondary me-2">Cancel</button>

                        <button onClick={putField} className="btn btn-primary">Save</button>
                    </div>
                </Modal.Footer>
            </Modal>
            <ModalSuccess showSuccess={showRemove} title={"Are you sure you want to remove this category?"} body={"All the fields belong to this category will also be deleted."}
                handleCloseSuccess={handleClose1} onclick={confirmRemove} />
        </div>
    )
}

export default QuizEdit2;