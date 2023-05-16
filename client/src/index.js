import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
import { UserProvider } from "./context/User";

// const theme = createTheme({
//   palette: {
//     mode: "light",
//     primary: {
//       main: "#5a90c6",
//     },
//     secondary: {
//       main: "#c6905a",
//     },
//     background: {
//       default: "#5ac6c6",
//       paper: "#40633e",
//     },
//   },
// });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    {/* <ThemeProvider theme={theme}>
      <CssBaseline /> */}
    <UserProvider>
      <App />
    </UserProvider>
    {/* </ThemeProvider> */}
  </BrowserRouter>
);
