const Field = ({ points, question, category_id }) => {
    return (
        <>
            <div className="card d-flex justify-content-center ">
                <p className="align-self-center">{points}</p>
            </div>
            <style jsx="true">{

                `
    .card{
            width: 160px;
            height: 80px;
    }
        `
            }
            </style>
        </>
    )
}
export default Field;