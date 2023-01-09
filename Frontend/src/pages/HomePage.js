import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section>
      <div class="row">
        <div class="col-lg-6 customdiv">
          <h1 class="big-heading">Make your Team Event a Jeopardy Quiz!</h1>
        </div>
        <div className="col-lg-6 customdiv2">
          <Link to="/Login">
            <button className="btn btn-dark me-2">Login here</button>
          </Link>
          <Link to="/Registration">
            <button className="btn btn-dark me-2">Register now</button>
          </Link>
          <img className="me-3" src="../favicon.png" alt="logo" width="50%" />
        </div>
      </div>
      <style jsx="true">{`
        .customdiv {
          margin: 10% 5% 5% 5%;
        }
        .customdiv2 {
          margin: 0% 5%;
        }
        label {
          font-size: 18px;
        }
        .custom-card {
          border-radius: 1rem;
        }
        .right {
          text-align: right;
        }
        .rechts-oben {
          padding: 2%;
        }
      `}</style>
    </section>
  );
};

export default Home;
