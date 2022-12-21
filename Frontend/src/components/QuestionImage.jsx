import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../constants.ts";
const QuestionImage = (props) => {
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
    getImage();
  }, []);
  return (
    <>
      <div>
        <img
          src={image.picture}
          class="img-fluid mx-auto"
          style={{ display: "block" }}
        ></img>
      </div>
    </>
  );
};
export default QuestionImage;
