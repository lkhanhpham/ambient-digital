import React, { useState } from 'react';
import axios from "axios"
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {API_BASE_URL} from "../constants.ts";

//import './Login.css';

async function loginUser(user_name, password1, password2, emailV) {

    axios(
        {
            method: "POST",
            url: `${API_BASE_URL}/api/registration/`,
            data: {
                username: user_name,
                password: password1,
                password2: password2,
                email:   emailV        
            },
            headers: {'Content-Type': 'application/json'}
        }
    ).then((response) => {
        console.log(response.data)
    })

}

export default function Login({ setToken }) {

  const [user_nameV, setUserName] = useState();

  const [passwordV, setPassword] = useState();

  const [password2V, setPassword2] = useState();

  const [emailV, setEmail] = useState();

  const handleSubmit = async e => {

    e.preventDefault();

    const token = await loginUser(

        user_nameV,
        passwordV,
        password2V,
        emailV

    );

  }

  return(
    <>
        <div className="login-wrapper">

        <h1>Please create account</h1>

        <form onSubmit={handleSubmit}>
            <div>
                <label>
                <p>Username: </p>
                <input type="text" onChange={e => setUserName(e.target.value)} />
                </label>
            </div>
            
            <div>
                <label>
                    <p>E-Mail: </p>
                    <input type="email" onChange={e => setEmail(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    <p>Password: </p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    <p>Password (again): </p>
                    <input type="password" onChange={e => setPassword2(e.target.value)} />
                </label>
            </div>

            <div>
            <button type="submit">Submit</button>
            <Link to ="/Login"> login</Link>
            </div>

        </form>

        </div>
        <style jsx='true'>{`
        label{
            font-size: 18px;
            padding-top: 10px;
        }
        form{
            padding: 10px;
        }
        `}</style>
        </>

    );

}