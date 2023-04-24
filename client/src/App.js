// sudo service postgresql restart

import "./App.css";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/User";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import Navbar from "./NavBar";
import Header from "./Header";
import NotFound from "./NotFound";
import MyVacations from "./MyVacations";
import AddVacationForm from "./AddVacationForm";
import VacationCard from "./VacationCard";
import AdventureList from "./AdventureList";
import AdventureCard from "./AdventureCard";

function App() {
  const [vacations, setVacations] = useState([]);

  useEffect(() => {
    fetch("/vacations")
      .then((res) => res.json())
      .then((data) => {
        setVacations(data);
        console.log("vacations", data);
      });
  }, []);

  return (
    <UserProvider>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route
          path="/vacations"
          element={<MyVacations vacations={vacations} />}
        />
        <Route path="/vacations/:id" element={<VacationCard />} />
        <Route path="/vacations/:id/adventures" element={<AdventureList />} />
        <Route path="/adventures/:id" element={<AdventureCard />} />
        <Route path="/add-vacation" element={<AddVacationForm />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
