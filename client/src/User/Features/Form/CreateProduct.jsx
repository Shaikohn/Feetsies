import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";

const CreateProduct = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    console.log("Onsubmit", data);
    try {
      await axios.post("http://localhost:3001/products/create", data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(errors);

  return (
    <>
      <h1>Form Product</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Product´s name</label>
        <input
          {...register("name", {
            required: true,
            pattern: /^[a-zA-Z ]*$/i,
            maxLength: 20,
          })}
          aria-invalid={errors.name ? "true" : "false"}
        />
        {errors?.name?.type === "required" && <p>This field is required</p>}
        {errors?.name?.type === "maxLength" && (
          <p>Product's name cannot exceed 20 characters</p>
        )}
        {errors?.name?.type === "pattern" && (
          <p>Alphabetical characters only</p>
        )}

        <label>Description</label>
        <textarea
          {...register("description", {
            required: true,
            maxLength: 50,
          })}
          aria-invalid={errors.description ? "true" : "false"}
          cols="30"
          rows="10"
        ></textarea>
        {errors?.description?.type === "required" && (
          <p>This field is required</p>
        )}
        {errors?.description?.type === "maxLength" && (
          <p>Description cannot exceed 50 characters</p>
        )}

        <label>Price</label>
        <input
          type="number"
          {...register("price", { required: "A price is required", max: 1000 })}
          aria-invalid={errors.price ? "true" : "false"}
        />
        {errors?.price?.type === "required" && (
          <p role="alert">{errors.price?.message}</p>
        )}
        {errors?.price?.type === "max" && (
          <p>the price can not be more than 1000</p>
        )}

        <label>Stock</label>
        <input
          type="number"
          {...register("stock")}
          defaultValue="0"
          //   aria-invalid={errors.stock ? "true" : "false"}
        />
        {/* {errors.stock && <p role="alert">{errors.stock?.message}</p>} */}

        <button>Create product</button>
      </form>
    </>
  );
};

export default CreateProduct;
