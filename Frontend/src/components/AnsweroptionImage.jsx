import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../constants.ts";
const AnsweroptionImage = (props) => {
  const [image, setImage] = useState([]);
  //gets the image from api
  const getImage = async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/images/` + props.image + "/"
    );
    const data = await response.json();
    if (response.ok) {
      setImage(data);
    } else {
      console.log("Failed Network request");
    }
  };
  useEffect(() => {
    if (props.image > 0) {
      getImage();
    }
  }, [props.image]);
  return (
    <>
      <div style={{ maxWidth: "25%", minWidth: "25%" }}>
        <div>
          {image ? (
            <img
              src={image.picture}
              className="img-fluid mx-auto"
              style={{ padding: "5px", display: "block" }}
            ></img>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
export default AnsweroptionImage;
