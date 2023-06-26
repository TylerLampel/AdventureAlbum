import { useContext } from "react";
import { UserContext } from "./context/User";
import { Link } from "react-router-dom";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";

function MyLocations() {
  const { loggedIn, vacations } = useContext(UserContext);

  // Render the locations and their associated vacations
  const renderedLocations = vacations.map((vacation, index) => (
    <Box key={index} sx={{ marginBottom: "6px" }}>
      <List>
        <ListItem key={vacation.id} disablePadding>
          <ListItemText>
            <Link to={`/vacations/${vacation.id}`}>{vacation.title}</Link>
          </ListItemText>
        </ListItem>
      </List>
    </Box>
  ));

  // Render the component based on user login status
  if (loggedIn) {
    return (
      <Box sx={{ padding: "16px" }}>
        <Paper elevation={3} sx={{ padding: "6px" }}>
          <Typography variant="h3">My Vacations</Typography>
          {renderedLocations}
        </Paper>
      </Box>
    );
  } else {
    return <Typography variant="h3">Please Log In or Sign Up</Typography>;
  }
}

export default MyLocations;
