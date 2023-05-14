import React, { useContext } from "react";
import { UserContext } from "./context/User";

function Home() {
  const { loggedIn } = useContext(UserContext);

  return (
    <div>
      <h2> Home Page </h2>
      {loggedIn ? (
        <div>
          <p>Welcome to Adventure Album!</p>
          <p>Here you can create photo albums for any vacation!</p>
          <ul>
            <li>
              <p>Click Add Vacation</p>
            </li>
            <li>
              <p>
                Type in the title of the vacation, and choose the departure and
                return date.
              </p>
            </li>
            <li>
              <p>Click Add Adventure</p>
            </li>
            <li>
              <p>Create a new location name for where the images were taken</p>
              <p>Type in the title of the adventure, and add photos.</p>
            </li>
          </ul>
        </div>
      ) : (
        <h3>Please Log In or Sign Up</h3>
      )}
    </div>
  );
}
export default Home;
