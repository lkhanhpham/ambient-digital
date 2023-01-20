import { Modal } from "react-bootstrap";
/**
 * Warning Modal gets displayed to give feedback that the operation didn't worked
 * @param {Object} props
 * @returns ModalWarning
 */
const ModalWarning = (props) => {
  return (
    <Modal
      size="lg"
      aria-labelledby="warning"
      centered
      show={props.showWarning}
      onHide={props.handleCloseWarning}
    >
      <Modal.Header closeButton>
        <Modal.Title id="warning">{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.body}</p>
      </Modal.Body>
    </Modal>
  );
};

export default ModalWarning;
