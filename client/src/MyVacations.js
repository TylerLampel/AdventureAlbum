import React from "react";

function MyVacations({ vacations }) {
  const renderedVacations = vacations.map((vacation) => {
    return (
      <div key={vacation.id}>
        <h3>{vacation.title}</h3>
      </div>
    );
  });
  return (
    <div>
      <h2>My Vacations</h2>
      {renderedVacations}
    </div>
  );
}

export default MyVacations;
