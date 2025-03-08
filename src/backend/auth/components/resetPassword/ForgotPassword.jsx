import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
// import { auth } from "../../../firebaseConfig/firebaseConfig";
import { auth } from "../../../../firebaseConfig/firebaseConfig";


import { NavLink } from "react-router-dom";
import "./ForgotPasswordCSS.css"; // Assuming you want to add some CSS styling

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleForgotPassword = (e) => {
    e.preventDefault();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage("Reset link sent to your email address.");
        setError(null);
      })
      .catch((error) => {
        setMessage(null);
        setError("Invalid email or account. Please try again.");
      });
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Forgot Password</h2>
        <p>Enter your email to reset your password.</p>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleForgotPassword}>
          <div className="input-group">
            <label htmlFor="email-address">Email Address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="reset-button" type="submit">
            Send Reset Link
          </button>
        </form>
        <p className="login-link">
          Remembered your password? <NavLink to="/login">Login</NavLink>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
