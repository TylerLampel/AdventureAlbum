import React from "react";

function PhotoCard({ photo }) {
  console.log("photo", photo);
  return (
    <div>
      {photo.title}
      <img src={photo} alt={photo.title} />
    </div>
  );
}

export default PhotoCard;
