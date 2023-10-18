import React from "react";

const FetchImage = async (props) => {
  if (props._id) {
    try {
      const response = await fetch(
        `http://localhost:3005/users-image/${props._id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);

      // Set the riderImage state with the fetched image URL
      setRiderImage(imageUrl);
    } catch (error) {
      console.error("Error fetching user image:", error);
    }
  } else {
    // Handle the case where userDetails is null or undefined
    console.error("userDetails is null or undefined");
  }

  return <div></div>;
};

export default FetchImage;
