import { useContext } from "react";
import { UserContext } from "./context/User";
import { Link } from "react-router-dom";

function MyLocations() {
  const { loggedIn, vacations } = useContext(UserContext);

  const allLocations = [];

  vacations &&
    vacations.map((vacation) =>
      vacation.locations.map((location) => allLocations.push(location))
    );

  const renderedLocations = allLocations.map((loc, index) => {
    const uniqueVacationIds = [];
    return (
      <div key={index}>
        <h3>{loc.name}</h3>
        <h4>Vacations:</h4>
        <ul>
          {loc.vacations.map((v, index) => {
            if (!uniqueVacationIds.includes(v.id)) {
              uniqueVacationIds.push(v.id);
              return (
                <li key={index}>
                  <Link to={`/vacations/${v.id}`}>{v.title}</Link>
                </li>
              );
            } else {
              return null;
            }
          })}
        </ul>
      </div>
    );
  });

  if (loggedIn) {
    return (
      <div>
        <h2>My Locations</h2>
        {renderedLocations}
      </div>
    );
  } else {
    return <h2>Please Log In or Sign Up</h2>;
  }
}

export default MyLocations;
