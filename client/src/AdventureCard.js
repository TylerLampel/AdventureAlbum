import React from "react";

function AdventureCard({ adventure }) {
  const images = adventure.images;

  if (!Array.isArray(images) || images.length === 0) {
    return (
      <div>
        <h1>{adventure.title}</h1>
        <p>No images available.</p>
      </div>
    );
  }

  const renderedAdventureCards = images.map((image, index) => {
    return (
      <img
        key={index}
        src={image.url}
        alt={image.created_at}
        height="200px"
        width="200px"
      />
    );
  });

  return (
    <div>
      <h1>{adventure.title}</h1>
      <p>{adventure.location.name}</p>
      {renderedAdventureCards}
    </div>
  );
}

export default AdventureCard;
