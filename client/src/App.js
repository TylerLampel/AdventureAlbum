// sudo service postgresql restart

// create button to show or hide form
//add new route to display a list of locations with associated vacations
// add update, and destroy to vacations
//style

import "./App.css";
import React from "react";
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

function App() {
  return (
    <UserProvider>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/vacations" element={<MyVacations />} />
        <Route path="/vacations/:id" element={<VacationCard />} />
        <Route path="/add-vacation" element={<AddVacationForm />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
