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
    // Fetch the current vacation based on the id from the URL params
    const currentVacation = vacations.find((v) => v.id === parseInt(id));
    setVacation(currentVacation);
  }, [id, vacations]);

  if (!vacation) {
    return <p>This vacation is not available.</p>;
  }

  function addAdventure(newAdventure) {
    // Add a new adventure to the current vacation
    const updatedVacation = {
      ...vacation,
      adventures: [...vacation.adventures, newAdventure],
    };
    // Update the vacations list by replacing the current vacation with the updated one
    const filteredVacations = vacations.filter((v) => v.id !== vacation.id);
    const newVacations = [...filteredVacations, updatedVacation];
    setVacation(updatedVacation);
    setVacations(newVacations);
  }

  function addLocation(newLocation) {
    // Add a new location to the current vacation
    const updatedVacation = {
      ...vacation,
      locations: [...vacation.locations, newLocation],
    };
    // Update the vacations list by replacing the current vacation with the updated one
    const filteredVacations = vacations.filter((v) => v.id !== vacation.id);
    const newVacations = [...filteredVacations, updatedVacation];
    setVacations(newVacations);
  }

  function deleteVacation() {
    // Delete the current vacation from the vacations list
    const filteredVacations = vacations.filter((v) => v.id !== vacation.id);
    setVacations(filteredVacations);
  }

  function handleDeleteVacationClick() {
    // Handle the delete vacation button click
    fetch(`/vacations/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          // If the vacation was successfully deleted, update the vacations list and navigate to the vacations page
          deleteVacation(id);
          navigate("/vacations");
        } else {
          // If there was an error deleting the vacation, set an error message
          setErrorMessage("Vacation does not exist");
        }
      })
      .catch((error) => {
        // If there was an error with the network request, set an error message
        setErrorMessage("Error occurred while deleting the vacation");
      });
  }

  if (errorMessage) {
    // Display an alert if there is an error message
    alert(errorMessage);
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        marginTop: "20px",
      }}
    >
      <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h4">{vacation.title}</Typography>
        {/* Delete vacation button */}
        <IconButton
          onClick={handleDeleteVacationClick}
          color="error"
          aria-label="delete"
        >
          <Delete />
        </IconButton>
        {/* Edit vacation button */}
        <IconButton
          onClick={() => navigate(`/edit-vacation/${vacation.id}`)}
          color="primary"
          aria-label="edit"
        >
          <Edit />
        </IconButton>
        <Typography>Departure Date: {vacation.departure_date}</Typography>
        <Typography>Return Date: {vacation.return_date}</Typography>
      </Paper>
      <Paper sx={{ padding: "20px" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6">Adventures</Typography>
          {/* Toggle create adventure form button */}
          <IconButton
            onClick={() => setShowForm(!showForm)}
            color={showForm ? "error" : "primary"}
            aria-label="add"
          >
            {showForm ? <Cancel /> : <Add />}
          </IconButton>
        </Box>
        {/* Create adventure form */}
        {showForm && (
          <CreateAdventureForm
            addAdventure={addAdventure}
            addLocation={addLocation}
            setShowForm={setShowForm}
          />
        )}
        {/* List of adventures */}
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
