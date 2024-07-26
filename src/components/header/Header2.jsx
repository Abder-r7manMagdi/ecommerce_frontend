// src/components/header/Header2.jsx
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Button,
} from "@mui/material";
import {
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
  ShoppingCartCheckout as ShoppingCartCheckoutIcon,
  Person2Outlined as Person2OutlinedIcon,
  ImageSearch as ImageSearchIcon,
} from "@mui/icons-material";
import Badge from '@mui/material/Badge';
import { Container, Stack } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import SearchField from "./SearchField";
import Cart from "./Cart";
import SignInForm from "./SignInForm";
import ImageSearchDrawer from './ImageSearchDrawer';
// @ts-ignore
import UserDrawer from './UserDrawer'; // Import or define UserDrawer component

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
function handleImageSearchClick() {
  window.location.href = 'http://192.168.1.8:8501';
}

const Header2 = () => {
  // @ts-ignore
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  // @ts-ignore
  const user = useSelector((state) => state.auth.user); // Assuming user info is stored in auth state
  // @ts-ignore
  const isAdmin = useSelector((state) => state.auth.isAdmin); // Fetch isAdmin from auth state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPersonOpen, setIsPersonOpen] = useState(false);
  const [isImageSearchOpen, setIsImageSearchOpen] = useState(false);

  const toggleCartDrawer = () => {
    setIsCartOpen(!isCartOpen);
  };

  const togglePersonDrawer = () => {
    setIsPersonOpen(!isPersonOpen);
  };

  const toggleImageSearchDrawer = () => {
    setIsImageSearchOpen(!isImageSearchOpen);
  };

  return (
    <Container
      sx={{
        display: "flex",
        my: 3,
        alignContent: "space-between",
      }}
    >
      <AppBar position="static" sx={{ borderRadius: "22px" }}>
        <Toolbar>
          <Stack direction="row" alignItems="center" spacing={2}>
            <ShoppingCartOutlinedIcon />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              E-commerce
            </Typography>
          </Stack>

          <Box flexGrow={0.9} />

          {!isAdmin && <SearchField />} {/* Render SearchField if user is not admin */}

          <Box flexGrow={0.9} />

          <Typography>
            {user ? `Hi, ${user.firstName}` : 'Welcome'}
          </Typography>

          <Box flexGrow={0.9} />

          <Box>
            <IconButton aria-label="cart" onClick={toggleCartDrawer}>
              <StyledBadge badgeContent={totalQuantity} color="secondary">
                <ShoppingCartCheckoutIcon />
              </StyledBadge>
            </IconButton>

            <IconButton aria-label="person" onClick={togglePersonDrawer}>
              <Person2OutlinedIcon />
            </IconButton>

            <IconButton aria-label="image-search" onClick={handleImageSearchClick}>
              <ImageSearchIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={isCartOpen} onClose={toggleCartDrawer}>
        <Cart />
      </Drawer>

      <Drawer anchor="right" open={isPersonOpen} onClose={togglePersonDrawer} sx={{ width: "80vw" }}>
        {user ? (
          <UserDrawer />
        ) : (
          <SignInForm />
        )}
      </Drawer>

      <Drawer anchor="right" open={isImageSearchOpen} onClose={toggleImageSearchDrawer} sx={{ width: "80vw" }}>
        <ImageSearchDrawer open={isImageSearchOpen} onClose={toggleImageSearchDrawer} />
      </Drawer>
    </Container>
  );
};

export default Header2;
