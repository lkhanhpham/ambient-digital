import { Link, useNavigate} from "react-router-dom";
import { useLocation } from "react-router-dom";
import {React, useEffect } from 'react';
import Quiz from '../components/QuizCard';



const QuizFormEdit = (quizid) => {

    const location = useLocation();
    const idQuiz= location.state.id

    const url= "http://localhost:8000/api/quiz/"+idQuestion+"/";
   
    const [quizName, setQuizName] = useState('')
    const [nrOfRows, setNrOfRows] = useState('')
    const [nrOfCols, setNrOfCols] = useState('')
    const [author, setAuthor] = useState('')


    const navigate = useNavigate();
    
    
 function deleteItem(event){
        event.preventDefault()
        console.log(idQuiz)
        if (window.confirm('Do you really want to delete this question?')){
            axios(
                {
                    method: "DELETE",
                    url: url,
                    headers: {'Content-Type': 'application/json'}
                }
            ).then((response) => {
                console.log(response.data)
            })

            navigate("/Library", 
            )
        }else{
            // They clicked no
        }
        
    }

    function editQuiz(event){
        event.preventDefault()
        axios(
            {
                method: "PUT",
                url: url,
                data: {
                    quiz_name: quizName,
                    nr_of_rows: nrOfRows,
                    nr_of_categories: nrOfCols,
                    author: author,
                }
            } 
        )
        
        
    }
    const getAllQuizzes = async () => {
        
        const response = await fetch(url) 
        const data = await response.json()
        if (response.ok) {
            console.log(data)
            setQuiz(data)
            console.log(quizId)
        }
        else {
            
            console.log("Failed Network request")

        }
    
    }
}
    useEffect(

        () => {
            getAllQuizzes();
        }, []
    )

    function editQuestion(event){
        event.preventDefault()       
        axios(
            {
                method: "PUT",
                url: url,
                data: {
                    quiz_name: quizName,
                    nr_of_rows: nrOfRows,
                    nr_of_categories: nrOfCols,
                    author: author,
                },
                headers: {'Content-Type': 'application/json'}
            }
        ).then((response) => {
            console.log(response.data)
        })
        setAuthorId(1)
        event.preventDefault()
        navigate("/QuizCreator/NewQuiz", 
            {state: 
                {
                    quiz_name: quizName,
                    nr_of_rows: nrOfRows,
                    nr_of_categories: nrOfCols,
                    author: author,
                }
            } 
        )
        
    
    
    return (
        <> 
        <div className="text-dark d-flex justify-content-center align-self-center pt-3 pb-3">
        <h3 className="big-title">Edit Quiz</h3>
    </div>
    <div className="row justify-content-center">

        <div className="custom-card col-lg-6 col-md-8 p-5 bg-dark justify-content-center align-self-center">
            <form className="text-light">
                <div className="form-group m-3">
                    <label className="mb-2"  htmlFor="exampleFormControlInput1">Quiz Name</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1"
                        placeholder="New quiz"
                        text={quizName}
                        onChange={(e) => setQuizName(e.target.value)}></input>
                </div>
                <div className="form-group m-3">
                    <label className="mb-2" htmlFor="exampleFormControlSelect1">Number of Rows</label>
                    <select  className="form-control" id="NrOfRows" onChange={update}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                    </select>
                </div>
                <div className="form-group m-3">
                    <label className="mb-2"  htmlFor="exampleFormControlSelect1">Number of Categories</label>
                    <select className="form-control" id="NrOfCols" onChange={update}>
                    <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                    </select>
                </div>
                <div className="form-group m-3">
                    <label className="mb-2"  htmlFor="exampleFormControlInput1">Author</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1"
                        placeholder="Author"
                        text={author}
                        onChange={(e) => setAuthor(e.target.value)}></input>
                </div>

            </form>

            <div className="d-flex justify-content-end p-3">
                    <Link to ="/Library">
                    <button  className="btn btn-secondary me-2" onClick={deleteItem} >Delete</button> 
                    </Link>
                    <Link to ="/Library">
                    <button className="btn btn-secondary me-2">Cancel</button>
                    </Link>
                    <button  className="btn btn-primary" onClick={editQuiz}>Update</button>
                    
                </div>
        </div>
    </div>
            
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

export default QuisFormEdit;
