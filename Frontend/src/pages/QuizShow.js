import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import CatField from '../components/CatField';
import Field from '../components/Field';

// For each created quiz one quizcard is rendered
const QuizShow = (props) => {
    const navigate = useNavigate()
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

    const [cats, setCats] = useState([])
    const [myFields] = useState([])
    const [question_text, setquestiontext] = useState([])
    const [cols] = useState([])
    for (let i = 0; i < fields.length; i++) {
        if (!cols.includes(fields[i].categorie_name)) {

            //console.log(fields[i].categorie_name)
            cols.push(fields[i].categorie_name)
            cats.push(<CatField category_name={fields[i].categorie_name} />)
        }
    }
    //console.log("cols", cols)

    for (let i = 0; i < cols.length; i++) {
        let rows = []
        for (let k = 0; k < fields.length; k++) {
            if (fields[k].categorie_name == cols[i]) {
                if((fields[k].question)==null||fields[k].question==undefined){
                    question_text[k]="Please choose a question"
                }
                else{
                    question_text[k]=(fields[k].question.question_text)
                }
                rows.push(<Field category={fields[k].categorie_name} points={fields[k].point} chosen={true} question_text={question_text[k]} />)
            }
        }
        myFields.push(<div className='d-flex flex-column'>{rows}</div>)
    }



    return (
        <div className="container">
            <div className='d-flex justify-content-center'>
                <p className='big-title'>{quizId}: {quiz_name}</p>
            </div>
            <div className='d-flex justify-content-center'>{cats}</div>
            <div className='d-flex justify-content-center'>
                {myFields}
            </div>

        </div>
    )
}

export default QuizShow;