import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./context/User";
import AdventureList from "./AdventureList";

function VacationCard() {
  const { id } = useParams();
  const { vacations } = useContext(UserContext);
  const [vacation, setVacation] = useState(undefined);

  useEffect(() => {
    if (vacations && vacations.length > 0) {
      const currentVacation = vacations.find((v) => v.id === parseInt(id));
      setVacation(currentVacation);
    }
  }, [id, vacations]);

  if (!vacation) {
    return <p>This vacation is not available.</p>;
  }

  const renderedVacation = (
    <div>
      <h3>{vacation.title}</h3>
      <p>Departure Date: {vacation.departure_date}</p>
      <p>Return Date: {vacation.return_date}</p>
      <br />
      <AdventureList adv={vacation.adventures} />
    </div>
  );

  return <div>{renderedVacation}</div>;
}

export default VacationCard;
