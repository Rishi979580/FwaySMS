// src/components/Logout.jsx
// import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../../../firebaseConfig/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        alert("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
        console.error("Error occurred: ", error);
      });
  };

  return (
    <li className="sidebar-list-item text-white" onClick={handleLogout}>
      <BiLogOut className="icon" />
      Logout
    </li>
  );
};

export default Logout;
