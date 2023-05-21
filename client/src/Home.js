import { useContext } from "react";
import { UserContext } from "./context/User";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

function Home() {
  const { loggedIn } = useContext(UserContext);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh",
        pt: "40px",
      }}
    >
      <div>
        {loggedIn ? (
          <Paper elevation={3} sx={{ padding: "20px" }}>
            <h2> Home Page </h2>
            <div>
              <p>Welcome to Adventure Album!</p>
              <p>Here you can create photo albums for any vacation!</p>
              <ul>
                <li>
                  <p>Click Add Vacation</p>
                </li>
                <li>
                  <p>
                    Type in the title of the vacation, and choose the departure
                    and return date.
                  </p>
                </li>
                <li>
                  <p>Click Add Adventure</p>
                </li>
                <li>
                  <p>
                    Create a new location name for where the images were taken
                  </p>
                  <p>Type in the title of the adventure, and add photos.</p>
                </li>
                <li>
                  <p>
                    View all of your adventures on this vacation anytime you
                    want!
                  </p>
                </li>
                <li>
                  <p>
                    Also you can check out all of your locations with a link to
                    that vacation!
                  </p>
                </li>
              </ul>
              <p>Thank you for trying Adventure Album! We hope you enjoy it!</p>
            </div>
          </Paper>
        ) : (
          <h3>Please Log In or Sign Up</h3>
        )}
      </div>
    </Box>
  );
}
export default Home;
