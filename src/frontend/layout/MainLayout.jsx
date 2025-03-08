import { Outlet } from "react-router-dom";
import NavbarComponent from "../components/navbar/Navbar";
import WhatsAppComponent from "../components/whatsApp/WhatsAppProbesPass";
import ChatBotComponent from "../components/chatbot/Chatbot";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <ChatBotComponent className="chatbot-container" />

      <NavbarComponent />

      <WhatsAppComponent />
      <Outlet />
    </div>
  );
};

export default MainLayout;
