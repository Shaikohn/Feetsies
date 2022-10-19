import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../../../redux/actions/shoppingCartA";
import { getShoppingCart } from "../../../redux/actions/ShoppingCartView";
import CheckoutForm from "../../Features/CheckoutForm/CheckoutForm";
import { useModal } from "../../Features/Modals/useModal";
import Modals from "../../Features/Modals/Modals";
import "../../Features/Modals/Modals.css";
import Swal from "sweetalert2";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { ButtonBase, CardMedia, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import {
  clearProductDetails,
  getProductDetails,
} from "../../../redux/actions/productDetailsActions";
import {
  clearProducts,
  getAllProducts,
} from "../../../redux/actions/getProductsA";

const stripePromise = loadStripe(
  "pk_test_51LpgGdIsUHqf6y0peEPMdjCDcsjuA2sdBcEGka27crrsnZrTLBpIdJZiAICPkWXYWeJzwabRyk2WtbH0yfdxmGFy0046Eu9UuK"
);

export default function ProductDetails({ product }) {
  const { id } = useParams();

  const [refresh, setRefresh] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const [isOpenModal, openedModal, closeModal] = useModal(false);

  const { productDetails } = useSelector((state) => state.ProductDetails);

  const [selectedImg, setSelectedImg] = useState(
    productDetails.productImages[0]
  );

  console.log("dea", productDetails);
  console.log("images", selectedImg);
  const [userId, setUserId] = useState(
    JSON.parse(localStorage?.getItem("profile"))?.data.id
  );

  function handlerAddToCart(e) {
    e.preventDefault();
    dispatch(addToCart({ userId, productId: product.id, quantity: 1 }));
    Swal.fire({
      title: "Product added",
      text: "Now you can see it in your cart",
      icon: "success",
      timer: 1000,
    });
    dispatch(getShoppingCart(userId));
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [value, setValue] = useState(0);
  console.log(value);

  useEffect(() => {
    dispatch(getProductDetails(id));
    return () => {
      dispatch(clearProductDetails());
    };
  }, [id]);

  const onSubmit = async (data) => {
    console.log("Onsubmit", data);
    try {
      if (value === 0) {
        Swal.fire({
          title: "REVIEW NOT SUBMITTED",
          text: "You have to choose one or more stars to submit your review",
          icon: "error",
          timer: 3000,
        });
      } else {
        const review = await axios.post("/products/review", {
          userId: user.data.id,
          productName: productDetails.name,
          review: data.comments,
          score: value,
          author: user.data.name,
        });
        console.log("axios review", review);
        Swal.fire({
          title: "REVIEW SUBMITTED",
          text: "Thanks for giving your opinion!",
          icon: "success",
          timer: 3000,
        });
        setRefresh(!refresh);
        dispatch(clearProductDetails());
        dispatch(getProductDetails(id));
        dispatch(getAllProducts());
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "REVIEW NOT SUBMITTED",
        text: error.response.data.err,
        icon: "error",
        timer: 3000,
      });
      Swal.fire({
        title: "REVIEW NOT SUBMITTED",
        text: error.response.data.err,
        icon: "error",
        timer: 3000,
      });
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <Grid
        height="auto"
        width="auto"
        container
        sx={{
          display: "flex",
          my: 0,
          mx: 1.5,
        }}
        key={product?.id}
      >
        <Grid
          item
          xs={1}
          sx={{
            border: "5px groove #567900",
            borderRadius: "10px",
            bgcolor: "#ffff9b6e",
            backdropFilter: "blur(4px)",
            my: 4,
            mx: 2,
          }}
        >
          {/* <Box sx={{display: "flex", flexDirection: "column"}}>
            {productDetails.productImages?.map((img, i) => (
              <img 
                  style={{border: selectedImg === img ? "4px solid purple": ""}}
                  key={i} 
                  src={img.image} 
                  alt="dog"
                  onClick={() => setSelectedImg(img)}
                  />
              ))
            }
            {productDetails.productImages?.map(i => (
              <img src={i.image} alt="tu vieja" />
            ))}
          </Box> */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              py: 1.3,
            }}
          >
            {productDetails.productImages?.map((img, i) => (
              <CardMedia
                component="img"
                style={{
                  border: selectedImg === img ? "3px solid #953757" : "",
                }}
                key={i}
                image={img.image}
                alt="dog"
                onClick={() => setSelectedImg(img)}
                sx={{
                  borderRadius: "15px",
                  my: 1.5,
                }}
                height="80px"
                width="auto"
              />
            ))}
          </Box>
        </Grid>
        <Grid
          item
          xs={5}
          sx={{
            // border: "5px groove #567900",
            borderRadius: "10px",
            bgcolor: "#ffff9b6e",
            backdropFilter: "blur(4px)",
            my: 4,
            mx: 2,
            p: 4,
          }}
        >
          <CardMedia
            component="img"
            height="500px"
            width="500px"
            image={selectedImg.image}
            alt={product?.name}
            sx={{
              borderRadius: "20px",
              border: "5px groove #567900",
            }}
          />
        </Grid>
        <Grid
          item
          xs={5}
          sx={{
            border: "5px groove #567900",
            borderRadius: "10px",
            my: 4,
            mx: 2,
            backdropFilter: "blur(4px)",
            bgcolor: "#ffff9b6e",
          }}
        >
          <Box
            display="flex"
            sx={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h3"
              component="div"
              fontFamily="Segoe Print"
              fontWeight={700}
              sx={{
                color: "#567900",
                textShadow: "1px 1px 5px rgb(0, 0, 0)",
                m: 2.5,
              }}
            >
              {`${product?.name}`}
            </Typography>
            <Typography
              variant="h3"
              component="div"
              fontFamily="Segoe Print"
              fontWeight={500}
              sx={{ color: "black", m: 1.5 }}
            >
              {`$${product?.price}`}
            </Typography>
            <Typography
              variant="h4"
              component="div"
              fontFamily="Segoe Print"
              fontWeight={500}
              sx={{ color: "black", m: 1.5 }}
            >
              {`Stock: ${product?.stock}`}
            </Typography>
            <Typography
              variant="h4"
              component="div"
              fontFamily="Segoe Print"
              fontWeight={500}
              sx={{ color: "black", m: 1.5 }}
            >
              Description
            </Typography>
            <Box
              width={400}
              height={120}
              sx={{
                border: "3px groove #c8ad39",
                borderRadius: "10px",
                m: 1,
                px: 1.5,
                py: 1,
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Typography variant="h6" component="div">
                {`${product?.description}`}
              </Typography>
            </Box>
            {!user ? (
              <Box sx={{ display: "flex" }}>
                <ButtonBase
                  sx={{
                    my: 2,
                    mx: 4,
                    width: "160px",
                    height: "50px",
                    border: "3px groove #c8ad39",
                    borderRadius: "15px",
                    color: "white",
                    display: "flex",
                    fontSize: 20,
                    bgcolor: "black",
                    fontWeight: 600,
                  }}
                  size="large"
                  variant="outlined"
                  onClick={() => {
                    Swal.fire({
                      title: "YOU HAVE TO BE LOGGED TO BUY A PRODUCT!",
                      icon: "warning",
                      showDenyButton: true,
                      denyButtonText: "Cancel",
                      confirmButtonText: "Sign in",
                      confirmButtonColor: "green",
                    }).then((res) => {
                      if (res.isConfirmed) {
                        navigate("/signUp");
                      }
                    });
                  }}
                >
                  Buy
                </ButtonBase>
                <ButtonBase
                  sx={{
                    my: 2,
                    mx: 4,
                    width: "160px",
                    height: "50px",
                    border: "3px groove #c8ad39",
                    borderRadius: "15px",
                    color: "white",
                    display: "flex",
                    fontSize: 20,
                    bgcolor: "black",
                    fontWeight: 600,
                  }}
                  size="large"
                  variant="outlined"
                  onClick={() => {
                    Swal.fire({
                      title: "YOU HAVE TO BE LOGGED TO USE THE CART!",
                      icon: "warning",
                      showDenyButton: true,
                      denyButtonText: "Cancel",
                      confirmButtonText: "Sign in",
                      confirmButtonColor: "green",
                    }).then((res) => {
                      if (res.isConfirmed) {
                        navigate("/signUp");
                      }
                    });
                  }}
                >
                  Add To Cart
                </ButtonBase>
              </Box>
            ) : (
              <Box sx={{ display: "flex" }}>
                <ButtonBase
                  sx={{
                    my: 2,
                    mx: 4,
                    width: "160px",
                    height: "50px",
                    border: "3px groove #c8ad39",
                    borderRadius: "15px",
                    color: "white",
                    display: "flex",
                    fontSize: 20,
                    bgcolor: "black",
                    fontWeight: 600,
                  }}
                  size="large"
                  variant="outlined"
                  onClick={openedModal}
                >
                  Buy
                </ButtonBase>
                <ButtonBase
                  sx={{
                    my: 2,
                    mx: 4,
                    width: "160px",
                    height: "50px",
                    border: "3px groove #c8ad39",
                    borderRadius: "15px",
                    color: "white",
                    display: "flex",
                    fontSize: 20,
                    bgcolor: "black",
                    fontWeight: 600,
                  }}
                  size="large"
                  variant="outlined"
                  onClick={(e) => handlerAddToCart(e)}
                >
                  Add To Cart
                </ButtonBase>
                <Modals isOpenModal={isOpenModal} closeModal={closeModal}>
                  <h2 className="modalTitle">
                    MAKE YOUR PURCHASE WITH YOUR CREDIT CARD!
                  </h2>
                  <div>
                    <img
                      src={product?.image}
                      alt=""
                      width="200px"
                      height="200px"
                    />
                  </div>
                  <div>
                    <CheckoutForm product={product} />
                  </div>
                  <div>
                    <button className="modalClose" onClick={closeModal}>
                      CLOSE
                    </button>
                  </div>
                </Modals>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              display: "flex",
              mt: 2.5,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
            // overflow="auto"
          >
            <h2>{user?.data?.name}</h2>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            {/* <Rating
    name="hover-feedback"
    value={value}
    precision={0.5}
    getLabelText={getLabelText}
    onChange={(event, newValue) => {
      setValue(newValue);
    }}
    onChangeActive={(event, newHover) => {
      setHover(newHover);
    }}
    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
  />
  {value !== null && (
    <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
  )} */}
            <TextField
              error={errors.comments ? true : false}
              label="Comments"
              multiline
              rows={4}
              placeholder="Type your comments here"
              variant="outlined"
              fullWidth
              {...register("comments", {
                required: true,
                minLength: 8,
                maxLength: 120,
              })}
              aria-invalid={errors.comments ? "true" : "false"}
            />
            {errors?.comments?.type === "required" && (
              <span style={{ color: "red" }}>This field is required</span>
            )}
            {errors?.comments?.type === "minLength" && (
              <span style={{ color: "red" }}>
                Description must be more than 7 characters
              </span>
            )}
            {errors?.comments?.type === "maxLength" && (
              <span style={{ color: "red" }}>
                Description cannot exceed 130 characters
              </span>
            )}
          </Stack>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Send Comment
          </Button>
        </form>
      </Container>
      <Container>
        {productDetails.revs.map((reviews) => (
          <>
            {/* <h1>{reviews.author}</h1>
            <h1>{reviews.score}</h1>
            <h1>{reviews.review}</h1> */}

            <Stack
              direction="row"
              spacing={2}
              sx={{
                display: "flex",
                mt: 2.5,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
              // overflow="auto"
            >
              <h2>{reviews.author}</h2>
              <Rating name="simple-controlled" value={reviews.score} readOnly />
              <Box
                height={120}
                sx={{
                  m: 1,
                  px: 1.5,
                  py: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" component="div">
                  {reviews.review}
                </Typography>
              </Box>
            </Stack>
          </>
        ))}
      </Container>
    </Elements>
  );
}
