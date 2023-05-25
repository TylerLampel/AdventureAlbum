// sudo service postgresql restart

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import NavBar from "./NavBar";
import MyVacations from "./MyVacations";
import AddVacationForm from "./AddVacationForm";
import VacationCard from "./VacationCard";
import EditVacationForm from "./EditVacationForm";
import MyLocations from "./MyLocations";
import { UserProvider } from "./context/User";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#8aaeae",
    },
    secondary: {
      main: "#f7eae8",
    },
    background: {
      default: "#F5F5EB",
      paper: "#f7eae8",
    },
    text: {
      primary: "rgba(0,0,0,0.66)",
    },
  },
  typography: {
    h3: {
      fontFamily: "Wix Madefor Display",
    },
    button: {
      fontFamily: "Droid Sans",
      fontWeight: 800,
    },
    h6: {
      fontFamily: "Open Sans",
    },
  },
});

function App() {
  return (
    <div className="container">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/myVacations" element={<MyVacations />} />
            <Route path="/vacations/:id" element={<VacationCard />} />
            <Route path="/add-vacation" element={<AddVacationForm />} />
            <Route path="/edit-vacation/:id" element={<EditVacationForm />} />
            <Route path="/my-locations" element={<MyLocations />} />
          </Routes>
        </UserProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
