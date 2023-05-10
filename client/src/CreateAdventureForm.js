import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./context/User";

function CreateAdventureForm({ addAdventure, addLocation }) {
  const { id } = useParams();
  const { vacations } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [locationName, setLocationName] = useState("");
  const [images, setImages] = useState([]);
  const [showNewLocationInput, setShowNewLocationInput] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState(undefined);

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

    if (selectedLocationId === undefined) {
      alert("Please select a location or create a new one.");
      return;
    }

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
      .then((data) => addAdventure(data));
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
        console.log(newLocation);
        addLocation(newLocation);
        setLocationName("");
        setShowNewLocationInput(false);
      });
  }

  function handleImageChange(e) {
    setImages([...images, ...e.target.files]);
  }

  function handleLocationNameChange(e) {
    setLocationName(e.target.value);
  }

  function handleLocationSelectChange(e) {
    setSelectedLocationId(e.target.value);
  }

  const renderedLocationOptions = allLocations.map((location, index) => {
    return (
      <option key={index} value={location.id}>
        {location.name}
      </option>
    );
  });

  const renderedLocationInput = showNewLocationInput ? (
    <div>
      <label>Create a New Location</label>
      <input
        type="text"
        value={locationName}
        onChange={handleLocationNameChange}
      ></input>
      <button type="submit">Add Location</button>
    </div>
  ) : (
    <div>
      <label>Select A Location:</label>
      <select value={selectedLocationId} onChange={handleLocationSelectChange}>
        {renderedLocationOptions}
      </select>
    </div>
  );

  return (
    <div>
      <form onSubmit={handleLocationSubmit}>
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
      </form>
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
}

export default CreateAdventureForm;
