import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "./context/User";

function CreateAdventureForm({ addAdventure, addLocation }) {
  const { id } = useParams();
  const { vacations } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  // const [locations, setLocations] = useState([]);
  const [images, setImages] = useState([]);
  // const [showNewLocationInput, setShowNewLocationInput] = useState(false);
  // const [loading, setLoading] = useState(false);

  const allLocations = [];

  vacations.map((vacation) => {
    vacation.locations.map((location) => {
      allLocations.push(location);
    });
  });

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("adventure[title]", title);
    formData.append("adventure[location_id]");
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
      .then((data) => addAdventure(data));
  }
  // function handleLocationChange(e) {
  //   setLocation(e.target.value);
  // }

  function handleLocationSubmit(e) {
    e.preventDefault();
    fetch("/locations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    })
      .then((res) => res.json())
      .then((newLocation) => addLocation(newLocation));
    setName("");
  }

  function handleImageChange(e) {
    setImages([...images, ...e.target.files]);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  // function handleNewLocationSubmit(e) {
  //   e.preventDefault();
  //   setLoading(true);
  //   const newLocationData = { name: location };

  //   // Replace 1 with the ID of the vacation you want to add the location to
  //   const vacationToUpdate = vacations.find((vacation) => vacation.id == id);

  //   fetch("/locations", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newLocationData),
  //   })
  //     .then((res) => res.json())
  //     .then((newLocation) => {
  //       // Add the new location to the vacation's locations array
  //       vacationToUpdate.locations.push(newLocation);

  //       // Update the vacations state with the updated vacation object
  //       setVacations((prevVacations) => ({
  //         ...prevVacations,
  //         [vacationToUpdate.id]: vacationToUpdate,
  //       }));

  //       setLoading(false);
  //     });
  // }

  // function handleSubmit(e) {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   let locationId;
  //   const existingLocation = locations.find((loc) => loc.name === location);
  //   if (existingLocation) {
  //     locationId = existingLocation.id;
  //   } else {
  //     locationId = location.id;
  //     return;
  //   }
  //   formData.append("adventure[title]", title);
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

  // const renderedLocationOptions =
  //   !locations || locations.length === 0 ? (
  //     <option value="">Please Create A Location</option>
  //   ) : (
  //     <>
  //       <option value="">Select a location</option>
  //       {locations.map((location, index) => (
  //         <option key={index} value={location.name}>
  //           {location.name}
  //         </option>
  //       ))}
  //     </>
  //   );

  return (
    <div>
      <form onSubmit={handleLocationSubmit}>
        <div>
          <label>Create a New Location</label>
          <input type="text" value={name} onChange={handleNameChange}></input>
        </div>
        <button type="submit">Add Location</button>
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
  // return (
  //   <div>
  //     <form onSubmit={handleSubmit}>
  //       <div>
  //         <label>Title:</label>
  //         <input type="text" value={title} onChange={handleTitleChange} />
  //       </div>
  //       <div>
  //         <label>Location:</label>
  //         {showNewLocationInput ? (
  //           <div>
  //             <input
  //               type="text"
  //               value={location}
  //               onChange={handleNewLocationInputChange}
  //             />
  //             <button onClick={handleNewLocationSubmit}>Add Location</button>
  //             <button onClick={() => setShowNewLocationInput(false)}>
  //               Cancel
  //             </button>
  //           </div>
  //         ) : (
  //           <>
  //             <select value={location} onChange={handleLocationChange}>
  //               {renderedLocationOptions}
  //             </select>
  //             <button onClick={() => setShowNewLocationInput(true)}>
  //               Create New Location
  //             </button>
  //           </>
  //         )}
  //         {loading && <p>Creating location...</p>}
  //       </div>
  //       <div>
  //         <label>Images:</label>
  //         <input
  //           type="file"
  //           accept="image/*"
  //           multiple
  //           onChange={handleImageChange}
  //         />
  //       </div>
  //       <button type="submit">Upload Adventure</button>
  //     </form>
  //   </div>
  // );
}

export default CreateAdventureForm;
