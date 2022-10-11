import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import AlertTitle from "@mui/material/AlertTitle";

const CheckEmails = () => {
  return (
    <Container maxWidth="sm">
      <Box
        // sx={{ bgcolor: "#cfe8fc", height: "100vh" }}
        sx={{
          bgcolor: "#cfe8fc",
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          //   padding: 10,
          height: "50vh",
        }}
      >
        <Avatar sx={{ padding: 3 }} src="/broken-image.jpg" />
        <Stack sx={{ width: "100%", marginTop: 5 }} spacing={2}>
          {/* <Alert severity="success">
            User was registered successfully! Please check your email.
          </Alert> */}
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            User was registered successfully! —{" "}
            <strong>Please check your email!</strong>
          </Alert>
        </Stack>
      </Box>
    </Container>
  );
};

export default CheckEmails;
