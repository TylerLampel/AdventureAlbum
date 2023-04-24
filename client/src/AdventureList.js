import React from "react";
import AdventureCard from "./AdventureCard";
import CreateAdventureForm from "./CreateAdventureForm";

function AdventureList({ adventures }) {
  return (
    <div>
      <h1>Adventures</h1>
      <CreateAdventureForm />
      {adventures ? (
        <div>
          {adventures.map((adventure) => (
            <AdventureCard key={adventure.id} adventureId={adventure.id} />
          ))}
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </div>
  );
}

export default AdventureList;
