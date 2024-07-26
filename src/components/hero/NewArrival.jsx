// src\components\hero\NewArrival.jsx
// src\scenes\NewArrival.jsx

import { Typography, Button, Grid, Card, CardActions, CardContent, CardMedia, Rating, Dialog, DialogTitle, DialogContent, Box, DialogActions, Paper, Container } from '@mui/material';
import { motion } from 'framer-motion';
import newArrivals from '../../data/newArrival.json';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/cartSlice';
import Draggable from 'react-draggable';

// Define a Paper component for the draggable dialog
function PaperComponent(props) {
    return (
      <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
}

const NewArrival = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [clickedProduct, setClickedProduct] = useState(null);

    const handleClickOpen = (product) => {
        setClickedProduct(product);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setClickedProduct(null);
    };

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
        handleClose();
    };

    return (
        <Container>
            <Grid container spacing={2}>
                {newArrivals.map((item) => (
                    <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Card>
                                <CardMedia component="img" height="333" image={item.imageUrl} alt="Product Image" />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {item.title}
                                    </Typography>
                                    <Typography variant="subtitle1" component="p">${item.price}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.description}
                                    </Typography>
                                    <Rating name="half-rating-read" defaultValue={item.rating} precision={0.1} readOnly />
                                </CardContent>
                                <CardActions>
                                    <Button onClick={() => handleClickOpen(item)} sx={{ textTransform: "capitalize" }} size="large">
                                        View details
                                    </Button>
                                </CardActions>
                            </Card>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>

            {/* Dialog for product details */}
            <Dialog open={open} onClose={handleClose} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title">
                <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
                    Product Details
                </DialogTitle>
                <DialogContent sx={{ height: 400, width: 600 }}>
                    {/* Render product details here */}
                    {clickedProduct && (
                        <Container sx={{ display: "flex", flexDirection: "row", gap: 5 }}>
                            <Box>
                                <img src={clickedProduct.imageUrl} height={333} width={333} alt="Product Details" />
                            </Box>
                            <Box>
                                <Typography variant="h6">{clickedProduct.title}</Typography>
                                <Typography>{clickedProduct.description}</Typography>
                                <Typography>
                                    {clickedProduct.rating}
                                    <Rating name="half-rating-read" defaultValue={clickedProduct.rating} precision={0.1} readOnly />
                                </Typography>
                            </Box>
                        </Container>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                    {clickedProduct && (
                        <Button onClick={() => handleAddToCart(clickedProduct)} color="primary">
                            Add to Cart
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default NewArrival;
