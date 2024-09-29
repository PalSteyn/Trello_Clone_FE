import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import styles from "./Login.module.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle form submission
  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in both email and password");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    console.log("Logging in with:", { email, password });
  };

  // Function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation
    return emailRegex.test(email);
  };

  // Google login success handler
  const handleGoogleLoginSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    const decoded = jwtDecode(token); // Decode the token to get user info
    console.log("Google User Data: ", decoded); // Here you can send the token to your backend for further authentication
  };

  // Google login failure handler
  const handleGoogleLoginFailure = (error) => {
    console.log("Google login failed: ", error);
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>Login</h2>
      <div className={styles.loginBox}>
        <form className={styles.loginForm} onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className={styles.inputField}
            value={email} // Controlled component
            onChange={(e) => setEmail(e.target.value)} // Update email state
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.inputField}
            value={password} // Controlled component
            onChange={(e) => setPassword(e.target.value)} // Update password state
          />
          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>
        <p className={styles.signupText}>
          Don’t have an account?{" "}
          <a href="/register" className={styles.signupLink}>
            Signup
          </a>
        </p>
        <div className={styles.googleLoginButton}>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginFailure}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
