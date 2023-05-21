import { useContext } from "react";
import { UserContext } from "./context/User";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function NavBar() {
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
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h3">Adventure Album</Typography>
            <Box
              sx={{ display: "flex", justifyContent: "center", flexGrow: 1 }}
            >
              <Button color="secondary" href="/">
                Home
              </Button>
              <Button color="secondary" href="/vacations">
                My Vacations
              </Button>
              <Button color="secondary" href="/add-vacation">
                Add A Vaction
              </Button>
              <Button color="secondary" href="/my-locations">
                My Locations
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                flexGrow: 1,
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{ marginRight: "10px" }}>
                Hello {user.username}
              </Typography>
              <Button
                onClick={logoutUser}
                color="secondary"
                variant="contained"
              >
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    );
  } else {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4">Adventure Album</Typography>
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", flexGrow: 1 }}
            >
              <Button color="secondary" href="/login">
                Login
              </Button>
              <Button color="secondary" href="/signup">
                Signup
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}

export default NavBar;
