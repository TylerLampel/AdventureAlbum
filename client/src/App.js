// sudo service postgresql restart
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
import MyVacations from "./MyVacations";
import AddVacationForm from "./AddVacationForm";
import VacationCard from "./VacationCard";
import EditVacationForm from "./EditVacationForm";
import MyLocations from "./MyLocations";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const theme = createTheme({});
  return (
    <ThemeProvider thme={theme}>
      <UserProvider>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/vacations" element={<MyVacations />} />
          <Route path="/vacations/:id" element={<VacationCard />} />
          <Route path="/add-vacation" element={<AddVacationForm />} />
          <Route path="/edit-vacation/:id" element={<EditVacationForm />} />
          <Route path="/my-locations" element={<MyLocations />} />
        </Routes>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
