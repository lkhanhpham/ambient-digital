import { Modal } from "react-bootstrap"

const ModalWarning = (props)=>{
        return(
            <Modal
            size="lg"
            aria-labelledby="warning"
            centered
            show={props.showWarning} onHide={props.handleCloseWarning}>
            <Modal.Header closeButton>
                <Modal.Title id="warning">{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{props.body}</p>
            </Modal.Body>
        </Modal>
        )


}

export default ModalWarning