// src/components/AddProduct.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, TextField, Typography } from '@mui/material';
import { addProduct } from '../../redux/productsSclice.js';

const AddProduct = () => {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({
    id: '',
    imageUrl: '',
    brand: '',
    title: '',
    color: '',
    discountedPrice: '',
    price: '',
    discountPercent: '',
    size: [{ name: '', quantity: '' }],
    quantity: '',
    topLevelCategory: '',
    secondLevelCategory: '',
    thirdLevelCategory: '',
    description: '',
    rating: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addProduct(product));
    console.log('Product added:', product);

    // Reset the form fields
    setProduct({
      id: '',
      imageUrl: '',
      brand: '',
      title: '',
      color: '',
      discountedPrice: '',
      price: '',
      discountPercent: '',
      size: [{ name: '', quantity: '' }],
      quantity: '',
      topLevelCategory: '',
      secondLevelCategory: '',
      thirdLevelCategory: '',
      description: '',
      rating: ''
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add a New Product
      </Typography>
      <TextField label="ID" fullWidth variant="outlined" margin="normal" name="id" value={product.id} onChange={handleChange} />
      <TextField label="Image URL" fullWidth variant="outlined" margin="normal" name="imageUrl" value={product.imageUrl} onChange={handleChange} />
      <TextField label="Brand" fullWidth variant="outlined" margin="normal" name="brand" value={product.brand} onChange={handleChange} />
      <TextField label="Title" fullWidth variant="outlined" margin="normal" name="title" value={product.title} onChange={handleChange} />
      <TextField label="Color" fullWidth variant="outlined" margin="normal" name="color" value={product.color} onChange={handleChange} />
      <TextField label="Discounted Price" fullWidth variant="outlined" margin="normal" name="discountedPrice" value={product.discountedPrice} onChange={handleChange} />
      <TextField label="Price" fullWidth variant="outlined" margin="normal" name="price" value={product.price} onChange={handleChange} />
      <TextField label="Discount Percent" fullWidth variant="outlined" margin="normal" name="discountPercent" value={product.discountPercent} onChange={handleChange} />
      <TextField label="Sizes (Format: S-20,M-25,L-30)" fullWidth variant="outlined" margin="normal" name="size" value={product.size.map(s => `${s.name}-${s.quantity}`).join(',')} onChange={(e) => setProduct({ ...product, size: e.target.value.split(',').map(s => ({ name: s.split('-')[0], quantity: s.split('-')[1] })) })} />
      <TextField label="Quantity" fullWidth variant="outlined" margin="normal" name="quantity" value={product.quantity} onChange={handleChange} />
      <TextField label="Top Level Category" fullWidth variant="outlined" margin="normal" name="topLevelCategory" value={product.topLevelCategory} onChange={handleChange} />
      <TextField label="Second Level Category" fullWidth variant="outlined" margin="normal" name="secondLevelCategory" value={product.secondLevelCategory} onChange={handleChange} />
      <TextField label="Third Level Category" fullWidth variant="outlined" margin="normal" name="thirdLevelCategory" value={product.thirdLevelCategory} onChange={handleChange} />
      <TextField label="Description" fullWidth variant="outlined" margin="normal" name="description" value={product.description} onChange={handleChange} />
      <TextField label="Rating" fullWidth variant="outlined" margin="normal" name="rating" value={product.rating} onChange={handleChange} />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Add Product
      </Button>
    </Box>
  );
};

export default AddProduct;
