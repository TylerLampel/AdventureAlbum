import React, { useState, useEffect } from "react";
import AdventureCard from "./AdventureCard";
import CreateAdventureForm from "./CreateAdventureForm";

function AdventureList({ adv }) {
  const [adventures, setAdventures] = useState([]);

  useEffect(() => {
    if (adv && adv.length > 0) {
      setAdventures(adv);
    }
  }, [adv]);

  const locations = Array.isArray(adventures)
    ? adventures.map((adv) => adv.location)
    : [];

  if (!Array.isArray(adventures) || adventures.length === 0) {
    return (
      <div>
        <p>No Adventures Found</p>
        <CreateAdventureForm
          adventures={adventures}
          setAdventures={setAdventures}
          locs={locations}
        />
      </div>
    );
  }

  const renderedAdventures = adventures.map((adventure) => (
    <div key={adventure.id}>
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
        locs={locations}
      />
      {renderedAdventures}
    </div>
  );
}

export default AdventureList;
