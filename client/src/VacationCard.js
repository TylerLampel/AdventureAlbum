import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "./context/User";
import AdventureList from "./AdventureList";
import CreateAdventureForm from "./CreateAdventureForm";

function VacationCard() {
  const { id } = useParams();
  const { vacations, setVacations } = useContext(UserContext);
  const [vacation, setVacation] = useState({ adventures: [], locations: [] });
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentVacation = vacations.find((v) => v.id === parseInt(id));
    setVacation(currentVacation);
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

  function deleteVacation() {
    const filteredVacations = vacations.filter((v) => v.id !== vacation.id);
    setVacations(filteredVacations);
  }

  function handleDeleteVacationClick() {
    fetch(`/vacations/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        deleteVacation(id);
        navigate("/vacations");
      } else {
        alert("vacation does not exist");
      }
    });
  }

  const renderedVacation = (
    <div>
      <h3>{vacation.title}</h3>
      <button onClick={handleDeleteVacationClick}>Delete</button>
      <button onClick={() => navigate(`/edit-vacation/${vacation.id}`)}>
        Edit
      </button>
      <p>Departure Date: {vacation.departure_date}</p>
      <p>Return Date: {vacation.return_date}</p>
      <br />
      <h1>Adventures</h1>
      <button onClick={() => setShowForm(!showForm)}>
        {!showForm ? "Add Adventure" : "Cancel"}
      </button>
      {showForm ? (
        <CreateAdventureForm
          addAdventure={addAdventure}
          addLocation={addLocation}
        />
      ) : (
        <></>
      )}
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
