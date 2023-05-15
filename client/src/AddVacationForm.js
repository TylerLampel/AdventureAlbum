import { useState, useContext } from "react";
import { UserContext } from "./context/User";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function AddVacationForm() {
  const { loggedIn, user, vacations, setVacations } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [depDate, setDepDate] = useState(new Date());
  const [retDate, setRetDate] = useState(new Date());
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const minDate = depDate;

  function handleSubmit(e) {
    e.preventDefault();
    const newVacation = {
      title: title,
      departure_date: depDate.toISOString(),
      return_date: retDate.toISOString(),
      user_id: user.id,
    };

    fetch("/vacations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newVacation),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setVacations([...vacations, data]);
          setTitle("");
          setDepDate(new Date());
          setRetDate(new Date());
          navigate("/vacations");
        } else {
          setErrors(data.errors);
        }
      });
  }

  if (errors.length > 0) {
    alert(errors);
  }
  if (loggedIn) {
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
  } else {
    return <h2>Please Log In or Sign Up</h2>;
  }
}

export default AddVacationForm;
