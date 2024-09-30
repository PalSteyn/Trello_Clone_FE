import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

import calendarImg from "../../assets/images/calendarImg.png";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/helper";

const NavBar = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  const token = getCookie("token");

  useEffect(() => {
    if (token) {
      setLoggedIn(true);
      navigate("/board");
    } else {
      // navigate("/");
    }
  }, [token]);

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
              document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
              setLoggedIn(false);
              navigate("/");
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
