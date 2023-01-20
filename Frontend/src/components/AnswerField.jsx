/**
 * for each Answer on AnswerField gets rendered
 *
 * @param {Object} props
 * @returns AnswerField
 */
const AnswerField = (props) => {
  return (
    <>
      <div
        onClick={props.handleShow}
        className="custom-card d-flex justify-content-center AnswerOption"
        style={{ marginBottom: "30px" }}
        id="AnswerOption"
      >
        <span
          style={{
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "bold",
            padding: "0px",
          }}
          className="align-self-center text-break"
        >
          {props.answer}
        </span>
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
