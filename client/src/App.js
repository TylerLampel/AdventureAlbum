// sudo service postgresql restart

import "./App.css";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/User";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import Navbar from "./NavBar";
import Header from "./Header";
import NotFound from "./NotFound";
import MyVacations from "./MyVacations";

function App() {
  return (
    <UserProvider>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notfound" element={<NotFound />} />
        <Route path="/vacations" element={<MyVacations />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
