
import axios from "axios"
import React from "react";
import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation} from "react-router-dom";
import $ from "jquery";
import ModalSuccess from "../components/ModalSuccess";
import ModalWarning from "../components/ModalWarning";
import {API_BASE_URL} from "../constants.ts";


//create new teams

const Teams = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [teamName, setTeamName] = useState('')
    const [teamPoints, setTeamPoints] = useState('')
    const quizId = location.state.quizId
    const[User, setUser] = useState([])
    const[UserId, setUserId] = useState([])
    const [userName, setUserName] = useState([])
    const [teamId, setTeamId] = useState(0)
    const [position, setPosition] = useState(0)
    const [MemberName, setMemberName] = useState([])
    const [teamNames, setTeamNames] = useState([])
    


    const [chosen] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleCloseWarning = () => setShowWarning(false);
    const handleShow = () => setShow(true);
    const confirm = () => {
        handleShow()
    }
    const [showWarning, setShowWarning] = useState(false);
    const handleShowWarning = () => setShowWarning(true);
    
    const [showWarning1, setShowWarning1] = useState(false);
    const handleShowWarning1 = () => setShowWarning1(true);
    const handleCloseWarning1 = () => setShowWarning1(false);

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
    
    const update = () => {
        var select1 = document.getElementById('User')
        const id = select1.options[select1.selectedIndex].value
        console.log(select1)
        //setMemberName(id)
        
        //console.log(select1.options[select1.selectedIndex].value);
    }

    const [value, setValue] = useState(0);
    const refresh = () => {
        // it re-renders the component
        setValue(value + 1);
        // createdGrid()
    }
    

    



 function createTeam(event) {
    //setTeamPoints(100)
    teamNames.push(teamName)
    console.log(teamNames)

        axios(
            {
                method: "POST",
                url: `${API_BASE_URL}/api/Teams/`,
                data: {

                    team_name: teamName,
                    team_points: 0,
                    quiz: quizId,                
                },
                headers: {'Content-Type': 'application/json'}
            }
        ).then((response) => {
            console.log(response.data)
            setTeamId(response.data.id)
        })
        confirm()
        event.preventDefault()
    }


    function saveMember() {
        
        var select1 = document.getElementById('User')
        const id = select1.options[select1.selectedIndex].value
        console.log(id)
        const username = (User.find(item => item.id == id).username)
        const object = {username: username, teamName: teamName}
        MemberName.push(object)
        //const text = (select1.options[select1.selectedIndex].text)
        if(!UserId.includes(id) & teamId != 0){
           UserId.push(id)
           console.log(UserId)
        
            axios(
                {
                    method: "POST",
                    url: `${API_BASE_URL}/api/AddTeammates/`,
                    data: {
                    team: teamId,
                    member: id
                                     
                    },
                    headers: {'Content-Type': 'application/json'}
                }
            ).then((response) => {
                console.log(response.data)
                refresh()

            })
        }
        else if (UserId.includes(id)){
            handleShowWarning()
        }
        else {
            handleShowWarning1()
        }

    }

    const teams = useState([])
    function showTeams() {
        if(teamNames.length > 0){
        for (let i = 0; i < teamNames.length; i++) {
            teams.push(<h1>{teamNames[i]}</h1>)
            for (let j = 0; j < MemberName.length; j++){
                if(MemberName[j].teamName == teamNames[i]){
                    teams.push(<h3>{MemberName[j].username}</h3>)
                }
            }
        }
        console.log(teams)
    }

    }
    showTeams()

    useEffect(
        () => {
            getAllUser();
        }, []
    )

    return (
        <>
            <div className="text-dark d-flex justify-content-center align-self-center pt-3 pb-3">
                <h3 className="big-title">New Team</h3>
            </div>
            <div className="row justify-content-center">

                <div className="custom-card col-lg-6 col-md-8 p-5 bg-dark justify-content-center align-self-center">


                    <form className="text-light">

                        <label className="mb-2"  htmlFor="exampleFormControlInput1">Team name</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1"
                            placeholder="New Team"
                            text={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                        ></input>
                        <button onClick={createTeam} className="btn btn-primary">Set Teamname</button>
                        <div></div>
                       
                        <label className="mb-2"  htmlFor="exampleFormControlInput1">Team Members</label>
                        <select className="form-control mb-4" id="User" onChange={update}>
                            {User.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.username}
                                    
                                </option>
                            ))}
                            
                           
                         </select> 

                    </form>
                    <Link to="../../createGuest" target='_blank'>
                        <button className="small-button mt-3">Create member</button>
                         </Link>


                <div className="d-flex justify-content-end p-3">
                    <Link to ="/Library">
                    <button className="btn btn-secondary me-2" >Cancel</button>
                    </Link>       
                    <button onClick={() => saveMember()} className="btn btn-primary">Create</button> 
                                   
                </div>
                
                <ModalWarning showWarning={showWarning1} handleCloseWarning={handleCloseWarning1} title={"Oops! You forgot to add a Teamname"} body={"Choose a Teamname"} />
                <ModalWarning showWarning={showWarning} handleCloseWarning={handleCloseWarning} title={"Oops! This player already has a team"} body={"Choose another name"} />
                <ModalSuccess showSuccess = {show} handleCloseSuccess = {handleClose} title = {"New team created!"} body = {"Team created with name: " + teamName}  />
                {/* <ModalSuccess showSuccess={showSuccess} title={"Finished!"} body={"Your quiz is finished and ready to be played!"} onclick={createMember} /> */}
                </div>
            </div>
            <div>
                {teams}
            </div>
            <style jsx='true'>{`
        label{
          font-size: 18px;
        }
        .custom-card{
            border-radius: 1rem;
        }
        .right{
            text-align: right;
        }
        .rechts-oben{
            padding:2%;
        }
      `}</style>
        </>
    );

}

export default Teams;