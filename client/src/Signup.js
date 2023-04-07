import React, { useState, useContext } from "react";
import { UserContext } from "./context/User";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorsList, setErrorsList] = useState([]);
  const { signup } = useContext(UserContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        password_confirmation: passwordConfirmation,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (!user.errors) {
          signup(user);
          navigate("/");
        } else {
          setUsername("");
          setPassword("");
          setPasswordConfirmation("");
          const errorList = user.errors.map((e) => <div>{e}</div>);
          setErrorsList(errorList);
        }
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          label="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label htmlFor="password-input">Password: </label>
        <input
          id="password-input"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <label htmlFor="password-confirmation-input">
          Password Confirmation:{" "}
        </label>
        <input
          id="password-confirmation-input"
          label="Password Confirmation"
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <br />
        <button type="submit">Sign Up</button>
        <p>{errorsList}</p>
      </form>
    </div>
  );
}

export default Signup;
