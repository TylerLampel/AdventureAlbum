// sudo service postgresql restart

import "./App.css";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/User";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import Navbar from "./NavBar";

function App() {
  return (
    <UserProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
