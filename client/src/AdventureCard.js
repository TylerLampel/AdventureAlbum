import { useContext } from "react";
import { UserContext } from "./context/User";
import { Typography, Box } from "@mui/material";

function AdventureCard({ adventure }) {
  const { loggedIn } = useContext(UserContext);
  const images = adventure.images;

  const renderedAdventureCards =
    images &&
    images.map((image, index) => {
      return (
        <img
          key={index}
          src={image.url}
          alt={image.created_at}
          height="200px"
          width="200px"
        />
      );
    });

  if (loggedIn) {
    return (
      <Box sx={{ padding: "16px", textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          {adventure.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Location: {adventure.location.name}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {renderedAdventureCards}
        </Box>
      </Box>
    );
  } else {
    return (
      <Box sx={{ padding: "16px", textAlign: "center" }}>
        <Typography variant="h2">Please Log In or Sign Up</Typography>
      </Box>
    );
  }
}

export default AdventureCard;
