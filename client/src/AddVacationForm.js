import React, { useState } from "react";

function AddVacationForm() {
  const [title, setTitle] = useState("");
  const [depDate, setDepDate] = useState("");
  const [retDate, setRetDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
  }
  return (
    <div>
      <br />
      <form onSubmit={handleSubmit}>
        <label>Title: </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label>Departure Date: </label>
        <input
          id="departure_date"
          value={depDate}
          onChange={(e) => setDepDate(e.target.value)}
        />
        <br />
        <label>Return Date: </label>
        <input
          id="return-date"
          value={retDate}
          onChange={(e) => setRetDate(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddVacationForm;
