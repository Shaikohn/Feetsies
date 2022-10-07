import * as React from 'react';
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import { Box } from '@mui/system';
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";


export default function CartItem(name, price, quantity, cartItemid) {

    return (
        <Container>
            <Card sx={{ maxWidth: 345 }}>
                <Box bgcolor="text.disabled">
                    <CardContent>
                        <Typography 
                            gutterBottom
                            component="h5"
                            sx={{
                                fontSize: 14,
                                listStyle: "none",
                                textDecoration: "none",
                            }}
                        >
                            {name}
                        </Typography>
                        <Typography
                            component={"span"}
                            variant="body2"
                            color="text.secondary"
                        >
                            {`$ ${price}`}
                        </Typography>
                        <Typography
                            component={"span"}
                            variant="body2"
                            color="text.secondary"
                        >
                            {`Unit x ${quantity}`}
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
        </Container>
    )
}