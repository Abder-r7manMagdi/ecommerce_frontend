import React from "react";
import {
    Avatar,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Box,
    Container,
    Typography,
    Button
} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

const UserDrawer = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleAccountSettings = () => {
        navigate('/homepage/userprofile');
    };

    const handleOrderHistory = () => {
        // Implement order history logic here
        console.log("Navigate to order history");
    };

    const handleCart = () => {
        navigate('/homepage/cart');
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar src={user.profileImage} alt={user.firstName} sx={{ m: 1, bgcolor: 'secondary.main' }} />
                    <Typography component="h1" variant="h5">
                        {user.firstName + " " + user.lastName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {user.email}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {user.mobile}
                    </Typography>

                    <List>

                        <ListItem>
                            <ListItemIcon>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleAccountSettings}
                                    sx={{ width: '300' }}
                                >
                                    Edit Account Settings
                                </Button>
                            </ListItemIcon>
                            <ListItemText />
                        </ListItem>

                        <ListItem >
                            <ListItemIcon>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleCart}
                                    sx={{ width: '300' }}
                                >
                                    Go to Cart
                                </Button>
                            </ListItemIcon>
                            <ListItemText />
                        </ListItem>

                        <ListItem>
                            <ListItemIcon>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={handleLogout}
                                >
                                    <LogoutIcon />
                                    <Typography> Log out</Typography>
                                </Button>
                            </ListItemIcon>
                            <ListItemText />
                        </ListItem>
                    </List>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default UserDrawer;
