const AnswerField = (props) => {
  return (
    <>
      <div
        onClick={props.handleShow}
        className="custom-card d-flex justify-content-center AnswerOption"
        style={{ marginBottom: "30px" }}
        id="AnswerOption"
      >
        <p
          style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}
          className="align-self-center text-break"
        >
          {props.answer}
        </p>
      </div>
      <style jsx="true">
        {`
          .custom-card {
            width: 100%;
            padding: 35px;
            border: solid 1px black;
            border-radius: 8px;
          }
        `}
      </style>
    </>
  );
};
export default AnswerField;
