import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdventureList from "./AdventureList";

function VacationCard() {
  const { id } = useParams();
  const [vacation, setVacation] = useState(null);

  useEffect(() => {
    fetch(`/vacations/${id}`)
      .then((response) => response.json())
      .then((data) => setVacation(data));
  }, [id]);

  if (!vacation) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>{vacation.title}</h3>
      <p>Departure Date: {vacation.departure_date}</p>
      <p>Return Date: {vacation.return_date}</p>
      <br />
      <AdventureList adventures={vacation.adventures} />
    </div>
  );
}

export default VacationCard;
