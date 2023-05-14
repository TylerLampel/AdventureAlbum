import React, { useContext } from "react";
import { UserContext } from "./context/User";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout, loggedIn, setVacations } = useContext(UserContext);
  const navigate = useNavigate();

  function logoutUser() {
    fetch("/logout", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      logout();
      setVacations([]);
      navigate("/");
    });
  }

  if (loggedIn) {
    return (
      <div>
        <h3>Hello {user.username}</h3>
        <NavLink to="/">
          <button>Home</button>
        </NavLink>
        <NavLink to="/vacations">
          <button>My Vacations</button>
        </NavLink>
        <NavLink to="/add-vacation">
          <button>Add A Vaction</button>
        </NavLink>
        <NavLink to="/my-locations">
          <button>My Locations</button>
        </NavLink>
        <br />
        <button onClick={logoutUser}>Logout</button>
        <br />
        <br />
      </div>
    );
  } else {
    return (
      <div>
        <NavLink to="/login">
          <button>Login</button>
        </NavLink>
        <NavLink to="/signup">
          <button>Signup</button>
        </NavLink>
      </div>
    );
  }
}

export default Navbar;
