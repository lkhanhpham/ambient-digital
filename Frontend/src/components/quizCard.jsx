import React, { useState, useEffect } from 'react';
const Quiz = ({ title, pub_date, nr_of_categories, onClick }) => {

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
                <p className='body-text'> {title} </p>
            </div>
            <div className='d-flex justify-content-center p-3'>
                <p className='body-text'> {nr_of_categories} categories</p>
            </div>
            <div className='d-flex justify-content-center p-3'>
                <p className='body-text text-muted'> Created: {pub_date}</p>
            </div>
            <style jsx="true">
                {`.custom-card{
                    border-radius: 1rem
                }
                .body-text{
                    font-size: 1rem
                }
                  `
                }
            </style>
        </div>

    );
}

export default Quiz;