import { useState, useContext } from "react";
import { UserContext } from "./context/User";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Box, Button, Typography, TextField, Paper } from "@mui/material";

function AddVacationForm() {
  // Retrieve necessary data from the UserContext
  const { loggedIn, user, vacations, setVacations } = useContext(UserContext);

  // State variables to hold form input values
  const [title, setTitle] = useState("");
  const [depDate, setDepDate] = useState(new Date());
  const [retDate, setRetDate] = useState(new Date());
  const [error, setError] = useState([]);

  // Navigation function provided by react-router-dom
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    // Create a new vacation object based on form input values
    const newVacation = {
      title: title,
      departure_date: depDate.toISOString(),
      return_date: retDate.toISOString(),
      user_id: user.id,
    };

    // Send a POST request to the server to create a new vacation
    fetch("/vacations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newVacation),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          // If successful, update the vacations state and reset the form inputs
          setVacations([...vacations, data]);
          setTitle("");
          setDepDate(new Date());
          setRetDate(new Date());
          navigate("/vacations"); // Redirect to the vacations page
        } else {
          // If there are errors, update the error state
          setError(data.errors);
        }
      });
  }

  // If the user is not logged in, display a message
  if (!loggedIn) {
    return <Typography variant="h4">Please Log In or Sign Up</Typography>;
  }

  // Render the form
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{ padding: "20px", width: "400px", textAlign: "center" }}
      >
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Add Vacation
        </Typography>

        {/* Display error message if there are any */}
        {error && (
          <Typography
            variant="body1"
            color="error"
            sx={{ marginBottom: "10px" }}
          >
            {error}
          </Typography>
        )}

        {/* Form for adding a new vacation */}
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              alignItems: "center",
            }}
          >
            {/* Title input field */}
            <TextField
              id="title"
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* Departure date picker */}
            <DatePicker
              selected={depDate}
              onChange={(date) => setDepDate(date)}
              dateFormat="MM-dd-yyyy"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
            />

            {/* Return date picker */}
            <DatePicker
              selected={retDate}
              onChange={(date) => setRetDate(date)}
              dateFormat="MM-dd-yyyy"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              minDate={depDate}
            />
          </Box>

          {/* Submit button */}
          <Box display="flex" justifyContent="center" mt={2}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

export default AddVacationForm;
