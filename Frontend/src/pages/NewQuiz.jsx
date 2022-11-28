import { Component } from "react";
import { useLocation } from "react-router-dom";
import Field from "../components/Field";
import CatField from "../components/CatField";
const NewQuiz = () => {
    const location = useLocation();
    const quiz_name = location.state.quiz_name
    const nr_of_rows = location.state.nr_of_rows
    const nr_of_categories = location.state.nr_of_categories

    //create an array that stores all the fields on a row
    const fields = []
    for (let i = 0; i < nr_of_categories; i++) {
        fields.push(<Field key='i' />)
    }
    //creates an array that stores all the rows in the quiz
    const rows=[];
    for(let i = 0; i< nr_of_rows; i++){
        rows.push(<div className="d-flex justify-content-center">{fields}</div>)
    }

    //create an array that stores the categories' names
    const cols = [];

    for (let i = 0; i < nr_of_categories; i++) {
        // note: we are adding a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        cols.push(<CatField key={i} />);
    }
    return (
        <div className="container">
            <div className="text-dark d-flex justify-content-center align-self-center pt-3 pb-3">
                <h3 className="small-title"> {quiz_name} </h3>
            </div>
            <div className="row justify-content-center p-3">
                <div className="col-12 d-flex flex-row justify-content-center">
                    {cols}
                </div>
                <div className="col-12 d-flex flex-column ">
                    {rows}
                </div>

            </div>
            <style jsx="true">{

                `
            .break{
            flex-basis: 100%;
            height: 0;
                }
                `
            }
            </style>
        </div>
    )
}
export default NewQuiz;