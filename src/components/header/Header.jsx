import { useState } from "react";
import { Link } from "react-router-dom";
import ToggleSwitch from "../toggle-switch/ToggleSwitch";
import styles from "./Header.module.css";
import wtwrLogo from "../../assets/wtwrLogo.svg";
import avatar from "../../assets/Avatar.svg";

export default function Header({ onAddItemClick, weatherData }) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <Link to="/" className={styles.logoLink}>
          <img src={wtwrLogo} alt="WTWR logo" className={styles.logo} />
        </Link>
        <p className={styles.dateLocation}>
          {currentDate}, {weatherData.location || "Loading location..."}
        </p>
      </div>

      {/* Desktop Navigation */}
      <div className={styles.headerRight}>
        <ToggleSwitch />
        <button
          type="button"
          className={styles.addButton}
          onClick={onAddItemClick}
        >
          + Add clothes
        </button>
        <Link to="/profile" className={styles.profileLink}>
          <p className={styles.username}>Terrence Tegegne</p>
          <img src={avatar} alt="Terrence Tegegne" className={styles.avatar} />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className={styles.mobileMenuButton}
        onClick={toggleMobileMenu}
        aria-label={isMobileMenuOpened ? "Close menu" : "Open menu"}
      >
        {!isMobileMenuOpened ? (
          // Hamburger Icon
          <svg className={styles.hamburgerIcon} viewBox="0 0 24 24" fill="none">
            <path
              d="M3 12H21M3 6H21M3 18H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          // Close Icon
          <svg className={styles.closeIcon} viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>

      {/* Mobile Navigation Menu */}
      <nav
        className={`${styles.mobileNav} ${isMobileMenuOpened ? styles.mobileNav_opened : ""}`}
      >
        <button
          type="button"
          className={styles.mobileAddButton}
          onClick={() => {
            onAddItemClick();
            toggleMobileMenu();
          }}
        >
          + Add clothes
        </button>
        <Link 
          to="/profile" 
          className={styles.mobileUserInfo}
          onClick={toggleMobileMenu}
        >
          <p className={styles.mobileUsername}>Terrence Tegegne</p>
          <img src={avatar} alt="Terrence Tegegne" className={styles.mobileAvatar} />
        </Link>
      </nav>
    </header>
  );
}
