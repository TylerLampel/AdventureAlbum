import React, { useState, useContext } from "react";
import { UserContext } from "./context/User";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorsList, setErrorsList] = useState([]);
  const navigate = useNavigate();

  return <div></div>;
}

export default Signup;
