import { useLocation} from "react-router-dom";
import Field from "../components/Field";
import CatField from "../components/CatField";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import Modal from 'react-bootstrap/Modal';
import ModalWarning from "../components/ModalWarning";
import ModalSuccess from "../components/ModalSuccess";
import axios from "axios"
import {API_BASE_URL} from "../constants.ts";


const AddTeams =() => {
    const location = useLocation();

    const quiz_name = location.state.quiz_name
    const quizId = location.state.quizId
    const [user, setUser] = useState([])
    const navigate = useNavigate();
    const [teams, setTeams] = useState([])

    const [team_text] = useState([""])
    const [team_ids] = useState([0])
    const team_name = location.state.team_name
    const [userName] = useState([""]) 


    const [cat_name] = useState([])
    const [catIds] = useState([])

    const [chosen] = useState([false])

    const [cats, setCats] = useState([])

    const [show, setShow] = useState(false);

    const [position, setPosition] = useState(0)

    const [valid, setValid] = useState(false)

    //close the Category form
    const handleClose = () => setShow(false);
    //show the Category form
    const handleShow = (keyProp) => {
        setShow(true);
        setPosition(keyProp)
    }

    //a Warning if the required data is missing and user cannot proceed
    const [showWarning, setShowWarning] = useState(false);

    const handleCloseWarning = () => setShowWarning(false);

    const handleShowWarning = () => setShowWarning(true);

    //a Warning if the category already exists in the quiz and user cannot proceed
    const [showWarning1, setShowWarning1] = useState(false);

    const handleCloseWarning1 = () => setShowWarning1(false);

    const handleShowWarning1 = () => setShowWarning1(true);


        //fetch all created users
        const getAllUser = async () => {
            const response = await fetch(`${API_BASE_URL}/api/user/`)
            const data = await response.json()
            if (response.ok) {
                //console.log(data)
                setUser(data)
            }
            else {
                //console.log(response.status)
                console.log("Failed Network request")
    
            }
        }

          //fetch all created teams
          const getAllTeams = async () => {
            const response = await fetch(`${API_BASE_URL}/api/Teams/`)
            const data = await response.json()
            if (response.ok) {
                //console.log(data)
                setTeams(data)
            }
            else {
                //console.log(response.status)
                console.log("Failed Network request")
    
            }
        }

    
        //createing a array to store all teammembers
    
    //  for (let i = 0; i < teamMember_team.length ; i++) {
    //     // note: we are adding a key prop here to allow react to uniquely identify each
    //     // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
    //     teamMember_team.push(<CatField key={i} username={"user"} id={location.state.user.id} handleShow={() => handleShow(i)}
    //         chosen={chosen[i]} keyProp={i} />);
    //     }


    //save chosen teams and show in field
    function saveTeams() {
        var select1 = document.getElementById('Teams')
        const text = (select1.options[select1.selectedIndex].text)
        const id = select1.options[select1.selectedIndex].value
        if(!team_name.includes(id)){
            team_text = text
            team_ids = id
            chosen = true
        }
        else{
            handleShowWarning1()
        }
       
        handleClose()
    }


    // const [memberList, setMemberList] = useState([{teamMember_team: ""}])
    // function saveTeamMembers() {
    //     var select2 = document.getElementById('user')
    //     const userText = (select2.options[select2.selectedIndex].text)
    //     const userId = select2.options[select2.selectedIndex].value
    //     if(!team_name.includes(id)){
            
    //     }
    //     else{
    //         handleShowWarning1()
    //     }
        
    //     handleClose()
    // }


    const update = () => {
        var select1 = document.getElementById('Teams')
        //console.log(select1.options[select1.selectedIndex].value);
    }

    useEffect(
        () => {
            getAllUser();
           
        }, []
    )

    
    useEffect(
        () => {
     
            getAllTeams();
        }, []
    )


    return (
        <div className="container">
            <div className="text-dark d-flex justify-content-center align-self-center pt-3 pb-3">
                <h3 className="small-title">{quiz_name} </h3>
            </div>
            <div className="text-dark d-flex justify-content-center align-self-center pt-3 pb-3">
                <h3 className="body-text">Choose your Team</h3>
            </div>
            <div className="row justify-content-center p-3">
                    <select className="form-control mb-4" id="Teams" onChange={update}>
                            {teams.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.team_name}
                                </option>
                            ))}
                     </select>
            </div>  
            <Link to="../../TeamsCreator" target='_blank'>
                        <button className="small-button mt-3">Create team</button>
            </Link> 
            <div className="text-dark d-flex justify-content-center align-self-center pt-3 pb-3">
                <h3 className="body-text">Choose Members</h3>
            </div>
            <div className="row justify-content-center p-3">
                    <select className="form-control mb-4" id="teamMember_team" onChange={update}>
                            {user.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.userName}
                                </option>
                            ))}
                     </select>
                    {/*  <button onClick={() => saveTeamMembers()} className="btn btn-primary">save</button> */}
            </div> 
            <Link to="../../createGuest" target='_blank'>
                        <button className="small-button mt-3">Create member</button>
            </Link>  
            <div className="row justify-content-center p-3">
                <div className="col-12 d-flex flex-row justify-content-center">
                    {teams}
                </div>
            </div>

            <div className="d-flex justify-content-end p-3">
            <button onClick={() => saveTeams()} className="small-button mt-3">Add Team</button>
            </div>
            <ModalWarning showWarning = {showWarning} handleCloseWarning = {handleCloseWarning} title = {"Oops! You forgot something"} body = {"Please pick all categories to proceed"} />
            <ModalWarning showWarning={showWarning1} handleCloseWarning={handleCloseWarning1} title={"Category is not unique."} body={"Looks like this category exists in your quiz. Please choose another one."} />
        </div>
    )
}
export default AddTeams;