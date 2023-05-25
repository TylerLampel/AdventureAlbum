import { useState, useContext } from "react";
import { UserContext } from "./context/User";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

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
          // If the login is successful, store the user in the context and navigate to the home page
          login(user);
          navigate("/");
        } else {
          // If there are login errors, reset the form fields and display the error message
          setUsername("");
          setPassword("");
          setError(user.errors);
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
        <Paper elevation={4}>
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
              <Box mt={2} display="flex" justifyContent="center" width="100%">
                <Button
                  type="submit"
                  variant="contained"
                  style={{ marginRight: "10px" }}
                >
                  Log In
                </Button>
                <Button
                  variant="contained"
                  href="/signup"
                  style={{ marginLeft: "10px" }}
                >
                  Sign Up
                </Button>
              </Box>
            </form>
          </Box>
        </Paper>
      </Grid>
      {/* Display the error message if it exists */}
      <ul>
        {error && (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        )}
      </ul>
    </Grid>
  );
}

export default Login;
