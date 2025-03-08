import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import ChatBot from "react-simple-chatbot";
import styled from "styled-components";
import "./ChatbotCSS.css";
import "./notification";

const ChatWrapper = styled.div`
  .chat-with-us {
    font-family: "Inter", sans-serif;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease-in-out;
  }
  .chat-header {
    background: #1f59ff;
    color: #fff;
    padding: 15px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    border-radius: 12px 12px 0 0;
  }
  .chat-option {
    padding: 12px;
    background: #f5f8fb;
    border-radius: 8px;
    display: inline-block;
    color: #1f59ff;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s ease-in-out;
    border: 2px solid #1f59ff;
    margin: 5px 0;
    text-align: center;
  }
  .chat-option:hover {
    background: #1f59ff;
    color: #fff;
  }
  a {
    color: #fff;
    font-weight: bold;
    text-decoration: none;
  }
  
  /* Floating Notification Styling */
  .floating-notification {
    position: fixed;
    bottom: 80px;
    right: 20px;
    background: #ff5722;
    color: white;
    padding: 10px 15px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: bold;
    display: none;
    transition: opacity 0.5s ease-in-out;
    cursor: pointer;
    z-index: 999;
  }
  
  .floating-notification.show {
    display: block;
    opacity: 1;
  }

  .floating-notification.hide {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }
`;

const chatbotData = {
  welcome: "👋 Hello! I'm FutureWay Assistant. How can I assist you today?",
  mainMenu: [
    { value: "services", label: "📌 Our Services", trigger: "services" },
    { value: "contact", label: "📞 Contact Us", trigger: "contact" },
    { value: "pricing", label: "💰 View Pricing", trigger: "pricing" },
    { value: "speak_agent", label: "💬 Speak to an Agent", trigger: "speak_agent" },
    { value: "exit", label: "❌ Exit Chat", trigger: "exit_chat" },
  ],
  services: [
    { value: "bulk_sms", label: "📩 Bulk SMS", trigger: "service_info" },
    { value: "whatsapp", label: "💬 WhatsApp Marketing", trigger: "service_info" },
    { value: "email", label: "📧 Email Marketing", trigger: "service_info" },
    { value: "pricing", label: "💰 Pricing Plans", trigger: "pricing" },
    { value: "main_menu", label: "🔙 Back to Main Menu", trigger: "main_menu" },
  ],
  pricingMessage: "📢 Choose a Plan That Fits Your Needs:\n\n🔹 Free Plan - Ideal for basic usage.\n\n🔹 Starter Pack - Individuals and small businesses.\n\n🔹 Growth Pack - Growing businesses and marketers.\n\n🔹 Business Pack - Best for enterprises with high-volume messaging needs.",
};

const ChatBotComponent = () => {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const chatbotSteps = [
      { id: "0", message: chatbotData.welcome, trigger: "main_menu" },
      { id: "main_menu", options: chatbotData.mainMenu },
      { id: "services", message: "Please select a service you're interested in.", trigger: "services_list" },
      { id: "services_list", options: chatbotData.services },
      { id: "service_info", message: "For more details, visit the link below:", trigger: "service_link" },
      {
        id: "service_link",
        component: (
          <div className="chat-option">
            <a href="/enquiry" target="_blank" rel="noopener noreferrer" className="text-dark">
              📌 Submit an Enquiry
            </a>
          </div>
        ),
        trigger: "main_menu",
      },
      { id: "pricing", message: chatbotData.pricingMessage, trigger: "pricing_link" },
      {
        id: "pricing_link",
        component: (
          <div className="chat-option">
            <a href="/pricing" target="_blank" rel="noopener noreferrer" className="text-dark">
              🔍 View Pricing Details
            </a>
          </div>
        ),
        trigger: "main_menu",
      },
      {
        id: "contact",
        message: "📧 Email: futureway.in@gmail.com\n📞 Phone: +91 9795298080\n📍 Location: Kaptanganj, UP, India",
        trigger: "main_menu",
      },
      { id: "speak_agent", message: "⏳ Connecting you to an agent...", trigger: "agent_chat" },
      { id: "agent_chat", component: <div>🔗 Live Chat Support (if available)</div>, trigger: "main_menu" },
      { id: "exit_chat", message: "Thank you for chatting! Have a great day! 😊", end: true },
    ];
    setSteps(chatbotSteps);
  }, []);

  // 🎯 Floating Notification Effect
  useEffect(() => {
    const notification = document.getElementById("floatingNotification");

    if (notification) {
      setTimeout(() => {
        notification.classList.add("show");
      }, 1000); // Show after 1 second

      setTimeout(() => {
        notification.classList.add("hide");
        setTimeout(() => notification.classList.remove("show"), 500); // Remove after fade-out
      }, 6000); // Hide after 6 seconds
    }
  }, []);

  const theme = {
    background: "#ffffff",
    fontFamily: "Arial",
    headerFontColor: "#fff",
    headerFontSize: "16px",
    botBubbleColor: "#1f59ff",
    botFontColor: "#fff",
    userBubbleColor: "#e1eaff",
    userFontColor: "#1f59ff",
  };

  const config = {
    botAvatar: "img/user-avatar-bot.svg",
    floating: true,
    floatingStyle: {
      background: "#1f59ff",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      borderRadius: "50%",
      padding: "10px",
      right: "20px",
      bottom: "60px",
      zIndex: "999",
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <ChatWrapper>
        {steps.length > 0 && <ChatBot headerTitle={<div className="chat-header">💬 Chat with us</div>} steps={steps} {...config} className="chat-with-us" />}
      </ChatWrapper>
      <div id="floatingNotification" className="floating-notification">
  Chat with Fway AI Agent.
</div>

    </ThemeProvider>
  );
};

export default ChatBotComponent;
