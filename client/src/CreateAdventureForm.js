import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./context/User";

function CreateAdventureForm({ adventures, setAdventures }) {
  const { id } = useParams();
  const { vacations, setVacations } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const [images, setImages] = useState([]);
  const [showNewLocationInput, setShowNewLocationInput] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const locs = vacations.map((v) => v.locations);
    const mergedLocs = [].concat(...locs);
    setLocations(mergedLocs);
  }, [vacations]);

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

  function handleAdventureSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("adventure[title]", title);
    formData.append("adventure[location_id]", location.id);
    formData.append("adventure[vacation_id", id);
    formData.append("location[name]", location);
    images.forEach((image) => {
      formData.append("adventure[images][]", image);
    });

    Promise.all([
      // POST the new adventure data
      fetch(`vacations/${id}/adventures`, {
        method: "POST",
        body: formData,
      }).then((res) => res.json()),
      // POST the new location data
      fetch("/locations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: location,
        }),
      }),
    ])
      .then(([adventureRes, locationRes]) =>
        Promise.all([adventureRes.json(), locationRes.json()])
      )
      .then(([adventure, location]) => {
        // Update the vacation object associated with the new adventure and location
        const updatedVacations = vacations.map((v) => {
          if (v.id === id) {
            return {
              ...v,
              adventures: [...v.adventures, adventure],
              locations: [...v.locations, location],
            };
          }
          return v;
        });
        setAdventures([...adventures, adventure]);
        setLocations([...locations, location]);
        setLocation(location);
        setShowNewLocationInput(false);
        setLoading(false);
        setVacations(updatedVacations);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }

  // function handleNewLocationSubmit(e) {
  //   e.preventDefault();
  //   setLoadingNewLocation(true);
  //   const newLocationData = { name: location, vacation_id: id };
  //   fetch("/locations", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newLocationData),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // Update the vacation object associated with the new location
  //       const updatedVacations = vacations.map((v) => {
  //         if (v.id === id) {
  //           return {
  //             ...v,
  //             locations: [...v.locations, data],
  //           };
  //         }
  //         return v;
  //       });
  //       console.log(data);
  //       // setLocations([...locations, data]);
  //       // setLocation(data);
  //       // setShowNewLocationInput(false);
  //       // setLoadingNewLocation(false);
  //       // setVacations(updatedVacations);
  //     });
  // }

  // function handleSubmit(e) {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append("adventure[title]", title);

  //   let locationId;
  //   const existingLocation = locations.find((loc) => loc.name === location);
  //   if (existingLocation) {
  //     locationId = existingLocation.id;
  //   } else {
  //     setShowNewLocationInput(true);
  //     return;
  //   }
  //   formData.append("adventure[location_id]", locationId);
  //   formData.append("adventure[vacation_id]", id);

  //   for (let i = 0; i < images.length; i++) {
  //     formData.append("adventure[images][]", images[i]);
  //   }

  //   console.log("New Adventure", formData);

  //   fetch(`/vacations/${id}/adventures`, {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setAdventures(
  //         Array.isArray(adventures) ? [...adventures, data] : [data]
  //       );
  //       e.target.reset();

  //       // Update the vacation in the vacations array
  //       const updatedVacations = vacations.map((vacation) => {
  //         if (vacation.id === id) {
  //           const updatedAdventures = [...vacation.adventures, data];
  //           const updatedLocations = existingLocation
  //             ? [...vacation.locations]
  //             : [...vacation.locations, data.location];
  //           return {
  //             ...vacation,
  //             adventures: updatedAdventures,
  //             locations: updatedLocations,
  //           };
  //         } else {
  //           return vacation;
  //         }
  //       });

  //       // Update the vacations state with the updated array
  //       setVacations(updatedVacations);
  //     });
  // }

  const renderedLocationOptions =
    !locations || locations.length === 0 ? (
      <option value="">Please Create A Location</option>
    ) : (
      <>
        <option value="">Select a location</option>
        {locations.map((location, index) => (
          <option key={index} value={location.name}>
            {location.name}
          </option>
        ))}
      </>
    );

  return (
    <div>
      <form onSubmit={handleAdventureSubmit}>
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
          {loading && <p>Creating location...</p>}
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
