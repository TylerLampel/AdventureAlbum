import React from "react";

function AdventureCard({ adventure }) {
  const images = adventure.images;
  const renderedAdventureCards = images.map((image) => {
    return (
      <img
        key={image.id}
        src={image.url}
        alt={image.created_at}
        height="200px"
        width="200px"
      />
    );
  });

  if (!Array.isArray(images) || images.length === 0) {
    return (
      <div>
        <h1>{adventure.title}</h1>
        {renderedAdventureCards}
      </div>
    );
  }
}

export default AdventureCard;
