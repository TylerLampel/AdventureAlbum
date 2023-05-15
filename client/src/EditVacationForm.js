import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { UserContext } from "./context/User";

function EditVacationForm() {
  const [title, setTitle] = useState("");
  const [depDate, setDepDate] = useState(new Date());
  const [retDate, setRetDate] = useState(new Date());
  const navigate = useNavigate();
  const { vacations, setVacations } = useContext(UserContext);
  const { id } = useParams();

  const vacation = vacations.find((vac) => vac.id === parseInt(id));

  useEffect(() => {
    if (vacation) {
      setTitle(vacation.title);
      setDepDate(vacation.depDate);
      setRetDate(vacation.retDate);
    }
  }, [vacation]);

  function editVacation(editedVacation) {
    const updatedVacations = vacations.map((vac) => {
      if (vac.id === editedVacation.id) {
        return editedVacation;
      }
      return vac;
    });
    setVacations(updatedVacations);
    navigate(`/vacations/${id}`);
  }

  const minDate = depDate;

  function handleEditSubmit(e) {
    e.preventDefault();
    const editedVacation = {
      title: title,
      departure_date: depDate.toISOString(),
      return_date: retDate.toISOString(),
    };

    fetch(`/vacations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedVacation),
    })
      .then((res) => res.json())
      .then((data) => {
        editVacation(data);
      });
    navigate(`/vacations/${id}`);
  }
  return (
    <div>
      <br />
      <form onSubmit={handleEditSubmit}>
        <label>Title: </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label>Departure Date: </label>
        <Calendar onChange={(date) => setDepDate(date)} value={depDate} />
        <br />
        <label>Return Date: </label>
        <Calendar
          onChange={(date) => setRetDate(date)}
          value={retDate}
          minDate={minDate}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditVacationForm;
