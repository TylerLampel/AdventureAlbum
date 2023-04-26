import React, { useState, useEffect } from "react";

// create context
const UserContext = React.createContext();

//create provider component
function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false); //add loggedIn flag
  const [vacations, setVacations] = useState([]);

  useEffect(() => {
    fetch("/vacations")
      .then((res) => res.json())
      .then((data) => {
        setVacations(data);
        console.log("vacations", data);
      });
  }, []);

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
  }

  function logout() {
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

export { UserContext, UserProvider };