import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AltaAdoption = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => console.log("Onsubmit", data);

  console.log(errors);

  // **** cloudinary ****
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "proyecto-final-animals");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/tawaynaskp/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();

    console.log("data", file);

    setImage(file.secure_url);
    setLoading(false);
  };

  return (
    <>
      <h1>Alta Adoption</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Motive</label>
        <input
          {...register("motive", { required: true })}
          aria-invalid={errors.motive ? "true" : "false"}
        />
        {errors.motive?.type === "required" && (
          <p role="alert">A short reason is required</p>
        )}

        <label>Name</label>
        <input
          {...register("name", { required: "Your name is required" })}
          aria-invalid={errors.name ? "true" : "false"}
        />
        {errors.name && <p role="alert">{errors.name?.message}</p>}

        <label>Description</label>
        <textarea
          {...register("description", {
            required: "You have to write a description!",
          })}
          aria-invalid={errors.description ? "true" : "false"}
          cols="30"
          rows="10"
        ></textarea>
        {errors.description && (
          <p role="alert">{errors.description?.message}</p>
        )}

        <label>Image</label>
        <input
          type="file"
          {...register("image", {
            required: "Please , select an image",
          })}
          aria-invalid={errors.image ? "true" : "false"}
          onChange={uploadImage}
        />
        {errors.image && <p role="alert">{errors.image?.message}</p>}

        {loading ? (
          <h3>Loading...</h3>
        ) : (
          <img alt="not fount" width={"250px"} src={image} />
        )}

        <button>Register</button>
      </form>
    </>
  );
};

export default AltaAdoption;
