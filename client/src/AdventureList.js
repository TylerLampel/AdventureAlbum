import React, { useState } from "react";
import AdventureCard from "./AdventureCard";
import CreateAdventureForm from "./CreateAdventureForm";

function AdventureList({ adv }) {
  const [adventures, setAdventures] = useState(adv);

  console.log("adventures", adventures);

  const renderedAdventures = adventures.map((adventure) => (
    <div>
      <AdventureCard
        key={adventure.id}
        adventure={adventure}
        adventures={adventures}
        setAdventures={setAdventures}
      />
    </div>
  ));

  return (
    <div>
      <h1>Adventures</h1>
      <CreateAdventureForm
        adventures={adventures}
        setAdventures={setAdventures}
      />
      {renderedAdventures}
    </div>
  );
}

export default AdventureList;
