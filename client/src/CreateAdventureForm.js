import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./context/User";

function CreateAdventureForm({ addAdventure, addLocation }) {
  const { id } = useParams();
  const { loggedIn, vacations } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [locationName, setLocationName] = useState("");
  const [images, setImages] = useState([]);
  const [showNewLocationInput, setShowNewLocationInput] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState(undefined);
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
        } else {
          setErrors(data.errors);
          alert(errors);
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
          alert(errors);
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
        <option key={index} value={location.id}>
          {location.name}
        </option>
      );
    } else {
      return null;
    }
  });

  const renderedLocationInput = showNewLocationInput ? (
    <form onSubmit={handleLocationSubmit}>
      <label>Create a New Location</label>
      <input
        type="text"
        value={locationName}
        onChange={handleLocationNameChange}
      ></input>
      <button type="submit">Add Location</button>
    </form>
  ) : (
    <div>
      <label>Select A Location:</label>
      <select value={selectedLocationId} onChange={handleLocationSelectChange}>
        {renderedLocationOptions}
      </select>
    </div>
  );
  if (loggedIn) {
    return (
      <div>
        <p>
          Select location of adventure from the drop down of locations, or
          create a new one!
        </p>
        <button
          type="button"
          onClick={() => setShowNewLocationInput(!showNewLocationInput)}
        >
          {showNewLocationInput
            ? "Click Here to Select Location"
            : "Click Here to Create New Location"}
        </button>
        {renderedLocationInput}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input type="text" value={title} onChange={handleTitleChange} />
          </div>
          <div>
            <label>Images:</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </div>
          <button type="submit">Upload Adventure</button>
        </form>
      </div>
    );
  } else {
    return <h2>Please Log In or Sign Up</h2>;
  }
}

export default CreateAdventureForm;
