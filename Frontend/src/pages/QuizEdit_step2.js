
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import CatField from '../components/CatField';
import Field from '../components/Field';

// For each created quiz one quizcard is rendered
const QuizEdit2 = (props) => {
    const navigate = useNavigate()
    const location = useLocation();
    const title= location.state.title
    const quizId = location.state.id
    const nr_of_rows = location.state.nr_of_rows
    const nr_of_categories = location.state.nr_of_categories
    const categories = location.state.categories
    const [catIds] = useState([])

    //array that stores all the question texts (index = row_index + col_index*nr_of_row)
    //array that stores the points of all the fields
    const fields = location.state.fields

    const [cats, setCats] = useState([])
    const [newcats, setNewcats] = useState([])
    const [newrows, setNewrows] = useState([])
    const [myFields, setFields] = useState([])
    const [cols] = useState([])
    const [value, setValue] = useState(0);

    const refresh = () => {
        // it re-renders the component
        setValue(value + 1);
    }
    for (let i = 0; i < fields.length; i++) {
        if (!cols.includes(fields[i].categorie_name)) {

            //console.log(fields[i].categorie_name)
            const categorie_name = fields[i].categorie_name
            cols.push(categorie_name)
            catIds.push(fields[i].categorie)
            const tempfields = []
            tempfields.push(<CatField category_name={fields[i].categorie_name} />)

            if (value == 0) {
                for (let k = 0; k < fields.length; k++) {
                    if (fields[k].categorie_name == categorie_name) {
                        tempfields.push(<Field category={fields[k].categorie_name} points={fields[k].point} chosen={true} question={fields[k].question.question_text} />)
                    }
                }
            }

            cats.push(<div className='d-flex flex-column'>{tempfields}</div>)
        }
    }
    //console.log("cols", cols)


    const addRow = () => {
        let newfields = []
        for (let i = 0; i < nr_of_categories + newcats.length; i++) {
            newfields.push(<Field category={""} points={100} chosen={false} />)
        }
        let temprows = []
        temprows.push(<div className='d-flex flex-row'>{newfields}</div>)
        newrows.push(<div className='d-flex flex-column'>{temprows}</div>)
        refresh()
    }
    const removeRow = () => {
        if (newcats.length !== 0) {
            newcats.pop()
        }
        else{

        }
        refresh()
    }

    const nextStep = () => {
        navigate("/EditQuiz2/" + quizId + "/",  { state: { id: quizId, title: title, nr_of_categories: nr_of_categories, nr_of_rows: nr_of_rows, fields: fields } } )
    }



    useEffect(
        () => {

        }, []
    )


    return (
        <div className="container">
        <div className=' d-flex justify-content-center align-self-center pt-3'>
            <p className='big-title'>{quizId}: {title}</p>
        </div>
        <div className=' d-flex justify-content-center align-self-center'>
            <p className='instruction'> 2. Add more or remove rows.</p>
        </div>
        <div className='row justify-content-center align-self-center'>
            <div className='d-flex justify-content-center p-3'>
                <button className='small-button me-3' onClick={addRow}>Add row</button>
                <button className='small-button' onClick={removeRow}>Remove row</button>
            </div>
            <div className='d-flex justify-content-center'>

                <div className='d-flex'>{cats}</div>
                <div className='d-flex'>{newcats}</div>
            </div>
            <div className="d-flex justify-content-end p-3">
                <button onClick={nextStep} className="btn btn-primary">Next</button>
            </div>
        </div>

    </div>
    )
}

export default QuizEdit2;