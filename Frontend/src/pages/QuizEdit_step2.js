import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CatField from "../components/CatField";
import Field from "../components/Field";
import { API_BASE_URL } from "../constants.ts";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import ModalSuccess from "../components/ModalSuccess";
import ModalWarning from "../components/ModalWarning";
import AuthContext from "../context/AuthContext";

// For each created quiz one quizcard is rendered
const QuizEdit2 = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const title = location.state.title;
  const quizId = location.state.id;
  const nr_of_rows = location.state.nr_of_rows;
  const nr_of_categories = location.state.nr_of_categories;
  //store all categories of quiz (from BACKEND)
  var [cats, setCats] = useState([]);
  var [cols, setCols] = useState([]);
  const [value, setValue] = useState(0);
  const [NrOfCats, setNrOfCats] = useState(nr_of_categories);

  //-------------------------------------
  //all variables related to editing field

  const [chosen1] = useState([false]);
  const [question_text] = useState([]);
  //array that stores the question_id of all the fields
  const [question_ids] = useState([0]);
  const [positionField, setPositionField] = useState(0);
  //array that stores the points of all the fields
  const [fieldPoints] = useState([100]);
  const [newfields] = useState([]);
  const [show, setShow] = useState(false);
  //close the Question form
  const handleClose = () => setShow(false);
  //show the Question form
  const handleShow = (id) => {
    setShow(true);
    setPositionField(id);
  };
  //a Warning if the question already exists in the quiz and user cannot proceed
  const [showWarningQues, setShowWarningQues] = useState(false);

  const handleCloseWarningQues = () => setShowWarningQues(false);

  const handleShowWarningQues = () => setShowWarningQues(true);

  function saveQuestion(positionField) {
    var select1 = document.getElementById("questions");
    var select2 = document.getElementById("points");
    const text = select1.options[select1.selectedIndex].text;
    const id = select1.options[select1.selectedIndex].value;
    //check if question exits in new created columns
    if (
      !question_text.includes(text) ||
      question_text[positionField] === text
    ) {
      var exist = false;
      for (let i = 0; i < fields.length; i++) {
        //check if question exits in old columns
        if (fields[i].question_id === +id) {
          handleShowWarningQues();
          exist = true;
          break;
        }
      }
      if (exist === false) {
        question_text[positionField] = text;
        question_ids[positionField] = id;
        chosen1[positionField] = true;
      }
    } else {
      handleShowWarningQues();
    }
    // console.log(select1.options[select1.selectedIndex].value)
    fieldPoints[positionField] = select2.options[select2.selectedIndex].value;
    showNewCat(cat_name);
    // checkValid(chosen)
    handleClose();
  }

  //-------------------------------------
  const [fields, setFields] = useState([]);
  //fetch all created fields of quiz
  const getAllFields = async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/wholequiz/` + quizId + "/"
    );
    const data = await response.json();
    if (response.ok) {
      // console.log(data.field_quiz)
      setFields(data.field_quiz);
    } else {
      //console.log(response.status)
      console.log("Failed Network request");
    }
  };

  //----------------------------------------
  //variables related to choosing questions
  const [questions, setQuestions] = useState([]);
  //fetch all created questions
  const getAllQues = async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/authorquestion/` + user.user_id
    );
    const data = await response.json();
    if (response.ok) {
      //console.log(data)
      setQuestions(data.question_author);
    } else {
      //console.log(response.status)
      console.log("Failed Network request");
    }
  };
  //--------------------------------------
  //variables related to choosing categories
  //store all newly created columns (FRONTEND)
  var [newcats] = useState([]);
  const [nr_of_newcats, setNrOfNewcats] = useState(0);
  var [cats1, setCats1] = useState([]);
  const [cat_name] = useState([]);
  const [catIds] = useState([]);
  const [chosen] = useState([false]);
  //fetch all created categories
  const getAllCats = async () => {
    const response = await fetch(`${API_BASE_URL}/api/categorie/`);
    const data = await response.json();
    if (response.ok) {
      //console.log(data)
      setCats1(data);
    } else {
      //console.log(response.status)
      console.log("Failed Network request");
    }
  };

  const [showCat, setShowCat] = useState(false);
  //close the Category form
  const handleCloseCat = () => setShowCat(false);
  //show the Category form
  const handleShowCat = (keyProp) => {
    setShowCat(true);
    setPosition(keyProp);
  };

  //a Warning if the category already exists in the quiz and user cannot proceed
  const [showWarning1, setShowWarning1] = useState(false);
  const handleCloseWarning1 = () => setShowWarning1(false);
  const handleShowWarning1 = () => setShowWarning1(true);

  const [position, setPosition] = useState(0);

  //save the chosen category and show it on the field
  function saveCat(position) {
    // console.log('position', position)
    var select1 = document.getElementById("categories");
    const text = select1.options[select1.selectedIndex].text;
    const id = select1.options[select1.selectedIndex].value;
    // console.log("cat name: ", text)
    if (!catIds.includes(id) && !cols.includes(text)) {
      cat_name[position] = text;
      catIds[position] = id;
      chosen[position] = true;
    } else {
      handleShowWarning1();
    }
    // checkValid(chosen)
    showNewCat(cat_name);
    refresh();
    handleCloseCat();
  }

  // this function re-renders the component
  const refresh = () => {
    setValue(value + 1);
  };

  //-----------------------------------
  //variables related to removing columns
  const [showRemove, setShowRemove] = useState(false);
  //close the remove form
  const handleClose1 = () => setShowRemove(false);
  //show the remove form
  const handleShow1 = () => setShowRemove(true);

  const [showWarning2, setShowWarning2] = useState(false);
  const handleCloseWarning2 = () => setShowWarning2(false);
  const handleShowWarning2 = () => setShowWarning2(true);

  //boolean indicates whether user want to remove a category
  var [confirm] = useState(false);
  //name of the to-be-removed category
  const [confirmName, setConfirmName] = useState("");
  var [removedfields] = useState([]);

  const removeCat = (name) => {
    //newly created columns can be removed immediately
    if (cat_name.includes(name)) {
      // console.log("can delete", name.includes("Dummy"))
      setNrOfNewcats((nr_of_newcats) => nr_of_newcats - 1);
      // console.log("nr of new cats: ", nr_of_newcats)
      cat_name[cat_name.findIndex((catname) => catname === name)] = null;
      // console.log("cat names after delete", cat_name)
      showNewCat(cat_name);
      // refresh()
    } else {
      //there must be at least 1 column
      if (cols.length === 1) {
        handleShowWarning2();
      } else {
        //check if user confirms to delete
        //if already confirmed, proceed to delete
        if (confirm) {
          removedfields = fields.filter(
            (field) => field.categorie_name === name
          );
          const test = fields.filter((field) => field.categorie_name !== name);
          // console.log(test)
          setNrOfCats(NrOfCats - 1);
          setCols([]);
          setCats([]);
          setFields(test);
          putQuiz();
          refresh();
        }
        //otherwise (user canceled) show a warning
        else {
          setConfirmName(name);
          handleShow1();
        }
      }
    }
  };

  const confirmRemove = (event) => {
    event.preventDefault();
    confirm = true;

    removeCat(confirmName);
    handleClose1();
  };
  const url = `${API_BASE_URL}/api/quiz/` + quizId + "/";
  const putQuiz = () => {
    axios({
      method: "PUT",
      url: url,
      data: {
        quiz_name: title,
        nr_of_rows: nr_of_rows,
        nr_of_categories: cols.length - 1,
        author: 1,
      },
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      // console.log(response.data)
    });
    // console.log("these will be removed", removedfields)
    for (let i = 0; i < removedfields.length; i++) {
      axios({
        method: "DELETE",
        url: `${API_BASE_URL}/api/field/` + removedfields[i].id + "/",
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        // console.log(response.data)
      });
    }
  };

  const addCat = () => {
    //remove all current columns in newcats
    setNrOfNewcats((nr_of_newcats) => nr_of_newcats + 1);
    // console.log("nr of new cats: ", nr_of_newcats)
    cat_name[nr_of_newcats] = "Dummy" + (nr_of_newcats + 1).toString();
    // const test = cat_name
    // console.log("cat_name after: ", cat_name)
    showNewCat(cat_name);
    // refresh()
  };

  function showNewCat(arr) {
    while (newcats.length) {
      newcats.pop();
    }
    for (let i = 0; i < arr.length; i++) {
      // console.log("arr[i]", arr[i])
      if (arr[i] === null) {
        continue;
      }
      let tempfields = [];
      tempfields.push(
        <button className="small-button" onClick={() => removeCat(cat_name[i])}>
          Remove category
        </button>
      );
      tempfields.push(
        <CatField
          key={i}
          category_name={cat_name[i]}
          cat_name={cat_name[i]}
          handleShow={() => handleShowCat(i)}
          chosen={chosen[i]}
          keyProp={i}
        />
      );
      if (chosen[i]) {
        for (let k = 0; k < nr_of_rows; k++) {
          // var points = 100;
          // console.log("index", k + i * nr_of_rows)
          tempfields.push(
            <Field
              key={k}
              points={fieldPoints[k + i * nr_of_rows]}
              category={catIds[i]}
              row={k}
              col={i}
              handleShow={() => handleShow(k + i * nr_of_rows)}
              question_text={question_text[k + i * nr_of_rows]}
              chosen={chosen1[k + i * nr_of_rows]}
            />
          );
        }
      }
      newcats.push(<div className="d-flex flex-column">{tempfields}</div>);
    }
    refresh();
  }
  // showNewCat()

  const [old_question_text] = useState([]);

  function createGrid() {
    for (let i = 0; i < fields.length; i++) {
      // console.log("vor if")
      if (!cols.includes(fields[i].categorie_name)) {
        // console.log("push categorie", fields[i].categorie_name)
        const categorie_name = fields[i].categorie_name;
        cols.push(categorie_name);
        const tempfields = [];
        tempfields.push(
          <button
            className="small-button"
            onClick={() => removeCat(categorie_name)}
          >
            Remove category
          </button>
        );
        tempfields.push(<CatField category_name={fields[i].categorie_name} />);

        for (let k = 0; k < fields.length; k++) {
          if (fields[k].categorie_name === categorie_name) {
            if (fields[k].question == null || fields[k].question == undefined) {
              old_question_text[k] = "Choose a question";
            } else {
              old_question_text[k] = fields[k].question.question_text;
            }
            tempfields.push(
              <Field
                category={fields[k].categorie_name}
                points={fields[k].point}
                chosen={true}
                question_text={old_question_text[k]}
              />
            );
          }
        }
        cats.push(<div className="d-flex flex-column">{tempfields}</div>);
      }
    }
  }
  createGrid();

  //a Warning if the required data is missing and user cannot proceed
  const [showWarning, setShowWarning] = useState(false);

  const handleCloseWarning = () => setShowWarning(false);

  const handleShowWarning = () => setShowWarning(true);

  // After user edits all fields, the data is saved into fields
  const fillFields = () => {
    var k = -1;
    for (let i = 0; i < question_text.length; i++) {
      if (i % nr_of_rows === 0) {
        k += 1;
      }
      newfields.push({
        point: +fieldPoints[i],
        question: +question_ids[i],
        categorie: +catIds[k],
        quiz: quizId,
      });
    }
    //console.log(fields)
  };

  //notify user that quiz is saved
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCloseSuccess = () => setShowSuccess(false);

  const handleShowSuccess = () => setShowSuccess(true);

  //post new fields in new columns to BACKEND
  const saveStep2 = (event) => {
    event.preventDefault();
    if (question_text.length !== nr_of_newcats * nr_of_rows) {
      handleShowWarning();
    } else {
      fillFields();
      for (let i = 0; i < question_text.length; i++) {
        axios({
          method: "POST",
          url: `${API_BASE_URL}/api/field/`,
          data: {
            point: newfields[i].point,
            question_id: newfields[i].question,
            categorie: newfields[i].categorie,
            quiz: newfields[i].quiz,
          },
          headers: { "Content-Type": "application/json" },
        }).then((response) => {
          // console.log(response.data)
        });
      }
      axios({
        method: "PUT",
        url: url,
        data: {
          quiz_name: title,
          nr_of_rows: nr_of_rows,
          nr_of_categories: cols.length + nr_of_newcats,
          author: user.user_id,
        },
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        //console.log(response.data)
        refresh();
        setNrOfCats(cols.length + nr_of_newcats);
      });
      handleShowSuccess();
    }
  };

  const nextStep = () => {
    navigate("/EditQuiz3/" + quizId + "/", {
      state: {
        id: quizId,
        title: title,
        nr_of_categories: NrOfCats,
        nr_of_rows: nr_of_rows,
        fields: fields,
      },
    });
  };
  const prevStep = () => {
    navigate("/EditQuiz1/" + quizId + "/", {
      state: {
        id: quizId,
        title: title,
        nr_of_categories: NrOfCats,
        nr_of_rows: nr_of_rows,
      },
    });
  };

  useEffect(() => {
    getAllFields();
    getAllQues();
    getAllCats();
  }, []);

  return (
    <div className="container">
      <div className=" d-flex justify-content-center pt-3">
        <h1 className="big-title me-3">{title}</h1>
      </div>
      <div className="row justify-content-between">
        <div className=" col-4 d-flex flex-column justify-content-center align-self-start">
          <p className="instruction ps-3"> 1. Edit quiz name and fields</p>
          <p className="instruction bold p-3"> 2. Add/Remove categories</p>
          <p className="instruction ps-3"> 3. Add/Remove rows</p>
        </div>
        <div className="col-8 d-flex flex-column justify-content-start align-self-start">
          <div className="d-flex justify-content-start p-3">
            <button className="small-button me-3" onClick={() => addCat()}>
              Add category
            </button>
          </div>
          <div className="d-flex justify-content-start">
            {cats.length === 0 ? (
              <div className="divholder"></div>
            ) : (
              <div className="d-flex">{cats}</div>
            )}
            <div className="d-flex">{newcats}</div>
          </div>
          <div className="d-flex justify-content-between p-3">
            <button onClick={prevStep} className="btn btn-primary">
              Back
            </button>
            <div className="d-flex align-self-end">
              <button onClick={saveStep2} className="btn btn-warning me-3">
                Save
              </button>
              <button onClick={nextStep} className="btn btn-primary">
                Next
              </button>
            </div>
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
            <select
              className="form-control mb-4"
              id="questions"
              onClick={getAllQues}
            >
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

            <button
              onClick={() => saveQuestion(positionField)}
              className="btn btn-primary"
            >
              Save
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showCat}
        onHide={handleCloseCat}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Choose a category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <select
              className="form-control"
              id="categories"
              onClick={getAllCats}
            >
              {cats1.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.categorie_name}
                </option>
              ))}
            </select>
          </form>
          <Link to="../../CategoryCreator" target="_blank">
            <button className="small-button mt-3">Create category</button>
          </Link>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-end p-3">
            <button onClick={handleCloseCat} className="btn btn-secondary me-2">
              Cancel
            </button>

            <button
              onClick={() => saveCat(position)}
              className="btn btn-primary"
            >
              Save
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      <ModalSuccess
        showSuccess={showRemove}
        title={"Are you sure you want to remove this category?"}
        body={"All the fields belong to this category will also be deleted."}
        handleCloseSuccess={handleClose1}
        onclick={confirmRemove}
      />
      <ModalWarning
        showWarning={showWarning}
        handleCloseWarning={handleCloseWarning}
        title={"Oops! You forgot something"}
        body={"Edit all fields to proceed"}
      />
      <ModalWarning
        showWarning={showWarning1}
        handleCloseWarning={handleCloseWarning1}
        title={"Category is not unique."}
        body={
          "Looks like this category exists in your quiz. Please choose another one."
        }
      />
      <ModalWarning
        showWarning={showWarningQues}
        handleCloseWarning={handleCloseWarningQues}
        title={"Question is not unique."}
        body={
          "Looks like this question exists in your quiz. Please choose another question."
        }
      />
      <ModalSuccess
        showSuccess={showSuccess}
        title={"Quiz saved"}
        body={"You can proceed to next step"}
        handleCloseSuccess={handleCloseSuccess}
        onclick={handleCloseSuccess}
      />
      <ModalWarning
        showWarning={showWarning2}
        handleCloseWarning={handleCloseWarning2}
        title={"Cannot delete this category."}
        body={"Your quiz must have at least one category"}
      />
    </div>
  );
};

export default QuizEdit2;
