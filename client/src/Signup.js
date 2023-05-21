import { useState, useContext } from "react";
import { UserContext } from "./context/User";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

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
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      minHeight="50vh"
    >
      <Grid item>
        <Paper elevation="4">
          <Box p={3} display="flex" flexDirection="column" alignItems="center">
            <form onSubmit={handleSubmit}>
              <TextField
                id="username-input"
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                id="password-input"
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                id="password-confirmation-input"
                label="Password Confirmation"
                type="password"
                variant="outlined"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                fullWidth
                margin="normal"
              />
              <Box mt={2} display="flex" justifyContent="center" width="100%">
                <Button
                  type="submit"
                  variant="contained"
                  style={{ marginRight: "10px" }}
                >
                  Sign Up
                </Button>
                <Button
                  variant="contained"
                  href="/login"
                  style={{ marginLeft: "10px" }}
                >
                  Log In
                </Button>
              </Box>
            </form>
          </Box>
        </Paper>
        <p>{errorsList}</p>
      </Grid>
    </Grid>
  );
}

export default Signup;
