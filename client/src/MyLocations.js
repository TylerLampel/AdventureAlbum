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

  const uniqueLocations = {};

  vacations &&
    vacations.forEach((vacation) => {
      vacation.locations.forEach((location) => {
        const locationId = location.id;
        if (!uniqueLocations[locationId]) {
          uniqueLocations[locationId] = {
            name: location.name,
            vacations: [],
          };
        }
        if (!uniqueLocations[locationId].vacations.includes(vacation.id)) {
          uniqueLocations[locationId].vacations.push(vacation.id);
        }
      });
    });

  const renderedLocations = Object.values(uniqueLocations).map(
    (location, index) => (
      <Box key={index} sx={{ marginBottom: "16px" }}>
        <Typography variant="h4">{location.name}</Typography>
        <Typography variant="h5">Vacations:</Typography>
        <List>
          {location.vacations.map((vacationId) => {
            const vacation = vacations.find((v) => v.id === vacationId);
            if (vacation) {
              return (
                <ListItem key={vacation.id} disablePadding>
                  <ListItemText>
                    <Link to={`/vacations/${vacation.id}`}>
                      {vacation.title}
                    </Link>
                  </ListItemText>
                </ListItem>
              );
            }
            return null;
          })}
        </List>
      </Box>
    )
  );

  if (loggedIn) {
    return (
      <Box sx={{ padding: "16px" }}>
        <Paper elevation={3} sx={{ padding: "16px" }}>
          <Typography variant="h3">My Locations</Typography>
          {renderedLocations}
        </Paper>
      </Box>
    );
  } else {
    return <Typography variant="h3">Please Log In or Sign Up</Typography>;
  }
}

export default MyLocations;
