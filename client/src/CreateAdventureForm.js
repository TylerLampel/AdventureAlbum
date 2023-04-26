import React, { useState } from "react";
import { useParams } from "react-router-dom";

function CreateAdventureForm({ adventures, setAdventures }) {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleImageChange(e) {
    setImages([...images, ...e.target.files]);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("adventure[title]", title);
    formData.append("adventure[vacation_id]", id);

    for (let i = 0; i < images.length; i++) {
      formData.append("adventure[images][]", images[i]);
    }

    fetch(`/vacations/${id}/adventures`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAdventures(...adventures, data);
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div>
          <label>Images:</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">Upload Adventure</button>
      </form>
    </div>
  );
}

export default CreateAdventureForm;
