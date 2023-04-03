import React, { useContext } from "react";
import { UserContext } from "./context/User";
import { NavLink } from "react-router-dom";

function Navbar() {
  const { user, logout, loggedIn } = useContext(UserContext);

  function logoutUser() {
    fetch("/logout", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      logout();
    });
  }

  if (loggedIn) {
    return (
      <div>
        <h3>Hello {user.username}</h3>
        <button>Logout</button>
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
