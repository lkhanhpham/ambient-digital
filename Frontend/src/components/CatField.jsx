// import Modal from 'react-bootstrap/Modal';
const CatField = (props) => {
  return (
    <>
      <div
        onClick={props.handleShow}
        className="custom-card d-flex  rounded-0 justify-content-center"
      >
        {props.chosen ? (
          <p
            className="align-self-center text-wrap text-break"
            style={{ overflowWrap: "break-word" }}
          >
            {props.cat_name}
          </p>
        ) : (
          <p
            className="align-self-center text-wrap text-break"
            style={{ overflowWrap: "break-word" }}
          >
            {props.category_name}
          </p>
        )}
      </div>

      <style jsx="true">
        {`
          .custom-card {
            width: 160px;
            height: 80px;
            border: solid 2px black;
            border-radius: 8px;
            background-color: #292b2c;
            color: white;
          }
          .custom-card:hover {
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
};
export default CatField;
