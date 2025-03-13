import styled from "styled-components";

export const ChatWrapper = styled.div`
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
