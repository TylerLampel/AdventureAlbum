import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./context/User";
import AdventureList from "./AdventureList";
import CreateAdventureForm from "./CreateAdventureForm";

function VacationCard() {
  const { id } = useParams();
  const { vacations, setVacations } = useContext(UserContext);
  const [vacation, setVacation] = useState({ adventures: [], locations: [] });

  useEffect(() => {
    if (vacations && vacations.length > 0) {
      const currentVacation = vacations.find((v) => v.id === parseInt(id));
      setVacation(currentVacation);
    }
  }, [id, vacations]);

  if (!vacation) {
    return <p>This vacation is not available.</p>;
  }

  function addAdventure(newAdventure) {
    const updatedVacation = {
      ...vacation,
      adventures: [...vacation.adventures, newAdventure],
    };
    const filteredVacations = vacations.filter((v) => v.id !== vacation.id);
    const newVacations = [...filteredVacations, updatedVacation];
    setVacation(updatedVacation);
    setVacations(newVacations);
  }

  function addLocation(newLocation) {
    const updatedVacation = {
      ...vacation,
      locations: [...vacation.locations, newLocation],
    };
    const filteredVacations = vacations.filter((v) => v.id !== vacation.id);
    const newVacations = [...filteredVacations, updatedVacation];
    setVacations(newVacations);
  }

  const renderedVacation = (
    <div>
      <h3>{vacation.title}</h3>
      <p>Departure Date: {vacation.departure_date}</p>
      <p>Return Date: {vacation.return_date}</p>
      <br />
      <h1>Adventures</h1>
      <CreateAdventureForm
        addAdventure={addAdventure}
        addLocation={addLocation}
      />
      <AdventureList
        adventures={vacation.adventures}
        addAdventure={addAdventure}
        addLocation={addLocation}
      />
    </div>
  );

  return <div>{renderedVacation}</div>;
}

export default VacationCard;
