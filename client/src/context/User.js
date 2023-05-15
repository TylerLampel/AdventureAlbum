import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// create context
const UserContext = React.createContext();

//create provider component
function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false); //add loggedIn flag
  const [vacations, setVacations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/me")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        if (data.errors) {
          setLoggedIn(false);
        } else {
          setLoggedIn(true);
        }
      });
  }, []);

  function login(user) {
    setUser(user);
    setLoggedIn(true); // set loggedIn flag
    fetch("/vacations")
      .then((res) => res.json())
      .then((data) => {
        setVacations(data);
      });
  }

  function logout() {
    navigate("/");
    setUser({});
    setLoggedIn(false); // set loggedIn flag
  }

  function signup(user) {
    setUser(user);
    setLoggedIn(true); // set loggedIn flag
  }

  return (
    //add loggedIn to global state
    <UserContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        signup,
        loggedIn,
        vacations,
        setVacations,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
