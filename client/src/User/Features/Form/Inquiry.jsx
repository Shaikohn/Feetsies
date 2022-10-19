import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./CreateProduct.module.css";
import { useDispatch } from "react-redux";
import ResponsiveAppBar from "../../Features/Header/HeaderMUI.jsx";
import { Grid, Card, CardContent, Typography, TextField, Button} from "@mui/material";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

const Inquiry = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [userId, setUserId] = useState(JSON.parse(localStorage?.getItem("profile"))?.data?.id);

    const { register, formState: { errors }, handleSubmit } = useForm({ 
        defaultValues: { topic: "", description: ""}
    });

    useEffect(() => {
        if (!userId) {
            Swal.fire({
                title: "YOU HAVE TO BE LOGGED TO SEND A INQUIRY!",
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
        }
    }, [userId])

    const onSubmit =  async (data) => {
        console.log("Onsubmit", data);
        try {
            if (!userId) {
                Swal.fire({
                    title: "YOU HAVE TO BE LOGGED TO SEND A INQUIRY!",
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
            } else {
                await axios.post("/admin/inquiry", {
                    userId: userId,
                    topic: data.topic,
                    description: data.description
                })
                Swal.fire({
                    title: "INQUIRY SENT",
                    text: "An administrator will read it as soon as possible!",
                    icon: "success",
                    timer: 3000,
                });
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: "INQUIRY NOT SENT",
                text: "Sorry, something failed and the inquiry couldnt be send",
                icon: "error",
                timer: 3000,
            });
        }
    }
    
    return (
        <div>
            <ResponsiveAppBar />
            <div className={styles.createForm}>
                <Grid>
                    <Card sx={{maxWidth: 450, padding: "20px 5px", margin: "0 auto"}}>
                        <CardContent>
                            <Typography gutterBottom variant="h5">
                                What is your inquiry?
                            </Typography>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Grid container spacing={1}>
                                    <Grid xs={12} item>
                                        <TextField
                                            error={errors.topic ? true : false}
                                            label="Topic"
                                            variant="outlined"
                                            fullWidth
                                            {...register("topic", {required: true})}
                                            aria-invalid={errors.topic ? "true" : "false"}
                                        />
                                        {errors?.topic?.type === "required" && (
                                            <span style={{ color: "red" }}>
                                                A short reason is required
                                            </span>
                                        )}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            error={errors.description ? true : false}
                                            label="Description"
                                            variant="outlined"
                                            multiline
                                            rows={10}
                                            fullWidth
                                            {...register("description", { required: true})}
                                            aria-invalid={errors.description ? "true" : "false"}
                                        />
                                        {errors?.description?.type === "required" && (
                                            <span style={{ color: "red" }}>
                                            You have to write a description!
                                            </span>
                                        )}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                        >
                                            Send
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </div>
        </div>
    );
};

export default Inquiry;
