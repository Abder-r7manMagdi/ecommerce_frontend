import { Box, Container, Grid, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#f0f00",
        py: 4,
      }}
    >
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              Explore our latest collection of stylish and trendy clothing and accessories. Elevate your wardrobe with our curated selection of high-quality pieces that blend fashion and comfort seamlessly. Whether you're looking for casual essentials or statement pieces, we have something for every style and occasion. Shop now and stay ahead of the fashion curve!
            </Typography>

          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Customer Service
            </Typography>
            <Typography variant="body2">
              Contact Us
              <br />
              FAQ
              <br />
              Return Policy
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Categories
            </Typography>
            <Typography variant="body2">
              Men's Clothing
              <br />
              Women's Clothing
              <br />
              Accessories
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Connect With Us
            </Typography>
            <Typography variant="body2">
              Email: info@example.com
              <br />
              Phone: +1234567890
              <br />
              Follow us on social media
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
