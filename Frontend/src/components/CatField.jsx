import { dark_aqua } from "../constants.ts";
/**
 * For each category one CatField component gets rendered
 * it shows the name of the category
 * @param {Object} props
 * @returns CatField
 */
const CatField = (props) => {
  return (
    <>
      <div
        onClick={props.handleShow}
        className="custom-card d-flex  rounded-0 justify-content-center"
        style={{
          width: "160px",
          height: "80px",
          border: "solid 2px black",
          borderRadius: "8px",
          backgroundColor: dark_aqua,
          color: "white",
        }}
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
          .custom-card:hover {
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
};
export default CatField;
