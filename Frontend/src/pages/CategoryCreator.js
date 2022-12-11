import { useState } from "react"
import { useLocation } from "react-router-dom";
import axios from "axios"
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ModalSuccess from "../components/ModalSuccess";
import { API_BASE_URL } from "../constants.ts";
const CategoryCreator = () => {
    const location = useLocation();
    const quiz_name = location.state.quiz_name
    const nr_of_rows = location.state.nr_of_rows
    const nr_of_categories = location.state.nr_of_categories
    const quizId = location.state.quizId

    const [catName, setCatName] = useState('')
    const [showSuccess, setShowSuccess] = useState(false);
    //show the success notification
    const handleShowSuccess = () => setShowSuccess(true);
    const handleCloseSuccess = () => setShowSuccess(false)
    function createCat(event) {

        axios(
            {
                method: "POST",
                url: `${API_BASE_URL}/api/categorie/`,
                data: {
                    categorie_name: catName,
                },
                headers: { 'Content-Type': 'application/json' }
            }
        ).then((response) => {
            //console.log(response.data)
            handleShowSuccess()
            setCatName("")
        })

        event.preventDefault()
    }
    const navigate = useNavigate()
    function navigateBack(event) {
        event.preventDefault()
        navigate("../QuizCreator/NewQuiz1",
        {
            state: {
                quiz_name: quiz_name, nr_of_rows: nr_of_rows,
                nr_of_categories: nr_of_categories,
                quizId: quizId
            }
        })
    }


    return (
        <>
            <div className="text-dark d-flex justify-content-center align-self-center pt-3 pb-3">
                <h3 className="big-title">New Category</h3>
            </div>
            <div className="row justify-content-center">

                <div className="custom-card col-lg-6 col-md-8 p-5 bg-dark justify-content-center align-self-center">
                    <form className="text-light">
                        <div className="form-group m-3">
                            <label className="mb-2" htmlFor="exampleFormControlInput1">Category Name</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1"
                                placeholder="New Category"
                                text={catName}
                                onChange={(e) => setCatName(e.target.value)}
                            ></input>
                        </div>

                    </form>

                    <div className="d-flex justify-content-end p-3">
                        <Link to="/Library">
                            <button className="btn btn-secondary me-2" >Cancel</button>
                        </Link>
                        <button onClick={createCat} className="btn btn-primary">Create</button>

                    </div>
                </div>
            </div>
            <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 d-flex justify-content-start pt-3">
                <button onClick={navigateBack} className="btn btn-primary">Back</button>
            </div>
            </div>
            <ModalSuccess showSuccess={showSuccess} handleCloseSuccess={handleCloseSuccess} title={"Category created"} body={"You can now close this tab and continue or create some more categories."} onclick={handleCloseSuccess} />
            <style jsx='true'>{`
        label{
          font-size: 18px;
        }
        .custom-card{
            border-radius: 1rem;
        }
       
      `}</style>
        </>
    );
}

export default CategoryCreator;