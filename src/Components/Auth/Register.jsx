import React, { useEffect, useState } from "react";
import styles from "./Login.module.css"; // Importing CSS Module
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/authService";
import { getCookie } from "../../utils/helper";

const Register = () => {
  // State for form fields
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const token = getCookie("token");

  useEffect(() => {
    if (token) {
      // setLoggedIn(true);
      navigate("/board");
    } else {
      // navigate("/");
    }
  }, [token]);

  // Helper function to validate email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return false;
    }
    return true;
  };

  // Function to handle form submission
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Basic validations
    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!validatePassword(password)) {
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const name = firstName + " " + lastName;
      const response = await signup(name, email, password);
      console.log("singup res", response);
      alert("Signup succesfull");
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
      alert("Sign Up Failed");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.title}>Signup</h2>
      <div className={styles.loginBox}>
        <form className={styles.loginForm} onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="First Name"
            className={styles.inputField}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} // Update state on change
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className={styles.inputField}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className={styles.inputField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.inputField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className={styles.inputField}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className={styles.loginButton}>
            Signup
          </button>
        </form>
        <p className={styles.signupText}>
          Already have an account?{" "}
          <a className={styles.signupLink} onClick={() => navigate("/")}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
