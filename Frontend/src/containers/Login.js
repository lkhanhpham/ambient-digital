import React, { useState , useEffect} from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {API_BASE_URL} from "../constants.ts";
// import {simplejwt} from 'djangorestframework-simplejwt'


export default function Login() {
  const [token, setToken]= useState()
  
  const getLoginUser = async () => {
    const response = await fetch(`${API_BASE_URL}/api/token`) 
    const data = await response.json()
    if (response.ok) {
      console.log(data)
      setToken(data.token)
    }
    else {
        //console.log(response.status)
      console.log("Failed Network request")
    }

  }
  useEffect(
    () => {
      getLoginUser();
    }, []
  )

  const [username, setUserName] = useState();

  const [password, setPassword] = useState();

  const handleSubmit = async e => {

    e.preventDefault();

    const token = await getLoginUser({

      username,

      password

    }); 

    setToken(token);

  }

  return(

    <div className="login-wrapper">

      <h1>Please Log In</h1>

      <form onSubmit={handleSubmit}>

      <div>
            <label>
            <p>Username</p>
            <input type="text" onChange={e => setUserName(e.target.value)} />
            </label>
        </div>
        
        <div>
            <label>
                <p>Password</p>
                <input type="password" onChange={e => setPassword(e.target.value)} />
            </label>
        </div>
        <div>

          <button type="submit">Submit</button>
          <Link to ="/Registration"> create account</Link>

        </div>

      </form>

    </div>

  )

}

Login.propTypes = {

  setToken: PropTypes.func.isRequired

};