import React from "react";

function UploadImageForm({ id, submitImageToAPI }) {
  function handleImageSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo[title]", e.target.title.value);
    formData.append("photo[image]", e.target.image.files[0]);
    formData.append("photo[vacation_id]", id);

    submitImageToAPI(formData);
  }

  return (
    <div>
      <form onSubmit={handleImageSubmit}>
        <label htmlFor="title">Title </label>
        <input type="text" name="title" id="title" />
        <br />
        <label htmlFor="image">Image </label>
        <input type="file" name="image" id="image" />
        <br />
        <button type="submit">Submit Image</button>
      </form>
    </div>
  );
}

export default UploadImageForm;
