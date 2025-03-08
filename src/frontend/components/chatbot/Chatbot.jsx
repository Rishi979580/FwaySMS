import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import ChatBot from "react-simple-chatbot";
import "./ChatbotCSS.css";

const ChatBotComponent = () => {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const initialSteps = [
      {
        id: "0",
        message: "👋 Hi, I'm FutureWay Assistant! How can I assist you today?",
        trigger: "main_menu",
      },
      {
        id: "main_menu",
        options: [
          { value: "services", label: "Our Services", trigger: "services" },
          { value: "contact", label: "Contact Us", trigger: "contact" },
          {
            value: "speak_agent",
            label: "Speak to a Representative",
            trigger: "speak_agent",
          },
          {
            value: "leave_conversation",
            label: "End Chat",
            trigger: "leave_conversation",
          },
        ],
      },
      {
        id: "services",
        message: "Please select the service you need assistance with.",
        trigger: "services_menu",
      },
      {
        id: "services_menu",
        options: [
          {
            value: "website_development",
            label: "Website Development",
            trigger: "service_enquiry",
          },
          {
            value: "pathology_crm",
            label: "Pathology CRM",
            trigger: "service_enquiry",
          },
          {
            value: "school_crm",
            label: "School Management CRM",
            trigger: "service_enquiry",
          },
          {
            value: "whatsapp_sms_email_marketing",
            label: "WhatsApp/SMS/Email Marketing",
            trigger: "service_enquiry",
          },
          {
            value: "digital_marketing_social_media_post",
            label: "Digital Marketing - Social Media Post",
            trigger: "service_enquiry",
          },
          {
            value: "digital_marketing_short_video",
            label: "Digital Marketing - Short Video",
            trigger: "service_enquiry",
          },
          {
            value: "facebook_youtube_ads",
            label: "Facebook/YouTube Ads",
            trigger: "service_enquiry",
          },
          { value: "main_menu", label: "Main Menu", trigger: "main_menu" },
        ],
      },
      {
        id: "service_enquiry",
        message:
          "For more details about this service, please visit the link below or contact us at futureway.in@gmail.com or call: +91 9795298080",
        trigger: "service_enquiry_message",
      },
      {
        id: "service_enquiry_message",
        component: (
          <div>
            <a href="/enquiry">Click here to submit an Enquiry Form</a>
          </div>
        ),
        trigger: "main_menu",
      },
      {
        id: "contact",
        message:
          "Contact Information:\n📧 Email: futureway.in@gmail.com\n📞 Phone: +91 9795298080\n📍 Address: Kaptanganj, UP, India (274301)",
        trigger: "main_menu",
      },
      {
        id: "speak_agent",
        message: "Connecting you to a representative. Please wait...",
        trigger: "agent_chat",
      },
      {
        id: "agent_chat",
        component: <div>Live Chat with a Representative (if available)</div>,
        trigger: "main_menu",
      },
      {
        id: "leave_conversation",
        message: "Thank you for chatting with us! Have a great day! 😊",
        end: true,
      },
    ];

    setSteps(initialSteps); // Set initial steps when component mounts

    // Use timeout to show options after a delay
    const timeoutId = setTimeout(() => {
      setSteps((prevSteps) => [...prevSteps, { id: "main_menu" }]);
    }, 3000); // 3 seconds delay before showing options

    return () => clearTimeout(timeoutId); // Cleanup timeout on unmount
  }, []);

  // Function to reset steps when chatbot is opened
  const resetChat = () => {
    const initialMessage = [
      {
        id: "0",
        message: "👋 Hi, I'm FutureWay Assistant! How can I assist you today?",
        trigger: "main_menu",
      },
    ];

    setSteps(initialMessage); // Set to only initial message

    // Optionally, you can set a timeout to show the next message after a delay
    const timeoutId = setTimeout(() => {
      setSteps((prevSteps) => [
        ...prevSteps,
        {
          id: "main_menu",
          options: [
            { value: "services", label: "Our Services", trigger: "services" },
            { value: "contact", label: "Contact Us", trigger: "contact" },
            {
              value: "speak_agent",
              label: "Speak to a Representative",
              trigger: "speak_agent",
            },
            {
              value: "leave_conversation",
              label: "End Chat",
              trigger: "leave_conversation",
            },
          ],
        },
      ]);
    }, 3000); // 3 seconds delay for showing the options

    return () => clearTimeout(timeoutId);
  };

  const theme = {
    background: "#f5f8fb",
    fontFamily: "Helvetica Neue",
    headerFontColor: "#fff",
    headerFontSize: "15px",
    botBubbleColor: "#2196f3",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#4a4a4a",
  };

  const config = {
    botAvatar: "img/user-avatar-bot.svg",
    floating: true,
    floatingStyle: {
      right: "10px",
      bottom: "50px",
      zIndex: "999",
    },
    // speechSynthesis: {
    //   enable: false,
    //   lang: "hi-IN",
    // },
  };

  const ChatBotHeader = () => (
    <div className="online-status">
      <div className="avatar">
        <img src="img/user-avatar-bot.svg" alt="User Avatar" />
        <div className="status"></div>
      </div>
      <div className="username">Chat with us</div>
    </div>
  );

  const FloatingIcon = () => (
    <div style={{ position: "relative" }}>
      <img
        src="img/user-avatar-bot.svg"
        alt="Chat Icon"
        style={{ width: "50px", height: "50px" }}
      />
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      {steps.length > 0 && (
        <ChatBot
          headerTitle={<ChatBotHeader />}
          steps={steps}
          {...config}
          floatingIcon={<FloatingIcon />}
          className="chat-with-us"
          notificationSound="notification.mp3"
          onRequestClose={resetChat} // Reset steps when closed
        />
      )}
    </ThemeProvider>
  );
};

export default ChatBotComponent;
