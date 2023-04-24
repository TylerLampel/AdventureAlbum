import React from "react";
import { Link } from "react-router-dom";

function MyVacations({ vacations }) {
  const renderedVacationLinks = vacations.map((vacation) => {
    return (
      <li key={vacation.id}>
        <Link to={`/vacations/${vacation.id}`}>{vacation.title}</Link>
      </li>
    );
  });

  return (
    <div>
      <h2>My Vacations</h2>
      <ul>{renderedVacationLinks}</ul>
    </div>
  );
}

export default MyVacations;
