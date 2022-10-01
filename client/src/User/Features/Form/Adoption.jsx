import React from "react";
import { useForm } from "react-hook-form";

const Adoption = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => console.log("Onsubmit", data);

  console.log(errors);

  return (
    <>
      <h1>Formulario de adopcion</h1>
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

        <button>Adopt</button>
      </form>
    </>
  );
};

export default Adoption;
