import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {API_BASE_URL} from "../constants.ts";

const PlayingField = (props) => {
    const navigate = useNavigate()
    const [question, setQuestion] = useState([])
    const getAllQuestions = async () => {
        const response = await fetch(`${API_BASE_URL}/api/question/` + props.id + "/")
        const data = await response.json()
        if (response.ok) {
            //console.log(data.field_quiz)
            setQuestion(data)
        }
        else {
            //console.log(response.status)
            console.log("Failed Network request")

        }
        
    }
    const display = (event) => {
        event.preventDefault()
        const statusString = localStorage.getItem(props.quizid);
        const status = JSON.parse(statusString);
        if (status[props.position]===0){
            status[props.position]=1
            localStorage.setItem(props.quizid, JSON.stringify(status));
            navigate(props.quizid +"/Question/" + props.id + "/", { state: { id: props.id ,question:question, position:props.position, categorie:props.categorie,points:props.points} })}
        else{

        }
    }
        useEffect(
        () => {
            getAllQuestions()
        }, []
    )
    return (
        <>
            <div onClick={display} className="card field d-flex  rounded-0 justify-content-center" style={{backgroundColor:props.status1>0 ?'#6c757d':'white'}}>
                <p className="align-self-center">{props.points}</p> 
                
            </div>
            <style jsx="true">{

                `
    .card{
            width: 160px;
            height: 80px;
            border: solid 2px black;
    }
    .field:hover{
        cursor: pointer;
        border: solid 3px black;
    }
        `
            }
            </style>
        </>
    )
}
export default PlayingField;