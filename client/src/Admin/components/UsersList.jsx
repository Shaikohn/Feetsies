import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import UserTable from "./UserTable";



const mdTheme = createTheme();

export default function UsersList() {
  let notifications = useSelector((state) => state.petitions.notifications);

  React.useEffect(() => {}, [notifications]);
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center"}}>
        <CssBaseline />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <UserTable />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      
    </ThemeProvider>
  );
}
