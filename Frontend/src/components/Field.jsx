const Field = (props) => {
    return (
        <>
            <div onClick={props.handleShow} className="card field d-flex justify-content-center ">
                <p className="align-self-center">{props.question}</p>
                <span className="align-self-center">cat: {props.category}</span>
                <span className="align-self-center">points: {props.points}</span>
                {/* <span>position:{props.row},{props.col}</span> */}
                {props.chosen? (
                    <p className="align-self-center">
                    {props.question_text}</p>
                ):(
                    <p className="align-self-center">
                    Choose a question</p>
                )}
                
            </div>
            <style jsx="true">{

                `
    .card{
            width: 160px;
            height: 200px;
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