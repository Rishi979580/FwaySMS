import React from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import SubscriptionPlans from "../components/SubscriptionPlans/SubscriptionPlans";
import MessageTypes from "../components/MessageTypes/MessageTypes";
import Features from "../components/Features/Features";
import Footer from "../components/Footer/Footer";
import ChatBotComponent from "../components/chatbot/Chatbot";
import Banner from "../components/banner/Banner";
import Banner2 from "../components/banner/Banner2";
import jsonData from "../../../public/data"; // Import your JSON file

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <Banner2 />
      <SubscriptionPlans />

      <MessageTypes />
      <Banner />

      <Features />
      <Footer />
      <ChatBotComponent />

    </>
  );
};

export default HomePage;
