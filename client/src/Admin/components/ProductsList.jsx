import * as React from "react";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import ProductTable from "./ProductTable";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


const mdTheme = createTheme();

export default function ProductsList() {

  const navigate = useNavigate();

  let notifications = useSelector((state) => state.petitions.notifications);

  React.useEffect(() => {}, [notifications]);

  function handleCreateProduct() {
    navigate(`/dashboard/createProduct`);
  }

  return (
    <ThemeProvider theme={mdTheme}>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Button variant='contained' color='success' onClick={handleCreateProduct}
                sx={{
                  display: 'flex', 
                  margin: 'auto', 
                  float: 'right'
                }}
              >
                Add a product
              </Button>
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
