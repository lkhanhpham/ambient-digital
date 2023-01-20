import { light_yellow, aqua } from "../constants.ts";
/**
 *  This fields shows the questions in the quiz. It adds styling and slices the shown question to display it properly.
 * @param {Object} props
 * @returns Field
 */
const Field = (props) => {
  return (
    <>
      <div
        onClick={props.handleShow}
        className="card field d-flex justify-content-center "
        style={{
          // width: "160px",
          // height: "200px",
          // border: "solid 2px black",
          // borderRadius: "8px",
          backgroundColor: props.chosen ? aqua : "",
          color: props.chosen ? light_yellow : "black",
        }}
      >
        <p className="align-self-center body-text">{props.question}</p>
        {/* <span className="align-self-center">cat: {props.category}</span> */}
        <span className="align-self-center body-text">
          points: {props.points}
        </span>
        {props.chosen ? (
          <>
            {props.question_text.length >= 20 ? (
              <p className="align-self-center body-text">
                {props.question_text.substring(
                  0,
                  Math.min(props.question_text.length, 20)
                ) + "..."}
              </p>
            ) : (
              <p className="align-self-center body-text">
                {props.question_text}
              </p>
            )}
          </>
        ) : (
          <p className="align-self-center body-text">Choose a question</p>
        )}
      </div>
      <style jsx="true">
        {`
          .card {
            width: 160px;
            height: 200px;
          }
          .field:hover {
            background-color: #0a9396;
            color: white;
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
};
export default Field;
