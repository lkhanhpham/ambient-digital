import React, { useState, useEffect } from 'react';
// import Modal from 'react-bootstrap/Modal';
const CatField = (props) => {

    return (
        <>
            <div onClick={props.handleShow} className="custom-card d-flex justify-content-center">
                {props.chosen? (
                    <p className="align-self-center">
                    {props.cat_name}</p>
                ):(
                    <p className="align-self-center">
                    {props.category_name}</p>
                )}
                
            </div>

            
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