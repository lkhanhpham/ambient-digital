import { useState, useContext } from "react";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import ModalSuccess from "../components/ModalSuccess";
import { API_BASE_URL } from "../constants.ts";
import AuthContext from "../context/AuthContext";
import ModalWarning from "../components/ModalWarning";
import { background } from "../constants.ts";
/**
 * Input form to create new Categories, can be accessed through navbar and in quiz creation
 * @returns CategoryCreator
 */
const CategoryCreator = () => {
  const { user } = useContext(AuthContext);
  const [catName, setCatName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  //show the success notification
  const handleShowSuccess = () => setShowSuccess(true);
  const handleCloseSuccess = () => setShowSuccess(false);

  const [showWarning, setShowWarning] = useState(false);
  const handleShowWarning = () => setShowWarning(true);
  const handleCloseWarning = () => setShowWarning(false);
  //sends post with axios to backend and creates new categorie which is saved in the Database
  // each user has own categories
  function createCat(event) {
    if (catName === "") {
      handleShowWarning();
    } else {
      axios({
        method: "POST",
        url: `${API_BASE_URL}/api/categorie/`,
        data: {
          categorie_name: catName,
          author: user.user_id,
        },
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        //console.log(response.data)
        handleShowSuccess();
        setCatName("");
      });
    }

    event.preventDefault();
  }

  return (
    <>
      <div className="text-dark d-flex justify-content-center align-self-center pt-3 pb-3">
        <h3 className="big-title">New Category</h3>
      </div>
      <div className="row justify-content-center">
        <div
          className="custom-card col-lg-6 col-md-8 p-5 justify-content-center align-self-center"
          style={{
            backgroundColor: background,
          }}
        >
          <form className="text-light" onSubmit={createCat}>
            <div className="form-group m-3">
              <label className="mb-2" htmlFor="exampleFormControlInput1">
                Category Name
              </label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="New Category"
                text={catName}
                onChange={(e) => setCatName(e.target.value)}
              ></input>
            </div>

            <div className="d-flex justify-content-end p-3">
              <Link to="/Library">
                <button type="button" className="btn btn-secondary me-2">
                  Cancel
                </button>
              </Link>
              <button type="submit" className="my-btn-primary">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
      <ModalWarning
        showWarning={showWarning}
        handleCloseWarning={handleCloseWarning}
        title={"Not so fast buddy!"}
        body={"Please type in a category name."}
      />
      <ModalSuccess
        showSuccess={showSuccess}
        handleCloseSuccess={handleCloseSuccess}
        title={"Category created"}
        body={
          "You can now close this tab and continue or create some more categories."
        }
        onclick={handleCloseSuccess}
      />
      <style jsx="true">{`
        label {
          font-size: 18px;
        }
        .custom-card {
          border-radius: 1rem;
        }
      `}</style>
    </>
  );
};

export default CategoryCreator;
