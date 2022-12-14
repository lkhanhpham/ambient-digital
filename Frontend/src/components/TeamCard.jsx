import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../constants.ts";
import Select from 'react-select'

// For each created quiz one quizcard is rendered
const TeamCard = (props) => {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [userOptions, setUserOptions] = useState([])
    const handleTypeSelect = (e) => {
        let value = Array.from(e, option => option.label);
        console.log(value)
        selectedUsers.push(value)
      };
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
            // setUser(data)
        }
        else {
            //console.log(response.status)
            console.log("Failed Network request")
        }
    }

    useEffect(
        () => {
            getAllUser()
        }, []
    )
    return (
        <div className='team-card d-flex flex-column justify-content-center m-2'>
            <div className='align-self-end p-2'><img src='/XCircle.png'className='' width = "32px" height = "32px"></img></div>
            <h1 className='small-title align-self-center text-light'>{props.teamName}</h1>
            <span>{props.teamId}</span>
            <div className='d-flex flex-column justify-content-center ps-3 pe-3'>
            <p className='text-light'>Add members</p>
            <div className="pb-3">
                <Select
                    placeholder="Select users"
                    options={userOptions}
                    onChange = {handleTypeSelect}
                    // loadOptions = {loadOptions}
                    // noOptionsMessage={()=>"name not found"}
                    isMulti
                    noOptionsMessage = {()=>"No such user found"}
                />
            </div>

            </div>

            <style jsx="true">{
                `
                .team-card{
                    width: 500px;
                    height: auto;
                    border-radius: 1rem;
                    background-color: #CA6702;
                }
                `
            }
                
            </style>
        </div>

    );
}

export default TeamCard;