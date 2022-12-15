
import axios from "axios"
import React from "react";
import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom";
import $ from "jquery";
import ModalSuccess from "../components/ModalSuccess";
import ModalWarning from "../components/ModalWarning";
import { API_BASE_URL } from "../constants.ts";
import Select from 'react-select'
import TeamCard from "../components/TeamCard";

//create new teams

const Teams = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [teamName, setTeamName] = useState('')
    const [teamPoints, setTeamPoints] = useState('')
    const quizId = location.state.quizId
    const [User, setUser] = useState([])
    const [UserId, setUserId] = useState([])
    const [userName, setUserName] = useState([])
    const [teamId, setTeamId] = useState(0)
    const [teamIds] = useState([])
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

    const [showWarning2, setShowWarning2] = useState(false);
    const handleShowWarning2 = () => setShowWarning2(true);
    const handleCloseWarning2 = () => setShowWarning2(false);



    const [userOptions, setUserOptions] = useState([""])

    const getAllUser = async () => {
        const response = await fetch(`${API_BASE_URL}/api/user/`)
        const data = await response.json()
        var arr = []
        if (response.ok) {
            //console.log(data)
            data.map((user) => {
                return arr.push({ value: user.id, label: user.username })
            })
            setUserOptions(arr)
            setUser(data)
        }
        else {
            //console.log(response.status)
            console.log("Failed Network request")
        }
    }

    const teams = useState([])

    const getAllTeams = async () => {
        const response = await fetch(`${API_BASE_URL}/api/Teams/`)
        const data = await response.json()
        // var arr = []
        if (response.ok) {
            //console.log(data)
            data.map((team) => {
                if (team.quiz === quizId) {
                    if (!teamNames.includes(team.team_name)) {
                        teamNames.push(team.team_name)
                        teamIds.push(team.id)
                    }
                }
            })
            // refresh()
        }
        else {
            //console.log(response.status)
            console.log("Failed Network request")
        }
    }

    const deleteItem = (teamId) => {
        axios(
            {
                method: "DELETE",
                url: `${API_BASE_URL}/api/Teams/` + teamId + "/",
                headers: { 'Content-Type': 'application/json' }
            }
        ).then((response) => {
            console.log(response.data)
            // refresh()
        })
        getAllTeams()
        // refresh()
        window.location.reload();

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

    }



    function createTeam(event) {
        //setTeamPoints(100)

        if (teamName === "") {
            handleShowWarning1()
        }

        else if (teamNames.includes(teamName)) {
            handleShowWarning2();
        }
        else {
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
                    headers: { 'Content-Type': 'application/json' }
                }
            ).then((response) => {
                console.log(response.data)
                setTeamId(response.data.id)
                teamIds.push(response.data.id)
            })
            confirm()
            refresh()

        }
        event.preventDefault()

    }


    function saveMember() {

        var select1 = document.getElementById('User')
        const id = select1.options[select1.selectedIndex].value
        console.log(id)
        const username = (User.find(item => item.id == id).username)
        const object = { username: username, teamName: teamName }
        MemberName.push(object)
        //const text = (select1.options[select1.selectedIndex].text)
        if (!UserId.includes(id) & teamId != 0) {
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
                    headers: { 'Content-Type': 'application/json' }
                }
            ).then((response) => {
                console.log(response.data)
                refresh()

            })
        }
        else if (UserId.includes(id)) {
            handleShowWarning()
        }
        else {
            handleShowWarning1()
        }

    }


    function showTeams() {
        console.log("teams length", teamNames)
        while(teams.length){teams.pop()}
        if (teamNames.length > 0) {
            const temp1 = []
            const temp2 = []
            for (let i = 0; i < teamNames.length; i++) {
                if (i < teamNames.length / 2) {
                    temp1.push(<TeamCard teamName={teamNames[i]} teamId={teamIds[i]} deleteItem={() => deleteItem(teamIds[i])} />)
                } else {
                    temp2.push(<TeamCard teamName={teamNames[i]} teamId={teamIds[i]} deleteItem={() => deleteItem(teamIds[i])}/>)
                }
            }
            teams.push(<div className="d-flex"><div className="d-flex flex-column">{temp1}</div><div className="d-flex flex-column"> {temp2}</div></div>)
            // console.log(teams)
        }
       
        console.log("teams created", teams)
    }
    showTeams();

    useEffect(
        () => {
            getAllUser();
            getAllTeams()
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

                        <label className="mb-2" htmlFor="exampleFormControlInput1">Team name</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1"
                            placeholder="New Team"
                            text={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                        ></input>
                        <button onClick={createTeam} className="btn btn-primary">Create Team</button>
                        <div></div>

                    </form>
                    <Link to="../../createGuest" target='_blank'>
                        <button className="small-button mt-3">Create member</button>
                    </Link>


                    <div className="d-flex justify-content-end p-3">
                        <Link to="/Library">
                            <button className="btn btn-secondary me-2" >Cancel</button>
                        </Link>
                        {/* <button onClick={() => saveMember()} className="btn btn-primary">Create</button>  */}

                    </div>

                    <ModalWarning showWarning={showWarning1} handleCloseWarning={handleCloseWarning1} title={"Oops! You forgot to add a Team name"} body={"Choose a Team name"} />
                    <ModalWarning showWarning={showWarning2} handleCloseWarning={handleCloseWarning2} title={"Oops! This Team already exists"} body={"Please choose another Team name"} />
                    <ModalWarning showWarning={showWarning} handleCloseWarning={handleCloseWarning} title={"Oops! This player already has a team"} body={"Choose another name"} />
                    <ModalSuccess showSuccess={show} handleCloseSuccess={handleClose} onclick={handleClose} title={"New team created!"} body={"Team created with name: " + teamName} />
                    {/* <ModalSuccess showSuccess={showSuccess} title={"Finished!"} body={"Your quiz is finished and ready to be played!"} onclick={createMember} /> */}
                </div>
            </div>
            <div className="text-dark d-flex justify-content-center align-self-center pt-5 pb-3">
                <h3 className="big-title">My Teams</h3>
            </div>
            {teamNames.length>0 ? (
                <div className="p-3 d-flex justify-content-center align-items-center">
                    {teams}
                </div>
            ) : (
                <div className="p-3 d-flex justify-content-center align-items-center">
                    <p>You haven't created any team for this quiz.</p>
                </div>
            )}

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