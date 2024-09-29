import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

import calendarImg from "../../assets/images/calendarImg.png";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // check user loggedIn status
  });
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <img
          src={calendarImg}
          alt="Logo"
          className={styles.logo}
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <div className={styles.navbarRight}>
        {loggedIn && (
          <button
            className={styles.loginButton}
            onClick={() => {
              // navigate("/login");
              // logout function
            }}
          >
            Logout
          </button>
        )}
        {!loggedIn && (
          <>
            <button
              className={styles.loginButton}
              onClick={() => {
                navigate("/");
              }}
            >
              Login
            </button>
            <button
              className={styles.signupButton}
              onClick={() => {
                navigate("/register");
              }}
            >
              Signup
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
