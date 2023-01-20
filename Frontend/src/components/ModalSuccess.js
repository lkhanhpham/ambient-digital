import { Modal } from "react-bootstrap";
/**
 * Success Modal gets displayed to give feedback that the operation worked
 * @param {Object} props
 * @returns ModalSuccess
 */
const ModalSuccess = (props) => {
  return (
    <Modal
      size="lg"
      aria-labelledby="success"
      centered
      show={props.showSuccess}
      onHide={props.handleCloseSuccess}
    >
      <Modal.Header closeButton>
        <Modal.Title id="warning">{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.body}</p>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex">
          {props.goback ? (
            <button className="btn btn-secondary me-3" onClick={props.onclick1}>
              Go back
            </button>
          ) : (
            <></>
          )}
          <button className="my-btn-primary" onClick={props.onclick}>
            Continue
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalSuccess;
