import React, { useState, useContext } from "react";
import { UserContext } from "./context/User";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function AddVacationForm() {
  const [title, setTitle] = useState("");
  const [depDate, setDepDate] = useState(new Date());
  const [retDate, setRetDate] = useState(new Date());
  const navigate = useNavigate();

  const { vacations, setVacations } = useContext(UserContext);

  const minDate = depDate;

  function handleSubmit(e) {
    e.preventDefault();
    const newVacation = {
      title: title,
      departure_date: depDate.toISOString(),
      return_date: retDate.toISOString(),
    };

    fetch("/vacations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newVacation),
    })
      .then((res) => res.json())
      .then((data) => {
        setVacations([...vacations, data]);
      });
    setTitle("");
    setDepDate(new Date());
    setRetDate(new Date());
    navigate("/vacations");
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
        <Calendar onChange={setDepDate} value={depDate} />
        <br />
        <label>Return Date: </label>
        <Calendar onChange={setRetDate} value={retDate} minDate={minDate} />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddVacationForm;
