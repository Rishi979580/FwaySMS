import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import ChatBot from "react-simple-chatbot";
import styled from "styled-components";
import "./ChatbotCSS.css";
import "./notification";
import websiteData  from "../../../assets/data";



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
    right: 10px;
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

const ChatBotComponent = () => {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    if (websiteData.ChatBoat) {
      const chatbotSteps = websiteData.ChatBoat.map((step) => {
        if (step.Type === "message") {
          return {
            id: step.ID.toString(),
            message: `${step.Icon} ${step.MessageLabelComponent}`,
            trigger: step.TriggerNext_Step,
          };
        } else if (step.Type === "options") {
          return {
            id: step.ID.toString(),
            options: step.MessageLabelComponent.split(", ").map((label, index) => ({
              value: step.TriggerNext_Step.split(", ")[index],
              label,
              trigger: step.TriggerNext_Step.split(", ")[index],
            })),
          };
        } else if (step.Type === "component") {
          return {
            id: step.ID.toString(),
            component: (
              <div className="chat-option">
                <a href={step.URL_if_applicable} target="_blank" rel="noopener noreferrer" className="text-dark">
                  {step.Icon} {step.MessageLabelComponent}
                </a>
              </div>
            ),
            trigger: step.TriggerNext_Step,
          };
        }
        return null;
      });

      chatbotSteps.push({ id: "end", message: "Chat ended.", end: true }); // Ensure 'end' step exists
      setSteps(chatbotSteps);
    }
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
      right: "10px",
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
        Hi! I am Fway AI Agent, I will be assisting you Today. Let's Talk!
      </div>
    </ThemeProvider>
  );
};

export default ChatBotComponent;


