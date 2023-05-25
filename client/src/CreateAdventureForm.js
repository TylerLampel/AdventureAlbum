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

  // Extract all locations from vacations and store them in the `allLocations` array
  vacations &&
    vacations.map((vacation) =>
      vacation.locations.map((location) => allLocations.push(location))
    );

  // Handle changes in the adventure title input field
  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  // Handle form submission for creating an adventure
  function handleSubmit(e) {
    e.preventDefault();

    // Create a FormData object and append form data
    const formData = new FormData();
    formData.append("adventure[title]", title);
    formData.append("adventure[location_id]", selectedLocationId);
    formData.append("adventure[vacation_id]", id);

    for (let i = 0; i < images.length; i++) {
      formData.append("adventure[images][]", images[i]);
    }

    // Make a POST request to create the adventure
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

  // Handle form submission for creating a new location
  function handleLocationSubmit(e) {
    e.preventDefault();

    // Make a POST request to create a new location
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

  // Handle changes in the selected images
  function handleImageChange(e) {
    setImages(e.target.files);
  }

  // Handle changes in the new location name input field
  function handleLocationNameChange(e) {
    setLocationName(e.target.value);
  }

  // Handle changes in the selected location dropdown
  function handleLocationSelectChange(e) {
    setSelectedLocationId(e.target.value);
  }

  const uniqueLocations = [];

  // Render location options for the select dropdown
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

  // Render either the form for creating a new location or the location select dropdown
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

  // Render the create adventure form if the user is logged in, otherwise display a message to log in or sign up
  if (loggedIn) {
    return (
      <Box>
        <Typography variant="body1">
          Select the location of the adventure from the dropdown of locations,
          or create a new one!
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
