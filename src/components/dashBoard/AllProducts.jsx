// src/components/AllProducts.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button } from '@mui/material';
import { loadProducts, removeProduct, selectAllProducts, selectProductsStatus, selectProductsError } from '../../redux/productsSclice.js';

const AllProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  const handleRemoveProduct = (productId) => {
    dispatch(removeProduct(productId));
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        All Products
      </Typography>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Discounted Price</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Discount %</TableCell>
              <TableCell>Sizes</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Top Level Category</TableCell>
              <TableCell>Second Level Category</TableCell>
              <TableCell>Third Level Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell><img src={product.imageUrl} alt={product.title} width="50" /></TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.color}</TableCell>
                <TableCell>{product.discountedPrice}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.discountPercent}</TableCell>
                <TableCell>
                  {product.size.map(s => `${s.name} (${s.quantity})`).join(', ')}
                </TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.topLevelCategory}</TableCell>
                <TableCell>{product.secondLevelCategory}</TableCell>
                <TableCell>{product.thirdLevelCategory}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.rating}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => handleRemoveProduct(product.id)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AllProducts;
