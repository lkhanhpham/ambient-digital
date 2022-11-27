import { useLocation } from "react-router-dom";
import Field from "../components/Field";
import CatField from "../components/CatField";
import { Link, useNavigate} from "react-router-dom";
import { useState } from "react";
const NewQuiz1 = () => {
    const location = useLocation();
    const quiz_name = location.state.quiz_name
    const nr_of_rows = location.state.nr_of_rows
    const nr_of_categories = location.state.nr_of_categories

    const [categories, setCategories] = useState([])

    // //create an array that stores all the fields on a row
    // const fields = []
    // for (let i = 0; i < nr_of_categories; i++) {
    //     var points = 100;
    //     fields.push(<Field key={i} points = {100} />)
    //     points +=100;
    // }
    // //creates an array that stores all the rows in the quiz
    // const rows=[];
    // for(let i = 0; i< nr_of_rows; i++){
    //     rows.push(<div className="d-flex justify-content-center">{fields}</div>)
    // }

    //create an array that stores the categories' names
    const cols = [];
    for (let i = 0; i < nr_of_categories; i++) {
        // note: we are adding a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        cols.push(<CatField key={i} category_name = "Dummy Category"/>);
    }


    const navigate = useNavigate();
    //after user chooses the categories, proceed to next step to add questions
    const nextStep=()=>{
        
        navigate("/QuizCreator/Newquiz2", {state: {quiz_name: quiz_name, nr_of_rows: nr_of_rows,
             nr_of_categories: nr_of_categories, categories: categories}},)
    }






    return (
        <div className="container">
            <div className="text-dark d-flex justify-content-center align-self-center pt-3 pb-3">
                <h3 className="small-title"> {quiz_name} </h3>
            </div>
            <div className="text-dark d-flex justify-content-center align-self-center pt-3 pb-3">
                <h3 className="body-text">1. Choose your categories</h3>
            </div>
            <div className="row justify-content-center p-3">
                <div className="col-12 d-flex flex-row justify-content-center">
                    {cols}
                </div>
                {/* <div className="col-12 d-flex flex-column ">
                    {rows}
                </div> */}

            </div>
            <div className="d-flex justify-content-end p-3">
                    {/* <Link to = {{pathname: "/QuizCreator/NewQuiz",
                    state: {quiz_name: quizName, nr_of_rows: nrOfRows, nr_of_categories: nrOfCols}}}
                    > */}
                    <button onClick = {nextStep} className="btn btn-primary">Next</button>
                    {/* </Link> */}
                </div>

        </div>
    )
}
export default NewQuiz1;