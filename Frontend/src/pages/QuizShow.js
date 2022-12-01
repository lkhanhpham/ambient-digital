import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import CatField from '../components/CatField';
import Field from '../components/Field';

// For each created quiz one quizcard is rendered
const QuizShow = (props) => {
    const navigate = useNavigate()
    // const display = (event) =>{
    //     event.preventDefault()
    //      console.log("move")
    // navigate("/Quiz/"+props.id+"/", { state: {id:props.id, title: props.title, nr_of_categories: props.nr_of_categories } })
    // }
    const location = useLocation();
    const quiz_name = location.state.title
    const quizId = location.state.id
    const nr_of_rows = location.state.nr_of_rows
    const nr_of_categories = location.state.nr_of_categories
    const categories = location.state.categories
    const catIds = location.state.catIds

    //array that stores all the question texts (index = row_index + col_index*nr_of_row)
    //array that stores the points of all the fields
    const fields = location.state.fields
    console.log("my fields: ", fields)
    // const [chosen] = useState([false])

    // const [valid, setValid] = useState(false)

    // const [show, setShow] = useState(false);
    // //close the Question form
    // const handleClose = () => setShow(false);
    // //show the Question form
    // const handleShow = (x, y, length) => {
    //     setShow(true);
    //     setPosition(x + y * length)
    // }


    // const [showSuccess, setShowSuccess] = useState(false);
    // //show the success notification
    // const handleShowSuccess = () => setShowSuccess(true);

    // //a Warning if the required data is missing and user cannot proceed
    // const [showWarning, setShowWarning] = useState(false);

    // const handleCloseWarning = () => setShowWarning(false);

    // const handleShowWarning = () => setShowWarning(true);

    // //a Warning if the question already exists in the quiz and user cannot proceed
    // const [showWarning1, setShowWarning1] = useState(false);

    // const handleCloseWarning1 = () => setShowWarning1(false);

    // const handleShowWarning1 = () => setShowWarning1(true);

    //FRONTEND creates an array that stores all the fields in the quiz
    // const rows = [];
    // for (let i = 0; i < nr_of_categories; i++) {
    //     var points = 100;
    //     const fields = []
    //     for (let k = 0; k < nr_of_rows; k++) {
    //         fields.push(<Field key={k} points={fieldPoints[k + i * nr_of_rows]} category={catIds[i]} row={k} col={i} handleShow={() => handleShow(k, i, nr_of_rows)} question_text={question_text[k + i * nr_of_rows]} chosen={chosen[k + i * nr_of_rows]} />)
    //         points += 100;
    //     }
    //     //create an array that stores all the fields in a column
    //     rows.push(<div key={i} className="d-flex flex-column justify-content-center">{fields}</div>)
    // }

    // //FRONTEND creates an array that stores the categories' names
    // const cols = [];
    // for (let i = 0; i < nr_of_categories; i++) {
    //     // note: we are adding a key prop here to allow react to uniquely identify each
    //     // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
    //     cols.push(<CatField key={i} category_name={categories[i]} />);
    // }

    //BACKEND creates an array that stores all the fields that will be posted
    // const [fields] = useState([])

    // function saveQuestion(position) {
    //     var select1 = document.getElementById('questions')
    //     var select2 = document.getElementById('points')
    //     const text = select1.options[select1.selectedIndex].text
    //     const id = select1.options[select1.selectedIndex].value
    //     if (!question_text.includes(text)) {
    //         question_text[position] = text
    //         question_ids[position] = id
    //         chosen[position] = true
    //     }
    //     else {
    //         handleShowWarning1()
    //     }
    //     // console.log(select1.options[select1.selectedIndex].value)
    //     fieldPoints[position] = select2.options[select2.selectedIndex].value
    //     checkValid(chosen)
    //     handleClose()
    // }

    //check if user has chosen all fields
    // const checkValid = (chosen) => {
    //     console.log(chosen)
    //     // console.log("cats",nr_of_categories,"length", chosen.length)
    //     console.log(nr_of_categories * nr_of_rows)
    //     if (chosen.length == nr_of_categories * nr_of_rows) {
    //         setValid(chosen.every((element) => element === true))
    //     }
    //     console.log("valid", valid)
    // }


    // const nextStep = () => {
    //     checkValid(chosen)
    //     if (valid == true) {
    //         handleShowSuccess()
    //     } else {
    //         handleShowWarning()
    //     }

    // }

    // After user edits all fields, the data is saved into fields
    // const fillFields = () => {
    //     var k = -1;
    //     for (let i = 0; i < question_text.length; i++) {
    //         if (i % nr_of_rows == 0) {
    //             k += 1;
    //         }
    //         fields.push({
    //             point: +fieldPoints[i],
    //             question: +question_ids[i],
    //             categorie: +catIds[k],
    //             quiz: quizId
    //         })
    //     }
    //     console.log(fields)
    // }
    // const createBackendFields = (event) => {
    //     event.preventDefault()
    //     fillFields()
    //     for (let i = 0; i < question_text.length; i++) {
    //         axios(
    //             {
    //                 method: "POST",
    //                 url: "http://localhost:8000/api/field/",
    //                 data: {
    //                     point: fields[i].point,
    //                     question: fields[i].question,
    //                     categorie: fields[i].categorie,
    //                     quiz: fields[i].quiz
    //                 },
    //                 headers: { 'Content-Type': 'application/json' }
    //             }
    //         ).then((response) => {
    //             console.log(response.data)
    //         })
    //     }
    //     // navigate back to library page
    //     navigate("../../Library/")

    // }
    const [cats, setCats] = useState([])
    const [myFields] = useState([])
    const [cols] = useState([])
    for (let i = 0; i < fields.length; i++) {
        if (!cols.includes(fields[i].categorie_name)) {

            console.log(fields[i].categorie_name)
            cols.push(fields[i].categorie_name)
            cats.push(<CatField category_name = {fields[i].categorie_name}/>)
        }
    }
    console.log("cols", cols)

    for(let i = 0; i<cols.length; i++){
        const cat = cols[i]
        let rows = []
        for (let k = 0; k < fields.length; k++){
                if(fields[k].categorie_name == cols[i]){
                    rows.push(<Field category = {fields[k].categorie_name} points = {fields[k].point}  chosen={true} question ={fields[k].question.question_text} />)
                }
            }
            myFields.push(<div className='d-flex flex-column'>{rows}</div>)
    }


    //fetch all created fields in the quiz
    // const getAllFields = async () => {
    //     const response = await fetch("http://127.0.0.1:8000/api/wholequiz/" + quizId + "/")
    //     const data = await response.json()
    //     if (response.ok) {
    //         console.log(data.quiz_field)
    //         setFields(data.quiz_field)
    //         createTable(fields)
    //     }
    //     else {
    //         console.log(response.status)
    //         console.log("Failed Network request")

    //     }

    // }


    // useEffect(
    //     () => {
    //         getAllFields()
    //     }, []
    // )

    return (
        <div className="container">
            <p>{quizId}: {quiz_name}</p>
            <div className='d-flex'>{cats}</div>
            <div className='d-flex'>
                {myFields}
            </div>

        </div>
    )
}

export default QuizShow;