import { useState, useContext } from "react";
import { UserContext } from "./context/User";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Box, Button, Typography, TextField, Paper } from "@mui/material";

function AddVacationForm() {
  const { loggedIn, user, vacations, setVacations } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [depDate, setDepDate] = useState(new Date());
  const [retDate, setRetDate] = useState(new Date());
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const minDate = depDate;

  function handleSubmit(e) {
    e.preventDefault();
    const newVacation = {
      title: title,
      departure_date: depDate.toISOString(),
      return_date: retDate.toISOString(),
      user_id: user.id,
    };

    fetch("/vacations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newVacation),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setVacations([...vacations, data]);
          setTitle("");
          setDepDate(new Date());
          setRetDate(new Date());
          navigate("/vacations");
        } else {
          setErrors(data.errors);
        }
      });
  }

  if (errors.length > 0) {
    alert(errors);
  }
  if (!loggedIn) {
    return <Typography variant="h4">Please Log In or Sign Up</Typography>;
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
      <Paper
        elevation={3}
        sx={{ padding: "20px", width: "400px", textAlign: "center" }}
      >
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Add Vacation
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <TextField
              id="title"
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <DatePicker
              selected={depDate}
              onChange={(date) => setDepDate(date)}
              dateFormat="MM-dd-yyyy"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
            />
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
