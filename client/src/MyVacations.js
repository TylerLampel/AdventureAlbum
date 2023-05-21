import { useContext } from "react";
import { UserContext } from "./context/User";
import { Link } from "react-router-dom";
import { Box, Paper, Button, Typography } from "@mui/material";

function MyVacations() {
  const { loggedIn, vacations } = useContext(UserContext);

  const renderedVacationLinks =
    vacations && vacations.length === 0 ? (
      <li>Please add a vacation</li>
    ) : (
      vacations.map((vacation) => {
        return (
          <li key={vacation.id}>
            <Link to={`/vacations/${vacation.id}`}>{vacation.title}</Link>
          </li>
        );
      })
    );

  console.log(vacations);

  if (loggedIn) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center", // Add this line
          minHeight: "50vh",
          gap: "20px",
        }}
      >
        <Paper elevation={3} sx={{ padding: "20px" }}>
          <Typography variant="h4" align="center" mb={3}>
            My Vacations
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button component={Link} to="/add-vacation" variant="contained">
              Add a Vacation
            </Button>
          </Box>
          <ul>{renderedVacationLinks}</ul>
        </Paper>
      </Box>
    );
  } else {
    return <Typography variant="h4">Please Log In or Sign Up</Typography>;
  }
}

export default MyVacations;
