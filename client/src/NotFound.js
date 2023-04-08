import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h2>404 Not Found</h2>
      <Link to="/">
        <button>Home</button>
      </Link>
    </div>
  );
}

export default NotFound;
