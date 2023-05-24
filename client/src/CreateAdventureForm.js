import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./context/User";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

function CreateAdventureForm({ addAdventure, addLocation, setShowForm }) {
  const { id } = useParams();
  const { loggedIn, vacations } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [locationName, setLocationName] = useState("");
  const [images, setImages] = useState([]);
  const [showNewLocationInput, setShowNewLocationInput] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const [errors, setErrors] = useState([]);

  const allLocations = [];

  vacations &&
    vacations.map((vacation) =>
      vacation.locations.map((location) => allLocations.push(location))
    );

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("adventure[title]", title);
    formData.append("adventure[location_id]", selectedLocationId);
    formData.append("adventure[vacation_id]", id);

    for (let i = 0; i < images.length; i++) {
      formData.append("adventure[images][]", images[i]);
    }

    fetch(`/vacations/${id}/adventures`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          addAdventure(data);
          setTitle("");
          setImages([]);
          setShowForm(false);
        } else {
          setErrors(data.errors);
        }
      });
  }

  function handleLocationSubmit(e) {
    e.preventDefault();

    fetch("/locations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: locationName }),
    })
      .then((res) => res.json())
      .then((newLocation) => {
        if (!newLocation.errors) {
          addLocation(newLocation);
          setLocationName("");
          setSelectedLocationId(newLocation.id);
          setShowNewLocationInput(false);
        } else {
          setErrors(newLocation.errors);
        }
      });
  }

  function handleImageChange(e) {
    setImages(e.target.files);
  }

  function handleLocationNameChange(e) {
    setLocationName(e.target.value);
  }

  function handleLocationSelectChange(e) {
    setSelectedLocationId(e.target.value);
  }

  const uniqueLocations = [];

  const renderedLocationOptions = allLocations.map((location, index) => {
    if (!uniqueLocations.includes(location.name)) {
      uniqueLocations.push(location.name);
      return (
        <MenuItem key={index} value={location.id}>
          {location.name}
        </MenuItem>
      );
    } else {
      return null;
    }
  });

  const renderedLocationInput = showNewLocationInput ? (
    <form onSubmit={handleLocationSubmit}>
      <TextField
        label="Create a New Location"
        variant="outlined"
        value={locationName}
        onChange={handleLocationNameChange}
      />
      <Button type="submit" variant="contained">
        Add Location
      </Button>
      <Button
        variant="contained"
        onClick={() => setShowNewLocationInput(false)}
      >
        Cancel
      </Button>
    </form>
  ) : (
    <Box>
      <InputLabel>Select A Location:</InputLabel>
      <FormControl variant="outlined" fullWidth>
        <Select
          value={selectedLocationId}
          onChange={handleLocationSelectChange}
          label="Select A Location"
        >
          {renderedLocationOptions}
        </Select>
      </FormControl>
    </Box>
  );

  if (loggedIn) {
    return (
      <Box>
        <Typography variant="body1">
          Select location of adventure from the drop-down of locations, or
          create a new one!
        </Typography>
        <Button
          type="button"
          onClick={() => setShowNewLocationInput(!showNewLocationInput)}
          variant="contained"
          sx={{ marginTop: "10px", marginBottom: "10px" }}
        >
          {showNewLocationInput
            ? "Click Here to Select Location"
            : "Click Here to Create New Location"}
        </Button>
        {renderedLocationInput}
        <form onSubmit={handleSubmit}>
          <Box sx={{ marginBottom: "10px" }}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={handleTitleChange}
            />
          </Box>
          <Box sx={{ marginBottom: "10px" }}>
            <InputLabel>Images:</InputLabel>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleImageChange(e)}
            />
          </Box>
          <Button type="submit" variant="contained">
            Upload Adventure
          </Button>
        </form>
        {errors && (
          <Typography
            variant="body1"
            color="error"
            sx={{ marginBottom: "10px" }}
          >
            {errors}
          </Typography>
        )}
      </Box>
    );
  } else {
    return <Typography variant="h2">Please Log In or Sign Up</Typography>;
  }
}

export default CreateAdventureForm;
