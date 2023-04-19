import React, { useEffect, useState } from "react";
import UploadImageForm from "./UploadImageForm";
import PhotoCard from "./PhotoCard";

function VacationCard({ vacation }) {
  const { departure_date, return_date, title, id } = vacation;
  const renderedImages = vacation.photos.map((photo) => (
    <PhotoCard photo={photo} />
  ));

  function submitImageToAPI(data) {
    fetch(`/vacations/${id}/photos`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error(error));
  }
  return (
    <div>
      <h3>{title}</h3>
      <p>{departure_date}</p>
      <p>{return_date}</p>
      <UploadImageForm id={vacation.id} submitImageToAPI={submitImageToAPI} />
      {renderedImages}
    </div>
  );
}

export default VacationCard;
