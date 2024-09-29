import React, { useState } from "react";
import styles from "./Login.module.css"; // Importing CSS Module

const Register = () => {
  // State for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Helper function to validate email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return emailRegex.test(email);
  };

  // Function to handle form submission
  const handleSignup = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Basic validations
    if (!validateEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // If all validations pass
    alert("Signup successful!");

    // Here you can send the form data to your backend for further processing
    console.log({
      firstName,
      lastName,
      email,
      password,
    });
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
          <a href="/login" className={styles.signupLink}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
