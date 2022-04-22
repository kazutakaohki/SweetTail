import React from "react";
import ReactStars from "react-stars";

const Stars = () => {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  return (
    <div>
      <ReactStars
        count={5}
        onChange={ratingChanged}
        size={24}
        color2={"#EF9996"}
      />
    </div>
  );
};

export default Stars;

{
  /* <div className="rating">
          <ReactStars
            count={5}
            value={3}
            size={24}
            color1={"gray"}
            color2={"pink"}
          ></ReactStars>
        </div>
        ; */
}
