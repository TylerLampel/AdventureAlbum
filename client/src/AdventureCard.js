import { useContext } from "react";
import { UserContext } from "./context/User";

function AdventureCard({ adventure }) {
  const { loggedIn } = useContext(UserContext);
  const images = adventure.images;

  const renderedAdventureCards =
    images &&
    images.map((image, index) => {
      return (
        <img
          key={index}
          src={image.url}
          alt={image.created_at}
          height="200px"
          width="200px"
        />
      );
    });

  if (loggedIn) {
    return (
      <div>
        <h1>{adventure.title}</h1>
        <p>{adventure.location && adventure.location.name}</p>
        {renderedAdventureCards}
      </div>
    );
  } else {
    return <h2>Please Log In or Sign Up</h2>;
  }
}

export default AdventureCard;
