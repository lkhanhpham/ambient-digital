import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../constants.ts";

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
        navigate("/Quiz/" + props.id + "/", { state: { id: props.id, title: props.title, nr_of_categories: props.nr_of_categories, fields: fields } })
    }

    const addTeam = (event) => {
        event.preventDefault()
        navigate("/QuizCreator/TeamsCreator/", { state: { quizId: props.id, title: props.title, nr_of_categories: props.nr_of_categories } })
    }

    useEffect(
        () => {
            getAllFields()
        }, []
    )
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
            <div className='d-flex justify-content-center pt-3'>
                <p className='body-text'> {props.nr_of_categories} categories</p>
            </div>
            <div className='d-flex justify-content-center'>
                <p className='body-text text-muted'> Created: {props.pub_date}</p>
            </div>
            <div className='d-flex justify-content-center my-div'>
                <button className="col my-btn" onClick={addTeam}>Add teams</button>
            </div>
            <div className='d-flex justify-content-center p-3'>
                <div className='row'>
                    <button className="col me-3 my-btn " onClick={props.editItem}>Edit</button>
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
                .my-div{
                    padding-left: 80px;
                    padding-right: 80px;
                }
                `
                }
            </style>
        </div>

    );
}

export default Quiz;