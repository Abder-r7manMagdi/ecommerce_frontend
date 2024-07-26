import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setQuery, searchItems } from "../redux/searchSlice";
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Rating, Typography } from "@mui/material";
import { addItem } from "../redux/cartSlice"; // Adjusted import for addItem

// Draggable Paper component for Dialog
function PaperComponent(props) {
  return (
    <Paper {...props} />
  );
}

const SearchResults = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  // @ts-ignore
  const query = useSelector((state) => state.search.query);
  // @ts-ignore
  const category = useSelector((state) => state.search.category);
  // @ts-ignore
  const results = useSelector((state) => state.search.results);

  // State for managing dialog open/close and selected product
  const [open, setOpen] = useState(false);
  const [clickedProduct, setClickedProduct] = useState(null);

  // Effect to set query from URL params on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("query");
    dispatch(setQuery(searchQuery));
  }, [dispatch, location.search]);

  // Effect to perform search when query or category changes
  useEffect(() => {
    dispatch(searchItems());
  }, [dispatch, query, category]);

  // Function to handle adding a product to cart
  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    handleClose();
  };

  // Function to handle closing the dialog
  const handleClose = () => {
    setOpen(false);
    setClickedProduct(null);
  };

  return (
    <div>
      <h1 style={{ color: "#fff" }}>Search Results for: {query}</h1>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {results.map((result) => (
            <li key={result.id}>
              {/* Display basic product information */}
              <Typography>{result.title}</Typography>
              <Button onClick={() => {
                setClickedProduct(result);
                setOpen(true);
              }}>
                View Details
              </Button>
            </li>
          ))}
        </ul>
      )}

      {/* Dialog for displaying product details */}
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
                  Rating: {clickedProduct.rating}
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
    </div>
  );
};

export default SearchResults;
