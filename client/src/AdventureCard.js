import React, { useState, useEffect } from "react";

function AdventureCard({ adventureId }) {
  const [adventure, setAdventure] = useState(null);

  useEffect(() => {
    fetch(`/adventures/${adventureId}`)
      .then((response) => response.json())
      .then((data) => setAdventure(data));
  }, [adventureId]);

  if (!adventure) {
    return <div>Loading...</div>;
  }

  console.log(adventure.images);

  return (
    <div>
      <h1>{adventure.title}</h1>
      {adventure.images.map((image) => {
        console.log("image", image);
        return (
          <img
            key={image.id}
            src={image}
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

// {images.map((image, index) => (
//   <div key={index}>
//     <img
//       src={URL.createObjectURL(image)}
//       alt={image.name}
//       height="200px"
//       width="200px"
//     />
//   </div>
// ))}
