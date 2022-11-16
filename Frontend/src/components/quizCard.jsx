import React, { useState, useEffect } from 'react';
// For each created quiz one quizcard is rendered
const Quiz = ({ title, pub_date, nr_of_categories, deleteItem, editItem }) => {

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
                <p className='quiz-title'> {title} </p>
            </div>
            <div className='d-flex justify-content-center p-3'>
                <p className='body-text'> {nr_of_categories} categories</p>
            </div>
            <div className='d-flex justify-content-center p-3'>
                <p className='body-text text-muted'> Created: {pub_date}</p>
            </div>
            <div className='d-flex justify-content-center p-3'>
                <div className='row '>
                    <button className="col me-3 my-btn " onClick={editItem}>Edit</button>
                    <button className="col my-btn" onClick={deleteItem}>Delete</button>
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
                  `
                }
            </style>
        </div>

    );
}

export default Quiz;