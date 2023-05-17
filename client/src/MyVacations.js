import { useContext } from "react";
import { UserContext } from "./context/User";
import { Link } from "react-router-dom";

function MyVacations() {
  const { loggedIn, vacations } = useContext(UserContext);

  const renderedVacationLinks =
    vacations && vacations.length === 0 ? (
      <li>Please add a vacation</li>
    ) : (
      vacations.map((vacation) => {
        return (
          <li key={vacation.id}>
            <Link to={`/vacations/${vacation.id}`}>{vacation.title}</Link>
          </li>
        );
      })
    );

  console.log(vacations);

  if (loggedIn) {
    return (
      <div>
        <h2>My Vacations</h2>
        <ul>{renderedVacationLinks}</ul>
      </div>
    );
  } else {
    return <h2>Please Log In or Sign Up</h2>;
  }
}

export default MyVacations;
