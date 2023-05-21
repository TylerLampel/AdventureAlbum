import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdventureList from "./AdventureList";
import CreateAdventureForm from "./CreateAdventureForm";
import { UserContext } from "./context/User";
import { Box, Paper, Typography, IconButton } from "@mui/material";
import { Delete, Edit, Add, Cancel } from "@mui/icons-material";

function VacationCard() {
  const { id } = useParams();
  const { vacations, setVacations } = useContext(UserContext);
  const [vacation, setVacation] = useState({ adventures: [], locations: [] });
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const currentVacation = vacations.find((v) => v.id === parseInt(id));
    setVacation(currentVacation);
  }, [id, vacations]);

  if (!vacation) {
    return <p>This vacation is not available.</p>;
  }

  function addAdventure(newAdventure) {
    const updatedVacation = {
      ...vacation,
      adventures: [...vacation.adventures, newAdventure],
    };
    const filteredVacations = vacations.filter((v) => v.id !== vacation.id);
    const newVacations = [...filteredVacations, updatedVacation];
    setVacation(updatedVacation);
    setVacations(newVacations);
  }

  function addLocation(newLocation) {
    const updatedVacation = {
      ...vacation,
      locations: [...vacation.locations, newLocation],
    };
    const filteredVacations = vacations.filter((v) => v.id !== vacation.id);
    const newVacations = [...filteredVacations, updatedVacation];
    setVacations(newVacations);
  }

  function deleteVacation() {
    const filteredVacations = vacations.filter((v) => v.id !== vacation.id);
    setVacations(filteredVacations);
  }

  function handleDeleteVacationClick() {
    fetch(`/vacations/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        deleteVacation(id);
        navigate("/vacations");
      } else {
        setErrorMessage("vacation does not exist");
      }
    });
  }

  if (errorMessage) {
    alert(errorMessage);
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh",
      }}
    >
      <Paper sx={{ padding: "20px" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h4">{vacation.title}</Typography>
          <IconButton
            onClick={handleDeleteVacationClick}
            color="error"
            aria-label="delete"
          >
            <Delete />
          </IconButton>
          <IconButton
            onClick={() => navigate(`/edit-vacation/${vacation.id}`)}
            color="primary"
            aria-label="edit"
          >
            <Edit />
          </IconButton>
        </Box>
        <Typography>Departure Date: {vacation.departure_date}</Typography>
        <Typography>Return Date: {vacation.return_date}</Typography>
        <Box mt={2}>
          <Typography variant="h6">Adventures</Typography>
          <IconButton
            onClick={() => setShowForm(!showForm)}
            color={showForm ? "error" : "primary"}
            aria-label="add"
          >
            {showForm ? <Cancel /> : <Add />}
          </IconButton>
        </Box>
        {showForm && (
          <CreateAdventureForm
            addAdventure={addAdventure}
            addLocation={addLocation}
          />
        )}
        <AdventureList
          adventures={vacation.adventures}
          addAdventure={addAdventure}
          addLocation={addLocation}
        />
      </Paper>
    </Box>
  );
}

export default VacationCard;
