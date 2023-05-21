import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Typography, Paper, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "./context/User";

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #bdbdbd;
  outline: none;
`;

function EditVacationForm() {
  const [title, setTitle] = useState("");
  const [depDate, setDepDate] = useState(new Date());
  const [retDate, setRetDate] = useState(new Date());
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { vacations, setVacations } = useContext(UserContext);
  const { id } = useParams();

  const vacation = vacations.find((vac) => vac.id === parseInt(id));

  useEffect(() => {
    if (vacation) {
      setTitle(vacation.title);
      setDepDate(new Date(vacation.departure_date));
      setRetDate(new Date(vacation.return_date));
    }
  }, [vacation]);

  function editVacation(editedVacation) {
    const updatedVacations = vacations.map((vac) => {
      if (vac.id === editedVacation.id) {
        return editedVacation;
      }
      return vac;
    });
    setVacations(updatedVacations);
    navigate(`/vacations/${id}`);
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    const editedVacation = {
      title: title,
      departure_date: depDate.toISOString(),
      return_date: retDate.toISOString(),
    };

    fetch(`/vacations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedVacation),
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          editVacation(data);
        });
      } else {
        return res.json().then((data) => {
          setError(data.errors);
        });
      }
    });
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
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
          Edit Vacation
        </Typography>
        {error && (
          <Typography
            variant="body1"
            color="error"
            sx={{ marginBottom: "10px" }}
          >
            {error}
          </Typography>
        )}
        <form onSubmit={handleEditSubmit}>
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
            <StyledDatePicker
              selected={depDate}
              onChange={(date) => setDepDate(date)}
              dateFormat="MM-dd-yyyy"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              customInput={
                <TextField
                  id="depDate"
                  label="Departure Date"
                  variant="outlined"
                  sx={{ width: "100%" }}
                />
              }
            />
            <StyledDatePicker
              selected={retDate}
              onChange={(date) => setRetDate(date)}
              dateFormat="MM-dd-yyyy"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              minDate={depDate}
              customInput={
                <TextField
                  id="retDate"
                  label="Return Date"
                  variant="outlined"
                  sx={{ width: "100%" }}
                />
              }
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

export default EditVacationForm;
