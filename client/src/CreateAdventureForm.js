import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function CreateAdventureForm({ adventures, setAdventures, locs }) {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const [images, setImages] = useState([]);
  const [showNewLocationInput, setShowNewLocationInput] = useState(false);
  const [loadingNewLocation, setLoadingNewLocation] = useState(false);

  useEffect(() => {
    if (locs && locs.length > 0) {
      setLocations(locs);
    }
  }, [locs]);

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleLocationChange(e) {
    setLocation(e.target.value);
  }

  function handleImageChange(e) {
    setImages([...images, ...e.target.files]);
  }

  function handleNewLocationInputChange(e) {
    setLocation(e.target.value);
  }

  function handleNewLocationSubmit(e) {
    e.preventDefault();
    const newLocationData = { name: location };
    setLoadingNewLocation(true);
    fetch("/locations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLocationData),
    })
      .then((res) => res.json())
      .then((data) => {
        setLocations([...locations, data]);
        setLocation(data.name);
        setShowNewLocationInput(false);
        setLoadingNewLocation(false);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("adventure[title]", title);

    let locationId;
    const existingLocation = locations.find((loc) => loc.name === location);
    if (existingLocation) {
      locationId = existingLocation.id;
    } else {
      setShowNewLocationInput(true);
      return;
    }
    formData.append("adventure[location_id]", locationId);
    formData.append("adventure[vacation_id]", id);

    for (let i = 0; i < images.length; i++) {
      formData.append("adventure[images][]", images[i]);
    }

    console.log("New Adventure", formData);

    fetch(`/vacations/${id}/adventures`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setAdventures([...adventures, data]);
        e.target.reset();
      });
  }

  const renderedLocationOptions =
    !locations || locations.length === 0 ? (
      <option value="">Please Create A Location</option>
    ) : (
      <>
        <option value="">Select a location</option>
        {locations.map((location) => (
          <option key={location.id} value={location.name}>
            {location.name}
          </option>
        ))}
      </>
    );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div>
          <label>Location:</label>
          {showNewLocationInput ? (
            <div>
              <input
                type="text"
                value={location}
                onChange={handleNewLocationInputChange}
              />
              <button onClick={handleNewLocationSubmit}>Create</button>
              <button onClick={() => setShowNewLocationInput(false)}>
                Cancel
              </button>
            </div>
          ) : (
            <>
              <select value={location} onChange={handleLocationChange}>
                {renderedLocationOptions}
              </select>
              <button onClick={() => setShowNewLocationInput(true)}>
                Create New Location
              </button>
            </>
          )}
          {loadingNewLocation && <p>Creating location...</p>}
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
