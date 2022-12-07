import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from 'react-router-dom';


const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const handleSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    username.length > 0 && loginUser(username, password);
  };

  return (
    <section>
        <div className="login-wrapper">

        <form onSubmit={handleSubmit}>
            <h1>Pelease Log In </h1>
            <hr />
            <div>
                <label htmlFor="username">
                    <p>Username</p>
                    <input type="text" id="username" placeholder="Enter Username" />
                </label>
            </div>
            <div>
                <label htmlFor="password">
                    <p>Password</p>
                    <input type="password" id="password" placeholder="Enter Password" />
                </label>
            </div>
            <div>
                <button type="submit">Login</button>
                <Link to="/Registration"> Create a new Account</Link>
            </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;