const Field = (props) => {
    return (
        <>
            <div onClick={props.handleShow} className="card field d-flex justify-content-center ">
                <p className="align-self-center">{props.question}</p>
            </div>
            <style jsx="true">{

                `
    .card{
            width: 160px;
            height: 80px;
    }
    .field:hover{
        background-color: blue;
        color: white;
        cursor: pointer;
    }
        `
            }
            </style>
        </>
    )
}
export default Field;