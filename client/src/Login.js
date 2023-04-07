import React, { useState, useContext } from "react";
import { UserContext } from "./context/User";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (!user.errors) {
          login(user);
          navigate("/");
        } else {
          setUsername("");
          setPassword("");
          setError(user.errors);
        }
      });
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username-input">Username: </label>
        <input
          id="username-input"
          label="Username"
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
        <button type="submit">Log In</button>
      </form>
      <ul>
        {error && (
          <p severity="error" onClose={() => setError(!error)}>
            {error}
          </p>
        )}
      </ul>
    </div>
  );
}

export default Login;
