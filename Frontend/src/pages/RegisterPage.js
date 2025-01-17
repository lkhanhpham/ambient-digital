import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
/**
 * on this side, you can registrate new user and save them in the backend
 * @returns
 */
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const { registerUser } = useContext(AuthContext);
  var submitDisabled = true;
  //send credetials to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    registerUser(username, email, password, password2);
  };
  //check uf each field is filled
  function checkIfEnabled() {
    if (
      username.length > 0 &&
      password.length > 0 &&
      password2.length > 0 &&
      email.length > 0 &&
      password === password2
    ) {
      submitDisabled = false;
    } else {
      submitDisabled = true;
    }

    return submitDisabled;
  }

  return (
    <>
      <section>
        <div
          id="wrapper"
          className="container login-wrapper row justify-content-center"
        >
          <div className="card">
            <form className="loginForm" onSubmit={handleSubmit}>
              <h1>Create a new Account</h1>
              <hr />
              <div className="col-md-12">
                <label htmlFor="exampleFormControlInput1"></label>
                <input
                  className="form-control"
                  type="text"
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="email"></label>
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-Mail"
                  required
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="password"></label>
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="confirm-password"></label>
                <input
                  className="form-control"
                  type="password"
                  id="confirm-password"
                  onChange={(e) => setPassword2(e.target.value)}
                  placeholder="Confirm Password"
                  required
                />
                <p>{password2 !== password ? "Passwords do not match" : ""}</p>
              </div>
              <div className="d-flex align-item-start p-3 divButton">
                <input
                  className="btn btn-secondary me-3"
                  type="submit"
                  value="Submit"
                  disabled={checkIfEnabled()}
                ></input>
                <label className="me-3 colorLink">
                  <Link to="/Login"> Login here</Link>
                </label>
              </div>
            </form>
          </div>
        </div>
      </section>
      <style jsx="true">{`
        .loginForm {
          text-align: center;
        }
        #wrapper {
          text-align: left;
          margin: 0 auto;
          border-radius: 1rem;
        }
        label {
          font-size: 18px;
        }
        .container {
          height: 100%;
          align-content: center;
        }
        .card {
          height: 70%;
          margin-top: 7%;
          margin-bottom: auto;
          width: 70%;
          padding: 2% 5%;
        }
        .colorLink {
          color: rgb(36, 47, 203);
        }
        .divButton {
          align-items: center;
        }
      `}</style>
    </>
  );
}

export default Register;
