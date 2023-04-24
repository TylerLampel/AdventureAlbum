import React, { useState } from "react";
import { useParams } from "react-router-dom";

function CreateAdventureForm() {
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
    images.forEach((image) => {
      formData.append("adventure[images][]", image);
    });

    fetch(`/vacations/${id}/adventures`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
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
          <input type="file" multiple onChange={handleImageChange} />
          {/* {images.map((image, index) => (
            <div key={index}>
              <img
                src={URL.createObjectURL(image)}
                alt={image.name}
                height="200px"
                width="200px"
              />
            </div>
          ))} */}
        </div>
        <button type="submit">Upload Adventure</button>
      </form>
    </div>
  );
}

export default CreateAdventureForm;
