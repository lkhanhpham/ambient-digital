import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from 'react-router-dom';


function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const { registerUser } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    registerUser(username, email, password, password2);
  };

  return (
    <section>
        <div className="login-wrapper">

            <form onSubmit={handleSubmit}>
                <h1>Create a new Account</h1>
                <hr />
                <div>
                    <label htmlFor="username">
                        <p>Username:</p>
                        <input
                            type="text"
                            id="username"
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="email">
                        <p>E-Mail:</p>
                        <input 
                            type="email" 
                            id="email" 
                            onChange={e => setEmail(e.target.value)} 
                            placeholder="E-Mail" 
                            required 
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="password">
                        <p>Password: </p>
                        <input
                            type="password"
                            id="password"
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="confirm-password">
                        <p>Confirm Password: </p>
                        <input
                        type="password"
                        id="confirm-password"
                        onChange={e => setPassword2(e.target.value)}
                        placeholder="Confirm Password"
                        required
                        />
                    </label>
                <p>{password2 !== password ? "Passwords do not match" : ""}</p>
                </div>
                <button>Submit</button>
                <Link to ="/Login"> Login here</Link>
            </form>
        </div>
    </section>
  );
}

export default Register;