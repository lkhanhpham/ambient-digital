import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    username.length > 0 && loginUser(username, password);
  };

  return (
    <>
      <section>
        <div id="wrapper" className="container login-wrapper row justify-content-center" >
          <div className="card">
          <form className="loginForm" onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <hr />
            <div className="col-md-12">
              <label htmlFor="exampleFormControlInput1"></label>
              <input
                className="form-control"
                type="text"
                id="username"
                placeholder="Enter Username"
                required
              />
            </div>
            <div className="col-md-12">
              <label htmlFor="password"></label>
              <input
                className="form-control"
                type="password"
                id="password"
                placeholder="Enter Password"
                required
              />
            </div>
            <div className="d-flex align-item-start p-3 divButton">
              <button className="btn btn-secondary me-3" type="submit">
                Login
              </button>
              <label className="me-3">Don't have an account?</ label>
              <label className="me-3 colorLink"><Link to="/Registration" >Sign up</Link></ label>
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
        label{
          font-size: 18px;
        }
        .container{
          height: 100%;
          align-content: center;
          }
        .card{
          height: 70%;
          margin-top: 7%;
          margin-bottom: auto;
          width: 70%;
          padding: 2% 5%;
        }
        .colorLink{
          color: rgb(36, 47, 203);
        }
        .divButton{
          align-items:center;
      }
      `}</style>
    </>
  );
};

export default LoginPage;
