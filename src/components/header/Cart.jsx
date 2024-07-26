// @ts-
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import cartData from '../../data/cartData.json';
import { Stack, Badge } from '@mui/material';
import { addItem, removeItem, clearCart, decreaseQuantity, increaseQuantity } from '../../redux/cartSlice';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const defaultTheme = createTheme();

const Cart = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const cartItems = useSelector((state) => state.cart.items);
    // @ts-ignore
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    // @ts-ignore
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const hasInitialized = useRef(false);
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        if (!hasInitialized.current && cartItems.length === 0) {
            cartData.forEach(item => {
                const parsedItem = {
                    ...item,
                    price: parseFloat(item.price),
                };
                dispatch(addItem(parsedItem));
            });
            hasInitialized.current = true;
        }
    }, [dispatch, cartItems]);

    const handleRemove = (id) => {
        dispatch(removeItem(id));
    };

    const handleDecreaseQuantity = (id) => {
        dispatch(decreaseQuantity(id));
    };

    const handleIncreaseQuantity = (id) => {
        dispatch(increaseQuantity(id));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleSubmit = (event) => {
            navigate('/homepage/purchase'); // Use navigate to go to '/signin' route
                
        console.log('Checkout button clicked');
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" >
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                <Avatar
                alt="Remy Sharp"
                src="data:image/jpeg;base64,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"
                sx={{ width: 56, height: 56 }}
              />
                    <Typography component="h1" variant="h5">
                        Shopping Cart
                    </Typography>
                    <Badge badgeContent={totalQuantity} color="secondary" sx={{ mt: 2 }}>
                        <ShoppingCartIcon />
                    </Badge>
                    <div style={{ marginTop: '20px' }}>
                        {cartItems.length === 0 ? (
                            <p>Your cart is empty.</p>
                        ) : (
                            <ul style={{ listStyleType: 'none', padding: 0 }}>
                                {cartItems.map((item) => (
                                    <li key={item.id} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                                        <Stack direction="row" alignItems="center" spacing={2}>
                                            <Avatar alt={item.title} src={item.imageUrl} />
                                            <Typography variant="body1" style={{ fontWeight: 'bold' }}>{item.title}</Typography>
                                            <Typography variant="body2">${item.price}</Typography>
                                            <Typography variant="body2">Quantity: {item.quantity}</Typography>
                                            <Button variant="contained" color="secondary" onClick={() => handleRemove(item.id)}>
                                                Remove
                                            </Button>
                                            <Button variant="outlined" color="primary" onClick={() => handleDecreaseQuantity(item.id)}>
                                                -
                                            </Button>
                                            <Button variant="outlined" color="primary" onClick={() => handleIncreaseQuantity(item.id)}>
                                                +
                                            </Button>
                                        </Stack>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <Typography variant="h6">Total Quantity: {totalQuantity}</Typography>
                        <Typography variant="h6">Total Price: ${typeof totalPrice === 'number' ? totalPrice.toFixed(2) : '0.00'}</Typography>
                    </div>
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Checkout
                    </Button>
                    <Button
                        type="button"
                        fullWidth
                        variant="outlined"
                        color="secondary"
                        onClick={handleClearCart}
                        sx={{ mt: 1, mb: 2 }}
                    >
                        Clear Cart
                    </Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Cart;
