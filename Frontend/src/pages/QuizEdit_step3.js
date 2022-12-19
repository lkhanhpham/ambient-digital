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
const QuizEdit3 = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const title = location.state.title;
  const quizId = location.state.id;
  const nr_of_rows = location.state.nr_of_rows;
  const nr_of_categories = location.state.nr_of_categories;
  //store all categories of quiz (from BACKEND)
  var [cats, setCats] = useState([]);
  const [cols, setCols] = useState([]);
  const [value, setValue] = useState(0);

  //-------------------------------------
  //all variables related to editing field

  const [chosen] = useState([false]);
  const [question_text] = useState([]);
  //array that stores the question_id of all the fields
  const [question_ids] = useState([0]);
  const [positionField, setPositionField] = useState(0);
  //array that stores the points of all the fields
  const [fieldPoints] = useState([]);
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
    //console.log("position", positionField)
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
        if (fields[i].question_id == id) {
          handleShowWarningQues();
          exist = true;
          break;
        }
      }
      if (exist === false) {
        question_text[positionField] = text;
        question_ids[positionField] = id;
        chosen[positionField] = true;
      }
    } else {
      handleShowWarningQues();
    }
    // console.log(select1.options[select1.selectedIndex].value)
    fieldPoints[positionField] = select2.options[select2.selectedIndex].value;
    showNewRow(rows);
    // checkValid(chosen)
    handleClose();
  }

  //-------------------------------------
  const [fields, setFields] = useState([]);
  const [catIds] = useState([]);
  // fetch all created fields of quiz
  const getAllFields = async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/wholequiz/` + quizId + "/"
    );
    const data = await response.json();
    if (response.ok) {
      //console.log(data.field_quiz)
      setFields(data.field_quiz);
    } else {
      // console.log(response.status)
      console.log("Failed Network request");
    }
  };

  //----------------------------------------
  //variables related to choosing questions
  const [questions, setQuestions] = useState([]);
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
  //--------------------------------------
  //variables related to choosing rows
  //store all newly created rows (FRONTEND)
  const [newrows, setNewrows] = useState([]);
  const [nr_of_newrows, setNrOfNewrows] = useState(0);

  // this function re-renders the component
  const refresh = () => {
    setValue(value + 1);
  };

  //-----------------------------------
  //variables related to removing rows
  const [showRemove, setShowRemove] = useState(false);
  //close the remove form
  const handleClose1 = () => setShowRemove(false);
  //show the remove form
  const handleShow1 = () => setShowRemove(true);

  //boolean indicates whether user want to remove a category
  var [confirm, setConfirm] = useState(false);
  //name of the to-be-removed category
  const [confirmId, setConfirmId] = useState(-1);
  var [removedfields] = useState([]);
  const [rows, setRows] = useState([]);
  const [nrOfRows, setNrOfRows] = useState(nr_of_rows);
  const removeRow = (rowId) => {
    //console.log(rowId)
    if (rowId > nrOfRows - 1) {
      //console.log("can be removed immediately")
      setNrOfNewrows((nr_of_newrows) => nr_of_newrows - 1);
      //console.log("rows before delete", rows)
      rows[rowId - nrOfRows] = null;
      const test = rows.filter((item) => item != null);
      setRows(test);
      //console.log("rows after delete", test)
      showNewRow(test);
    } else {
      //check if user confirms to delete
      //if already confirmed, proceed to delete
      if (confirm) {
        for (let i = 0; i < fieldIds.length; i++) {
          let id = fieldIds[i].id;
          if (fieldIds[i].row === confirmId) removedfields.push(id);
        }
        //console.log("removed fields", removedfields)
        var test = [];
        test = fields.map((field) => {
          if (removedfields.includes(field.id)) {
            return null;
          }
          return field;
        });
        test = test.filter((el) => el !== null);
        //console.log("test removed", test)
        setCols([]);
        setCats([]);
        setNrOfRows(nrOfRows - 1);
        setFields(test);
        putQuiz();
        refresh();
      }
      //otherwise (user canceled) show a warning
      else {
        setConfirmId(rowId);
        handleShow1();
      }
    }
  };

  const confirmRemove = (event) => {
    event.preventDefault();
    confirm = true;
    removeRow(confirmId);
    handleClose1();
  };
  const url = `${API_BASE_URL}/api/quiz/` + quizId + "/";
  const putQuiz = () => {
    axios({
      method: "PUT",
      url: url,
      data: {
        quiz_name: title,
        nr_of_rows: nrOfRows - 1,
        nr_of_categories: nr_of_categories,
        author: user.user_id,
      },
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      // console.log(response.data)
    });
    // console.log("these will be removed", removedfields)
    for (let i = 0; i < removedfields.length; i++) {
      axios({
        method: "DELETE",
        url: `${API_BASE_URL}/api/field/` + removedfields[i] + "/",
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        // console.log(response.data)
      });
    }
  };

  //-----------------------------------
  //variables related to adding rows
  var tempfields = useState([]);
  var [buttons] = useState([]);
  const addRow = () => {
    //increase number of new rows
    setNrOfNewrows((nr_of_newrows) => nr_of_newrows + 1);
    const test = rows;
    test.push("new row");
    // console.log("test after push", test)
    setRows(test);
    //for each row_name, push fields according to categories
    showNewRow(test);
  };

  function showNewRow(arr) {
    //console.log("arr", arr)
    while (newrows.length) {
      newrows.pop();
    }
    //console.log("newrows before", newrows)
    for (let index = 0; index < arr.length; index++) {
      // if()
      //console.log("this ", index, "can be shown")
      tempfields = [];
      for (let i = 0; i < cols.length; i++) {
        tempfields.push(
          <Field
            category={cols[i]}
            question_text={question_text[index * cols.length + i]}
            handleShow={() => handleShow(index * cols.length + i)}
            points={fieldPoints[index * cols.length + i]}
            chosen={chosen[index * cols.length + i]}
          />
        );
      }
      newrows.push(<div className="d-flex">{tempfields}</div>);
    }
    //console.log("newrows after", newrows)
    refresh();
  }
  // showNewCat()

  const [fieldIds] = useState([]);
  const [Ids] = useState([]);

  const [old_question_text, setquestiontext] = useState([]);

  function createGrid() {
    for (let i = 0; i < fields.length; i++) {
      // console.log("vor if")
      if (!cols.includes(fields[i].categorie_name)) {
        // console.log("push categorie", fields[i].categorie_name)
        const categorie_name = fields[i].categorie_name;
        cols.push(categorie_name);
        catIds.push(fields[i].categorie);
        const tempfields = [];

        tempfields.push(<CatField category_name={fields[i].categorie_name} />);

        var rowId = 0;
        for (let k = 0; k < fields.length; k++) {
          if (fields[k].categorie_name == categorie_name) {
            const id = fields[k].id;
            if (!Ids.includes(id)) {
              Ids.push(id);
              const object = { id: id, row: rowId };
              fieldIds.push(object);
              rowId = rowId + 1;
            }
            if (fields[k].question == null || fields[k].question == undefined) {
              old_question_text[k] = "Please choose a question";
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
    //console.log("fieldIds", fieldIds)
    buttons = [];
    for (let i = 0; i < nrOfRows + nr_of_newrows; i++) {
      buttons.push(
        <button
          className="small-button margin-large"
          onClick={() => removeRow(i)}
        >
          Remove row
        </button>
      );
    }
  }
  createGrid();

  //a Warning if the required data is missing and user cannot proceed
  const [showWarning, setShowWarning] = useState(false);

  const handleCloseWarning = () => setShowWarning(false);

  const handleShowWarning = () => setShowWarning(true);
  // After user edits all fields, the data is saved into fields
  const fillFields = () => {
    var j = 0;
    for (let i = 0; i < question_text.length; i++) {
      if (j === catIds.length) {
        j = 0;
      }
      const obj = {
        point: +fieldPoints[i],
        question: +question_ids[i],
        categorie: +catIds[j],
        quiz: quizId,
      };
      newfields.push(obj);
      j = j + 1;
    }
  };

  //notify user that quiz is saved
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCloseSuccess = () => setShowSuccess(false);

  const handleShowSuccess = () => setShowSuccess(true);

  //post new fields in new rows to BACKEND
  const saveStep3 = (event) => {
    event.preventDefault();
    if (question_text.length !== nr_of_newrows * nr_of_categories) {
      console.log(nr_of_newrows * nr_of_categories);
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
          //console.log(response.data)
        });
      }
      axios({
        method: "PUT",
        url: url,
        data: {
          quiz_name: title,
          nr_of_rows: nr_of_rows + newrows.length,
          nr_of_categories: nr_of_categories,
          author: user.user_id,
        },
        headers: { "Content-Type": "application/json" },
      }).then((response) => {
        //console.log(response.data)
      });
      handleShowSuccess();
    }
  };

  const nextStep = () => {
    navigate("/Library/");
  };
  const prevStep = () => {
    navigate("/EditQuiz2/" + quizId + "/", {
      state: {
        id: quizId,
        title: title,
        nr_of_categories: nr_of_categories,
        nr_of_rows: nrOfRows + nr_of_newrows,
        fields: fields,
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
        <h1 className="big-title me-3">{title}</h1>
      </div>
      <div className="row justify-content-between">
        <div className=" col-4 d-flex flex-column justify-content-center align-self-start">
          <p className="instruction ps-3"> 1. Edit quiz name and fields</p>
          <p className="instruction  ps-3"> 2. Add/Remove categories</p>
          <p className="instruction bold p-3"> 3. Add/Remove rows</p>
        </div>
        <div className="col-8 d-flex flex-column justify-content-start align-self-start">
          <div className="d-flex justify-content-start p-3">
            <button className="small-button me-3" onClick={() => addRow()}>
              Add row
            </button>
          </div>
          <div className="d-flex">
            <div className="d-flex justify-content-start">
              {cats.length === 0 ? (
                <div className="divholder"></div>
              ) : (
                <div className="d-flex flex-column">
                  <div className="d-flex">{cats}</div>
                  <div>{newrows}</div>
                </div>
              )}
            </div>
            <div className="col-2 d-flex flex-column">{buttons}</div>
          </div>

          <div className="d-flex justify-content-between p-3">
            <button onClick={prevStep} className="btn btn-primary">
              Back
            </button>
            <div className="d-flex align-self-end">
              <button onClick={saveStep3} className="btn btn-warning me-3">
                Save
              </button>
              <button onClick={nextStep} className="btn btn-primary">
                Finish
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

            <button
              onClick={() => saveQuestion(positionField)}
              className="btn btn-primary"
            >
              Save
            </button>
          </div>
        </Modal.Footer>
      </Modal>

      <ModalSuccess
        showSuccess={showRemove}
        title={"Are you sure you want to remove this row?"}
        body={"All the fields on this row will also be deleted."}
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
        body={"You can keep editing or go back."}
        handleCloseSuccess={handleCloseSuccess}
        onclick={handleCloseSuccess}
      />
    </div>
  );
};

export default QuizEdit3;
