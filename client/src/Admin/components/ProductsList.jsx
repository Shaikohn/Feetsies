import * as React from "react";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import ProductTable from "./ProductTable";
import { Button } from "@mui/material";


const mdTheme = createTheme();

export default function ProductsList() {
  let notifications = useSelector((state) => state.petitions.notifications);

 


  React.useEffect(() => {}, [notifications]);
  return (
    <ThemeProvider theme={mdTheme}>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Link to='/home/createProduct'>
              <Button variant='contained' color='success' sx={{display: 'flex', margin: 'auto', float: 'right'}}>Add a product</Button>
            </Link>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <ProductTable />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        
    </ThemeProvider>
  );
}
