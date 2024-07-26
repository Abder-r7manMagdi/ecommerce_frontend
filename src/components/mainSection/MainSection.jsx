
// src\components\mainSection\MainSection.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Dialog,
  Typography,
  useTheme,
  Grid,
  DialogContent,
  DialogTitle,
  DialogActions,
  Rating,
  Tab,
  Tabs,
  Badge,
  Paper,
} from "@mui/material";
import Draggable from "react-draggable";
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/cartSlice';
import data from "../../data/allProducts.json";

// Define a Paper component for the draggable dialog
function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const Hello = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [clickedProduct, setClickedProduct] = useState(null);
  const [value, setValue] = useState(0); // State for controlling active tab
  const dispatch = useDispatch();
  // @ts-ignore
  const cartItems = useSelector((state) => state.cart.items);
  // @ts-ignore
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  // @ts-ignore
  const totalPrice = useSelector((state) => state.cart.totalPrice);

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

  // Group products by topLevelCategory
  const groupedProducts = {};
  data.forEach((product) => {
    if (!groupedProducts[product.topLevelCategory]) {
      groupedProducts[product.topLevelCategory] = [];
    }
    groupedProducts[product.topLevelCategory].push(product);
  });

  // @ts-ignore
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      {/* Tabs for each topLevelCategory */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", marginBottom: theme.spacing(3) }}>
        <Tabs value={value} onChange={handleChange} aria-label="product categories tabs">
          {Object.keys(groupedProducts).map((category, index) => (
            <Tab key={index} label={category} />
          ))}
        </Tabs>
      </Box>

      {/* Render products based on selected topLevelCategory */}
      {Object.entries(groupedProducts).map(([category, products], index) => (
        <Box key={index} role="tabpanel" hidden={value !== index}>
          {value === index && (
            <div>
              <Typography variant="h5">{category}</Typography>
              <Typography fontWeight={300} variant="body1">
                All our new arrivals in {category} category
              </Typography>

              <Grid container spacing={2}>
                {products.map((item) => (
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
            </div>
          )}
        </Box>
      ))}

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

export default Hello;
