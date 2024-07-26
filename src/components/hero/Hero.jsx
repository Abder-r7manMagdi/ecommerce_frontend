import { Container, Link, Box, Typography, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './slider.css';
import { Pagination, Navigation } from 'swiper/modules';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useDispatch } from 'react-redux';
import { setButtonLabel } from '../../redux/HeroButtonSlice';

// @ts-ignore
import banner15 from "../../images/banner-15.jpg";
// @ts-ignore
import banner25 from "../../images/banner-25.jpg";
// @ts-ignore
import banner16 from "../../images/banner-16.jpg";
// @ts-ignore
import banner17 from "../../images/banner-17.jpg";

const Hero = () => {
  const dispatch = useDispatch();

  const items = [
    {
      image: banner15,
      title: "Welcome to Our E-Commerce Store",
      description: "Discover the best deals on our products.",
      buttonLabel: "Shop Now",
      buttonLink: "/bestdeals",
      textColor: "darkGray", // Set text color to darkGray
    },
    {
      image: banner25,
      title: "New Arrivals",
      description: "Check out our latest collection.",
      buttonLabel: "Explore Now",
      buttonLink: "/new-arrivals",
      textColor: "darkGray", // Set text color to darkGray
    },
  ];

  const handleButtonClick = (buttonLabel) => {
    dispatch(setButtonLabel(buttonLabel));
  };

  return (
    <Container sx={{ display: "flex", gap: 2 }}>
      <Swiper
        style={{
          // @ts-ignore
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        loop={true}
        lazy={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item.image} alt={item.title} loading="lazy" />
            <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
            <div className="text-overlay">
              <Typography variant="h2" sx={{ color: item.textColor }}>{item.title}</Typography>
              <Typography variant="body1" sx={{ color: item.textColor }}>{item.description}</Typography>
              <Link 
                href={item.buttonLink} 
                className="button" 
                sx={{ color: item.textColor }} 
                onClick={() => handleButtonClick(item.buttonLabel)}
              >
                {item.buttonLabel}
                <ArrowForwardIcon sx={{ fontSize: "13px" }} />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Box display={{ xs: "none", md: "block" }} minWidth="25%" alignItems="center">
        <Box sx={{ position: "relative", height: "48%" }}>
          <img src={banner17} alt="Banner" width="100%" height="100%" />
          <Stack sx={{ position: "absolute", top: "50%", transform: "translateY(-50%)", left: 20, color: "#283445" }}>
            <Typography variant="caption">NEW ARRIVALS</Typography>
            <Typography variant="h6">SUMMER</Typography>
            <Typography variant="h6" sx={{ color: "#2" }}>
              SALE 20% OFF
            </Typography>
            <Link 
              sx={{ color: "#2B3445", display: "flex", alignItems: "center", gap: "5px", transition: "0.2s", "&:hover": { color: "#D23F57" } }} 
              href="#" 
              underline="none"
              onClick={() => handleButtonClick('SALE 20% OFF')}
            >
              shop now
              <ArrowForwardIcon sx={{ fontSize: "13px" }} />
            </Link>
          </Stack>
        </Box>
        <Box sx={{ position: "relative", marginTop: "20px", height: "48%" }}>
          <img src={banner16} alt="Banner" width="100%" height="100%" />
          <Stack sx={{ position: "absolute", top: "40%", transform: "translateY(-50%)", left: 20, color: "#283445" }}>
            <Typography variant="caption">GAMING 4K</Typography>
            <Typography variant="h6">DESKTOPS&LAPTOPS</Typography>
            <Typography variant="h6" sx={{ color: "#2B0000" }}>
              SALE 20% OFF
            </Typography>
            <Link 
              sx={{ color: "#2B3445", display: "flex", alignItems: "center", gap: "5px", transition: "0.2s", "&:hover": { color: "#D23F57" } }} 
              href="#" 
              underline="none"
              onClick={() => handleButtonClick('Deals in PCs')}
            >
              Deals in PCs
              <ArrowForwardIcon sx={{ fontSize: "13px" }} />
            </Link>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default Hero;
