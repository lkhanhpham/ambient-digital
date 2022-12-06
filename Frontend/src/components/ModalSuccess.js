import { Modal } from "react-bootstrap"

const ModalSuccess = (props) => {
    return (
        <Modal
            size="lg"
            aria-labelledby="success"
            centered
            show={props.showSuccess} onHide={props.handleCloseSuccess}>
            <Modal.Header closeButton>
                <Modal.Title id="warning">{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{props.body}</p>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary" onClick={props.onclick}>Continue</button>
            </Modal.Footer>
        </Modal>
    )


}

export default ModalSuccess