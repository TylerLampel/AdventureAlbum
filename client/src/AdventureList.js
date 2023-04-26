import React, { useState, useEffect } from "react";
import AdventureCard from "./AdventureCard";
import { useParams } from "react-router-dom";
import CreateAdventureForm from "./CreateAdventureForm";

function AdventureList() {
  const { id } = useParams();
  const [adventures, setAdventures] = useState([]);

  useEffect(() => {
    fetch(`/vacations/${id}/adventures`)
      .then((response) => response.json())
      .then((data) => {
        setAdventures(data);
      });
  }, [id]);

  console.log("adventures", adventures);

  function addAdventure(newAdventure) {
    const updatedAdventures = {
      ...adventures,
      newAdventure,
    };
    setAdventures(updatedAdventures);
  }

  return (
    <div>
      <h1>Adventures</h1>
      <CreateAdventureForm addAdventure={addAdventure} />
      <div>
        {adventures.map((adventure) => (
          <div>
            <AdventureCard
              key={adventure.id}
              adventure={adventure}
              adventures={adventures}
              setAdventures={setAdventures}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdventureList;
