import React, { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import styles from "./Login.module.css";
import { login, googleLogin } from "../../services/authService";
import { getCookie, setCookie } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const token = getCookie("token");

  useEffect(() => {
    if (token) {
      // setLoggedIn(true);
      navigate("/board");
    } else {
      navigate("/");
    }
  }, [token]);

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in both email and password");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      const response = await login(email, password);
      setCookie("token", response.token);
      alert("Login successfull");
      navigate("/board");
    } catch (error) {
      console.error("Login failed", error);
      alert("Invalid Credentials / User Not Found");
    }
  };

  // Function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation
    return emailRegex.test(email);
  };

  // Google login success handler
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;

    try {
      const response = await googleLogin(token);

      console.log("token", response.token);

      setCookie("token", response.token);
      alert("Login successfull");
      navigate("/board");
    } catch (error) {
      console.error("Google login failed", error);
      alert("Invalid Credentials / User Not Found");
    }
  };

  // Google login failure handler
  const handleGoogleLoginFailure = (error) => {
    console.log("Google login failed: ", error);
    alert("Google login failed");
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
          <a
            className={styles.signupLink}
            onClick={() => navigate("/register")}
          >
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
