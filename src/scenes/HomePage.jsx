// src\scenes\HomePage.jsx
import { Container } from "@mui/material";
import Header1 from "../components/header/Header1";
import Header2 from "../components/header/Header2";
import Header3 from "../components/header/Header3";
import Hero from "../components/hero/Hero";
import Main from "../components/mainSection/MainSection";
import Footer from "../components/footer/Footer";
import Chatbot from "../components/chatbot/Chatbot";

const HomePage = () => {
    return (
        <Container>
            <Header1 />
            <Header2 />
            <Hero />
            <Main />
            <Chatbot />
            <Footer />
        </Container>
    );
}

export default HomePage;
