/**
 * This component is included in QuestionFormEditMC to reduce the redundant code
 * The input from this form gehts rendered for each answer option in the edit view
 * it fetches all componntnes from the answer options (videos, pictures, sound_only attribute ...)
 *
 * @param {Object} props
 * @returns AnswerOptionEditComp
 */
const AnswerOptionEditComp = (props) => {
  //props.questionAnswerOption  ===questionAnsweroption2 in disem Fall
  //props.answerOptionNumber  ===3 in diesem Fall
  //props.setQuestionAnswerOption ===setQuestionAnswerOption2 in diesem Fall
  //props.onImageChange
  //props.isShown
  //props.videoIsShown
  //props.vidSoundAnswerOption ===vidSOundAnswerOption3 in diesem Fall
  //props.setVidSoundAnswerOption === setVidSoundAO3 in diesem Fall
  //props.answerImage === answer3Image in diesem Fall
  //props.deleteQuestion
  //props.answerVid === answer3vid
  //props.questionAnswerOptionIsCorrect === questionAnswerOption2b in diesem Fall
  //props.setQuestionAnswerOptionIsCorrect ===setQuestionAnswerOption2b in diesem Fall

  return (
    <>
      <div id="containerID3" className="container3">
        <label
          htmlFor="exampleFormControlInput3"
          style={{ paddingTop: "15px" }}
        >
          Choice {props.answerOptionNumber}
        </label>
        <div>
          <input
            type="text"
            className="form-control"
            id={`exampleFormControlInput${props.answerOptionNumber}`}
            placeholder={props.questionAnswerOption}
            maxLength="500"
            text={props.questionAnswerOption}
            value={props.questionAnswerOption}
            onChange={(e) => props.setQuestionAnswerOption(e.target.value)}
          ></input>
        </div>
      </div>

      {props.isShown && (
        <div style={{ paddingTop: "15px" }}>
          <input
            className="form-control"
            type="file"
            id={`answer${props.answerOptionNumber}Image`}
            name={`answer${props.answerOptionNumber}Image`}
            accept="image/png, image/jpeg"
            onChange={props.onImageChange}
          ></input>
        </div>
      )}

      {props.videoIsShown && (
        <div>
          <div className="input-group mb-3" style={{ paddingTop: "15px" }}>
            <span className="input-group-text" id="basic-addon3">
              Add new Youtube link:
            </span>
            <input
              type="text"
              className="form-control"
              id={`answer${props.answerOptionNumber}Vid`}
              name={`answer${props.answerOptionNumber}Vid`}
              aria-describedby="basic-addon3"
            ></input>
          </div>
          <input
            className="soundOnly"
            id={`soundbox${props.answerOptionNumber + 1}`}
            type="checkbox"
            defaultChecked={props.vidSoundAnswerOption}
            value={props.vidSoundAnswerOption}
            onChange={(e) =>
              props.setVidSoundAnswerOption(!props.vidSoundAnswerOption)
            }
            required
          ></input>
          <label id="checkbox-value3">Sound only</label>
        </div>
      )}

      {props.answerImage && (
        <div className="pt-3">
          <label
            className="mb-2"
            htmlFor="exampleFormControlInput1"
            style={{ fontStyle: "italic" }}
          >
            Current Image: {props.answerImage.name}
          </label>
          <button
            type="button"
            className="btn btn-danger btn-sm float-end"
            id={`deleteAnswer${props.answerOptionNumber}Image`}
            onClick={(e) => props.deleteQuestion(e.target.id)}
          >
            Delete
          </button>
        </div>
      )}

      {props.answerVid && (
        <div className="py-3">
          <label
            className="mb-2"
            htmlFor="exampleFormControlInput1"
            style={{ fontStyle: "italic" }}
          >
            Current Video: {props.answerVid.link}
          </label>
          <button
            type="button"
            className="btn btn-danger btn-sm float-end"
            id={`deleteAnswer${props.answerOptionNumber}Video`}
            onClick={(e) => props.deleteQuestion(e.target.id)}
          >
            Delete
          </button>
        </div>
      )}
      <input
        className="right"
        id={`checkbox${props.answerOptionNumber - 1}`}
        type="checkbox"
        value={props.questionAnswerOptionIsCorrect}
        checked={props.questionAnswerOptionIsCorrect}
        onChange={(e) =>
          props.setQuestionAnswerOptionIsCorrect(
            !props.questionAnswerOptionIsCorrect
          )
        }
      ></input>
      <label id={`checkbox-value${props.answerOptionNumber - 1}`}>
        Answer is correct
      </label>
    </>
  );
};
export default AnswerOptionEditComp;
