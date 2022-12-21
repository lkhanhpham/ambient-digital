import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CatField from "../components/CatField";
import Field from "../components/Field";
import { API_BASE_URL } from "../constants.ts";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import ModalWarning from "../components/ModalWarning";
import editButton from "../icons/editbutton.png";
import AuthContext from "../context/AuthContext";

// For each created quiz one quizcard is rendered
const QuizEdit1 = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const title = location.state.title;
  const quizId = location.state.id;
  const nr_of_rows = location.state.nr_of_rows;
  const nr_of_categories = location.state.nr_of_categories;

  const [catIds] = useState([]);
  const [questions, setQuestions] = useState([]);

  const [quizName, setQuizName] = useState("");
  const [change, setChange] = useState(false);
  var [cats, setCats] = useState([]);
  var [cols, setCols] = useState([]);
  const [value, setValue] = useState(0);

  const [fields, setFields] = useState([]);

  //all variables related to editing field
  const [fieldId, setFieldId] = useState(0);
  var [ques] = useState(0);
  var [point] = useState(0);
  const [show, setShow] = useState(false);
  //close the Question form
  const handleClose = () => setShow(false);
  //show the Question form
  const handleShow = (id) => {
    setShow(true);
    setFieldId(id);
  };

  const [showTitleform, setShowTitle] = useState(false);
  //close the title form
  const handleClose1 = () => setShowTitle(false);
  //show the title form
  const handleShow1 = () => setShowTitle(true);

  const getAllFields = async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/wholequiz/` + quizId + "/"
    );
    const data = await response.json();
    if (response.ok) {
      //console.log(data.field_quiz)
      setFields(data.field_quiz);
    } else {
      //console.log(response.status)
      console.log("Failed Network request");
    }
  };
  //fetch all created questions
  const getAllQues = async () => {
    const response = await fetch(`${API_BASE_URL}/api/question/`);
    const data = await response.json();
    if (response.ok) {
      //console.log(data)
      setQuestions(data);
    } else {
      //console.log(response.status)
      console.log("Failed Network request");
    }
  };

  const refresh = () => {
    // it re-renders the component
    setValue(value + 1);
    // createdGrid()
  };
  const [question_text] = useState([]);

  function createGrid() {
    for (let i = 0; i < fields.length; i++) {
      // console.log("vor if")
      if (!cols.includes(fields[i].categorie_name)) {
        //console.log("push categorie", fields[i].categorie_name)
        const categorie_name = fields[i].categorie_name;
        cols.push(categorie_name);
        catIds.push(fields[i].categorie);
        const tempfields = [];
        tempfields.push(<CatField category_name={fields[i].categorie_name} />);

        for (let k = 0; k < fields.length; k++) {
          if (fields[k].categorie_name === categorie_name) {
            if (fields[k].question == null || fields[k].question == undefined) {
              question_text[k] = "Choose a question";
            } else {
              question_text[k] = fields[k].question.question_text;
            }
            tempfields.push(
              <Field
                category={fields[k].categorie_name}
                points={fields[k].point}
                chosen={true}
                question_text={question_text[k]}
                handleShow={() => handleShow(fields[k].id)}
              />
            );
          }
        }
        cats.push(<div className="d-flex flex-column">{tempfields}</div>);
      }
    }
    //  console.log("cats", cats)
  }
  createGrid();

  const url = `${API_BASE_URL}/api/quiz/` + quizId + "/";

  const [showWarning, setShowWarning] = useState(false);
  const handleShowWarning = () => setShowWarning(true);
  const handleCloseWarning = () => setShowWarning(false);
  //PUT new quiz name to backend
  const saveQuizname = (event) => {
    event.preventDefault();
    if (quizName === "") {
      handleShowWarning();
    } else {
      axios({
        method: "PUT",
        url: url,
        data: {
          quiz_name: quizName,
          nr_of_rows: nr_of_rows,
          nr_of_categories: nr_of_categories,
          author: user.user_id,
        },
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        //console.log(response.data)
      });
      setChange(true);
    }
    handleClose1();
  };
  //show the form to change quiz name
  const changeTitle = () => {
    handleShow1();
  };

  //a Warning if the question already exists in the quiz and user cannot proceed
  const [showWarningQues, setShowWarningQues] = useState(false);

  const handleCloseWarningQues = () => setShowWarningQues(false);

  const handleShowWarningQues = () => setShowWarningQues(true);
  const fieldUrl = `${API_BASE_URL}/api/field/` + fieldId + "/";
  //save the changed data of the edited field
  const saveField = () => {
    var select1 = document.getElementById("questions");
    var select2 = document.getElementById("points");
    const text = select1.options[select1.selectedIndex].text;
    const id = select1.options[select1.selectedIndex].value;
    if (
      !question_text.includes(text) ||
      fields.find(({ id }) => +id === fieldId).question_id === +id
    ) {
      ques = id;
      point = select2.options[select2.selectedIndex].value;
    } else {
      handleShowWarningQues();
    }
  };
  //PUT field to backend
  const putField = (event) => {
    saveField();
    axios({
      method: "PUT",
      url: fieldUrl,
      data: {
        point: +point,
        question_id: +ques,
        categorie: +fields.find(({ id }) => id === fieldId).categorie,
        quiz: quizId,
      },
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      //console.log(response.data)

      const test = fields.map((field) => {
        if (field.id === response.data.id) {
          return response.data;
        }
        return field;
      });
      //console.log("test", test)
      setCols([]);
      setCats([]);
      setFields(test);
      refresh();
    });
    handleClose();
    event.preventDefault();
  };

  const nextStep = () => {
    navigate("/EditQuiz2/" + quizId + "/", {
      state: {
        id: quizId,
        title: change ? quizName : title,
        nr_of_categories: nr_of_categories,
        nr_of_rows: nr_of_rows,
      },
    });
  };

  useEffect(() => {
    getAllFields();
    getAllQues();
  }, []);

  return (
    <div className="container">
      <div className=" d-flex justify-content-center pt-3">
        {change ? (
          <h1 className="big-title me-3">{quizName}</h1>
        ) : (
          <h1 className="big-title me-3">{title}</h1>
        )}
        <button onClick={changeTitle} className="icon align-self-start">
          <img src={editButton} alt="icon" width="20" height="20"></img>
        </button>
      </div>
      <div className="row justify-content-between">
        <div className=" col-4 d-flex flex-column justify-content-center align-self-start">
          <p className="instruction bold p-3"> 1. Edit quiz name and fields</p>
          <p className="instruction ps-3"> 2. Add/Remove categories</p>
          <p className="instruction ps-3"> 3. Add/Remove rows</p>
        </div>
        <div className="col-8 d-flex flex-column justify-content-start align-self-start">
          <div className="d-flex justify-content-start">
            {cats.length === 0 ? (
              <div className="divholder"></div>
            ) : (
              <div className="d-flex">{cats}</div>
            )}
          </div>
          <div className="d-flex justify-content-between p-3">
            <Link to="../../Library">
              <button className="btn btn-secondary">Cancel</button>
            </Link>
            <button onClick={nextStep} className="btn btn-primary">
              Next
            </button>
          </div>
        </div>
      </div>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit field
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <h1 className="small-title mb-2">Question</h1>
            <select className="form-control mb-4" id="questions">
              {questions.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.question_text}
                </option>
              ))}
            </select>
            <h1 className="small-title mb-2">Points</h1>
            <select className="form-control" id="points">
              <option value={100}>100</option>
              <option value={200}>200</option>
              <option value={300}>300</option>
              <option value={400}>400</option>
              <option value={500}>500</option>
            </select>
          </form>
          <Link to="../../QuestionCreator/SC" target="_blank">
            <button className="small-button mt-3">Create question</button>
          </Link>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-end p-3">
            <button onClick={handleClose} className="btn btn-secondary me-2">
              Cancel
            </button>

            <button onClick={putField} className="btn btn-primary">
              Save
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      {/* modal to edit quiz name */}
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showTitleform}
        onHide={handleClose1}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Quiz Name
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <label className="mb-2">New Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder={change ? quizName : title}
              text={quizName}
              maxLength="20"
              onChange={(e) => setQuizName(e.target.value)}
            ></input>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-end p-3">
            <button onClick={handleClose1} className="btn btn-secondary me-2">
              Cancel
            </button>

            <button onClick={saveQuizname} className="btn btn-primary">
              Save
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      <ModalWarning
        showWarning={showWarningQues}
        handleCloseWarning={handleCloseWarningQues}
        title={"Question is not unique."}
        body={
          "Looks like this question exists in your quiz. Please choose another question."
        }
      />
      <ModalWarning
        showWarning={showWarning}
        handleCloseWarning={handleCloseWarning}
        title={"Not so fast buddy!"}
        body={"Please type in a name."}
      />
    </div>
  );
};

export default QuizEdit1;
