import React from "react";

function AdventureCard({ adventure }) {
  return (
    <div>
      <h1>{adventure.title}</h1>
      {adventure.images.map((image) => {
        console.log("image", image);
        return (
          <img
            key={image.id}
            src={image.url}
            alt={image.created_at}
            height="200px"
            width="200px"
          />
        );
      })}
    </div>
  );
}

export default AdventureCard;
