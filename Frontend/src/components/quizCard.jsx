import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {API_BASE_URL} from "../constants.ts";

// For each created quiz one quizcard is rendered
const Quiz = (props) => {
    const navigate = useNavigate()
    const [fields, setFields] = useState([])
    const getAllFields = async () => {
        const response = await fetch(`${API_BASE_URL}/api/wholequiz/` + props.id + "/")
        const data = await response.json()
        if (response.ok) {
            //console.log(data.field_quiz)
            setFields(data.field_quiz)
        }
        else {
            //console.log(response.status)
            console.log("Failed Network request")

        }
        
    }

    const display = (event) => {
        event.preventDefault()

        const status =new Array(fields.length).fill(0)
        const fieldStatus = JSON.stringify(status);
        localStorage.setItem(props.id, fieldStatus);
        console.log(status);
        navigate("/Quiz/" + props.id + "/", { state: { id: props.id, title: props.title, nr_of_categories: props.nr_of_categories,nr_of_rows: props.nr_of_rows, fields: fields } })
    }
        useEffect(
        () => {
            getAllFields()
        }, []
    )
    const editItem = async (event) => {
        event.preventDefault()
        navigate("/EditQuiz1/" + props.id + "/", { state: { id: props.id, title: props.title, nr_of_categories: props.nr_of_categories, nr_of_rows: props.nr_of_rows, fields: fields } })

    }

    return (
        <div className='d-inline-block custom-card m-3'
            style={{
                /* Move the element to the right by 50% of the container's width */
                // left: '50%',
                /* Calculates 50% of the element's width, and moves it by that */
                /* amount across the X-axis to the left */
                transform: 'translateX(25%)',
                backgroundColor: '#D9D9D9',
                width: '287px',
                height: '287px'
            }}>
            <div className='d-flex justify-content-center p-3'>
                <p className='quiz-title' onClick={display}> {props.title} </p>
            </div>
            <div className='d-flex justify-content-center p-3'>
                <p className='body-text'> {props.nr_of_categories} categories</p>
            </div>
            <div className='d-flex justify-content-center p-3'>
                <p className='body-text text-muted'> Created: {props.pub_date}</p>
            </div>
            <div className='d-flex justify-content-center p-3'>
                <div className='row '>
                    <button className="col me-3 my-btn " onClick={editItem}>Edit</button>
                    <button className="col my-btn" onClick={props.deleteItem}>Delete</button>
                </div>
            </div>
            <style jsx="true">
                {`.custom-card{
                    border-radius: 1rem
                }
                .my-btn{
                    border-radius: 0.5rem;
                    background-color: #e7e7e7;
                    border-color: #e7e7e7;
                    color: black;
                }
                
                .my-btn:hover {
                    background: white ;
                }
                .quiz-title{
                    font-weight: 500;
                }
                .quiz-title:hover{
                    font-size: 1.2rem;
                    color:blue;
                    cursor: pointer;
                }
                  `
                }
            </style>
        </div>

    );
}

export default Quiz;